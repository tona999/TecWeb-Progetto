class Ingredient{
	constructor(connect = false, name = "", sampleGrams = 100, sampleCarbs = 0, totalGrams = 0, totalBreadUnits = -1, piecesNumber = 0, id = -1) 
	{
		//Format checks are needed, thus the use of the setters
		this.setName(name);
		this.setSampleGrams(sampleGrams);
		this.setSampleCarbs(sampleCarbs);
		this.setTotalGrams(totalGrams);		
		this.setPiecesNumber(piecesNumber);

		if (totalBreadUnits >= 0)
		{
			this.totalBreadUnits = MathUtilities.toFloat(totalBreadUnits);
			this.totalGrams = 0;
			this.totalGramsLastChanged = false;
		}
		else
		{
			if(MathUtilities.toFloat(totalGrams) > 0)
				this.totalGrams = MathUtilities.toFloat(totalGrams);
			else
				this.totalGrams = 0;
			this.totalBreadUnits = 0;
			this.totalGramsLastChanged = true;
		}

		this.ingredientId = id;

		if (connect)
			this.connect(Calculator.getNewIngredientBody());
    }

    connect(htmlIng)
    {
    	htmlIng.removeAttribute("id");
    	this.htmlIngRef = htmlIng;

    	this.totalGramsLastChanged = true;

		this.ingredientIdRef =		htmlIng.querySelector("[name='ingredientId']");
		this.ingredientNameRef = 	htmlIng.querySelector("[name='ingredientName']");
		this.closeButtonRef = 		htmlIng.querySelector("[name='closeButton']");
		this.saveButtonRef = 		htmlIng.querySelector("[name='saveButton']");
		this.sampleGramsRef = 		htmlIng.querySelector("[name='sampleGrams']");
		this.sampleCarbsRef = 		htmlIng.querySelector("[name='sampleCarbs']");
		this.totalGramsRef = 		htmlIng.querySelector("[name='totalGrams']");
		this.totalBreadUnitsRef = 	htmlIng.querySelector("[name='totalBreadUnits']");
		this.piecesNumberRef = 		htmlIng.querySelector("[name='piecesNumber']");
		this.plusButtonRef = 		htmlIng.querySelector("[name='plusButton']");
		this.minusButtonRef = 		htmlIng.querySelector("[name='minusButton']");
		this.gramsPPRef = 		htmlIng.querySelector("[name='gramsPP']");
		this.breadUnitsPPRef = 		htmlIng.querySelector("[name='breadUnitsPP']");
		this.carbsPPRef = 		htmlIng.querySelector("[name='carbsPP']");
		
		var t = this;//t is this ingredient object, while "this" in the inline function is the input element that called the event, so this.value is the value of that input element
		this.sampleGramsRef.addEventListener('input', function(){t.onSampleGramsChanged(this.value);});
		this.sampleCarbsRef.addEventListener('input', function(){t.onSampleCarbsChanged(this.value);});
		this.totalGramsRef.addEventListener('input', function(){t.onTotalGramsChanged(this.value);});
		this.totalBreadUnitsRef.addEventListener('input', function(){t.onTotalBreadUnitsChanged(this.value);});
		this.piecesNumberRef.addEventListener('input', function(){t.onPiecesNumberChanged(this.value);});

		this.closeButtonRef.addEventListener('click', function(){t.onCloseClicked();}); //function.bind could also be used
		this.plusButtonRef.addEventListener('click', function(){t.onSignClicked(1);});
		this.minusButtonRef.addEventListener('click', function(){t.onSignClicked(-1);});

		if(this.ingredientId > -1)
			this.convertToSaved();

		this.refresh();
		this.display();
    }

    display()
    {
    	this.ingredientNameRef.value = this.ingredientName;		
		this.sampleGramsRef.value = MathUtilities.fromInteger(this.sampleGrams);
		this.sampleCarbsRef.value = MathUtilities.fromInteger(this.sampleCarbs);
		this.totalGramsRef.value = MathUtilities.fromFloat(this.totalGrams);
		this.totalBreadUnitsRef.value = MathUtilities.fromFloat(this.totalBreadUnits);
		this.piecesNumberRef.value = MathUtilities.fromInteger(this.piecesNumber);
		this.gramsPPRef.innerHTML = this.gramsPP;
		this.breadUnitsPPRef.innerHTML = this.breadUnitsPP;
		this.carbsPPRef.innerHTML = this.carbsPP;
    }

    /*INGREDIENT GETTERS & SETTERS*/
	setName(val){this.ingredientName = (val.toString()).substring(0, 25);}
	setSampleGrams(val){this.sampleGrams = MathUtilities.toInteger(val);}
	setSampleCarbs(val){this.sampleCarbs = MathUtilities.toInteger(val);}
	setTotalGrams(val){this.totalGrams = MathUtilities.toFloat(val);}
	setTotalBreadUnits(val){this.totalBreadUnits = MathUtilities.toFloat(val);}
	setPiecesNumber(val){this.piecesNumber = MathUtilities.toInteger(val);}

	getTotalGrams(){return this.totalGrams;}
	getTotalCarbs(){return this.totalGrams*this.sampleCarbs/this.sampleGrams;} //Not visible in the ingredient
	getId(){return this.ingredientId;}

    /*EVENTS*/
    onCloseClicked(){
    	this.htmlIngRef.remove();
    }
	onSampleGramsChanged(val){
		this.setSampleGrams(val);
		this.checkSampleDataValidity(true);
		this.refresh();
	}
	onSampleCarbsChanged(val){
		this.setSampleCarbs(val);
		this.checkSampleDataValidity(false);
		this.refresh();
	}
	onTotalGramsChanged(val){
		this.totalGramsLastChanged = true;
		this.setTotalGrams(val);
		this.refresh();
	}
	onTotalBreadUnitsChanged(val){
		this.totalGramsLastChanged = false;
		this.setTotalBreadUnits(val);
		this.refresh();
	}
	onSignClicked(increment){
		if (!this.isSampleDataValid()){
			window.alert("Please check " + this.ingredientName + " Sample Values");
			return;
		}
		
		var n = this.piecesNumber + increment;
		if (n>=0)
			this.onPiecesNumberChanged(n);
		else
			this.onPiecesNumberChanged(0);
	}
	onPiecesNumberChanged(val){
		this.setPiecesNumber(val);
		this.refresh();
	}

	onInsertInRecipe(recipe, index){ //Called when the ingredient is inserted into a recipe. An ingredient can be standalone.
		this.closeButtonRef.addEventListener('click', function(){recipe.removeIngredient(index)});
		this.recipeRef = recipe;
		this.refresh();
	}

	/*MATHS*/
	refresh()
	{	if (this.isSampleDataValid()){
			this.calculateTotalsRow();
			this.calculatePiecesRow();
			this.display();

			if (this.recipeRef)
				this.recipeRef.refreshRecipeData();
			return true;
		}
		return false;
	}

	calculateTotalsRow()
	{
		if (this.totalGramsLastChanged)
			this.setTotalBreadUnits(this.totalGramsToBreadUnits());
		else if (this.sampleCarbs > 0) //Division by zero
			this.setTotalGrams(this.totalBreadUnitsToGrams());
		else
			this.setTotalGrams(0);
	}

	calculatePiecesRow()
	{
		if (this.piecesNumber > 0)
		{
			var totalCarbs = (this.totalGrams*this.sampleCarbs)/this.sampleGrams;

			this.gramsPP = MathUtilities.toFloat(this.totalGrams/this.piecesNumber);
			this.carbsPP = MathUtilities.toFloat(totalCarbs/this.piecesNumber);
			this.breadUnitsPP = MathUtilities.toFloat(Ingredient.carbsToBreadUnits(totalCarbs)/this.piecesNumber);
		}
		else
		{
			this.gramsPP = 0.0;
			this.carbsPP = 0.0;
			this.breadUnitsPP = 0.0;
		}
	}

	totalGramsToBreadUnits()
	{
		var totalCarbs = (this.totalGrams*this.sampleCarbs)/this.sampleGrams;
		return MathUtilities.toFloat(Ingredient.carbsToBreadUnits(totalCarbs));
	}

	totalBreadUnitsToGrams()
	{
		var totalCarbs = Ingredient.breadUnitsToCarbs(this.totalBreadUnits);
		return MathUtilities.toFloat((totalCarbs*this.sampleGrams)/this.sampleCarbs);
	}

	/*INGREDIENT SPECIFIC UTILITIES*/
	checkSampleDataValidity(sampleGramsChanged)
	{
		if (this.sampleCarbs > this.sampleGrams)
		{
			if (sampleGramsChanged){
				Ingredient.setValidityStatus(this.sampleGramsRef, false);
				Ingredient.setValidityStatus(this.sampleCarbsRef, true);
			}
			else{
				Ingredient.setValidityStatus(this.sampleCarbsRef, false);
				Ingredient.setValidityStatus(this.sampleGramsRef, true);
			}
		}
		else
		{
			Ingredient.setValidityStatus(this.sampleGramsRef, true);
			Ingredient.setValidityStatus(this.sampleCarbsRef, true);
		}
	}

	isSampleDataValid()
	{
		return (this.sampleGrams >= 0 && this.sampleCarbs >= 0 && this.sampleGrams >= this.sampleCarbs);
	}

	/*GENERIC STATIC UTILITIES*/
	static carbsToBreadUnits(carbs){
		return MathUtilities.toFloat(carbs/12.0);
	}

	static breadUnitsToCarbs(breadUnits){
		return MathUtilities.toFloat(breadUnits*12.0);
	}

	static setValidityStatus(field, status)
	{
		if (status)
			field.classList.remove("invalidInput");
		else
			field.className = "invalidInput";
	}

	switchVisibility()
	{
		if (this.htmlIngRef.className == "hiddenIngredient"){
			this.setVisibility(true);
			return true;
		}
		else{
			this.setVisibility(false);
			return false;
		}
	}

	setVisibility(status)
	{
		if (!status)
			this.htmlIngRef.className = "hiddenIngredient";
		else
			this.htmlIngRef.classList = "ingredient";
	}

	/*USER INTERACTION*/
	convertToSaved()
	{
		this.ingredientNameRef.disabled = this.sampleGramsRef.disabled = this.sampleCarbsRef.disabled = true;
		this.ingredientNameRef.classList = this.sampleGramsRef.classList = this.sampleCarbsRef.classList = "non_editable"
		this.saveButtonRef.remove();
	}

	convertToRecipeView()
	{
		this.sampleGramsRef.disabled = this.sampleCarbsRef.disabled = true;
		this.sampleGramsRef.classList = this.sampleCarbsRef.classList = "non_editable"
	}

	convertToSavedRecipeView()
	{
		this.ingredientNameRef.disabled = this.sampleGramsRef.disabled = this.sampleCarbsRef.disabled = true;
		this.ingredientNameRef.classList = this.sampleGramsRef.classList = this.sampleCarbsRef.classList = "non_editable"

	}

	removeCloseButton()
	{
		this.closeButtonRef.remove();
	}

	save()
	{
		
	}
}
