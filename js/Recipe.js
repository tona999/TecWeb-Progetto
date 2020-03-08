class Recipe{
	constructor(name = "")
	{
		this.ingredients = [];
		this.recipeName = name;
	}

	addEmptyIngredient()
	{
		this.addIngredient(new Ingredient(true));
	}

	addIngredient(ing)
	{
		this.ingredients.push(ing);
		ing.onInsertInRecipe(this, this.ingredients.length-1); //Connecting Event for Close Button on Ingredient
	}

	removeIngredient(index)
	{
		this.ingredients[index]=undefined; //ingredients are bounded to array indexes for quick search => the indexes can not shift
		this.refreshRecipeData();
	}

	addIngredients(ingrs)
	{
		ingrs.forEach(addIngredient(value));
	}

	connect(totalRecipeGramsRef, totalRecipeCarbsRef, recipeViewRef)
	{
		this.totalRecipeGramsRef = totalRecipeGramsRef;
		this.totalRecipeCarbsRef = totalRecipeCarbsRef;
		this.recipeViewRef = recipeViewRef;
	}

	reset()
	{
		for (var i=0; i<this.ingredients.length; i++){
			if (this.ingredients[i]!=undefined){
				this.ingredients[i].onCloseClicked();
			}
		}
		this.ingredients = [];
	}

	getName()
	{
		if (this.recipeViewRef != undefined)
			return this.recipeViewRef.getName().trim();
		else
			return this.name; //an abstract recipe
	}

	hasIngredientWithId(id)
	{
		for (var i=0; i<this.ingredients.length; i++){
			if (this.ingredients[i]!=undefined){
				if(this.ingredients[i].getId()==id)
					return true;
			}
		}
		return false;
	}

	refreshRecipeData()
	{
		var totalRecipeGrams = 0;
		var totalRecipeCarbs = 0;

		for (var i=0; i<this.ingredients.length; i++){
			if (this.ingredients[i]!=undefined){
				totalRecipeGrams += this.ingredients[i].getTotalGrams();
				totalRecipeCarbs += this.ingredients[i].getTotalCarbs();
			}
		}

		totalRecipeGrams = MathUtilities.toFloat(totalRecipeGrams);
		totalRecipeCarbs = MathUtilities.toFloat(totalRecipeCarbs);

		this.totalRecipeGramsRef.innerHTML = totalRecipeGrams;
		this.totalRecipeCarbsRef.innerHTML = totalRecipeCarbs;

		//RECIPE VIEW
		this.recipeViewRef.setSampleGrams(totalRecipeGrams);
		this.recipeViewRef.setSampleCarbs(totalRecipeCarbs);
		//totalRecipeGrams and totalRecipeCarbs are not changed by the user, therefore the events are not triggered 
		this.recipeViewRef.refresh();
	}

	getIngredientsJson()
	{
		var arr = new Array();
		for (var i=0; i<this.ingredients.length; i++){
			if (this.ingredients[i]!=undefined){
				var tmp = {};
				tmp.id = this.ingredients[i].getId();
				tmp.grams = this.ingredients[i].getTotalGrams();
				arr.push(tmp);
			}
		}
		return JSON.stringify(arr);
	}

	isReadyForSave()
	{
		if (this.getName()=="")
		{
			this.recipeViewRef.setWarning("Please Assign A Name To Your Recipe And Try Again.");
			return false;
		}
		else
			this.recipeViewRef.setWarning("");

		return true;
	}

	//Automatically saves new ingredients which were not explicitly saved if the necessary criteria are met. Returns true if there aren't any unsaved ingredients in the recipe.
	tryAutomaticIngredientSave(){
		var allIngsReady = true;
		var arr = new Array();
		for (var i=0; i<this.ingredients.length; i++){
			var ing = this.ingredients[i];
			if (ing!=undefined && !ing.isSaved()){
				if (ing.isReadyForSave()){
					var se = ing.toSaveableEntity();
					se.idInList = i;
					arr.push(se);
				}
				else
					allIngsReady = false;
			}
		}
		if (!allIngsReady)
		{
			this.onAutomaticIngredientSaveFail();
			return;
		}


		if(arr.length==0) //Nothing to save, 
		{
			this.onAutomaticIngredientSaveSuccess();
			return;
		}

		var j = JSON.stringify(arr);
		
		var xhttp = new XMLHttpRequest();
		var t = this;
		xhttp.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200)
			{
				var result = JSON.parse(this.responseText);
				for(var i=0; i<result.successIds.length; i++)
				{
					t.ingredients[result.successIds[i].idInList].convertToSaved(result.successIds[i].id);
				}
				
				for (var k=0; k<result.failIds.length; k++)
				{
					t.ingredients[result.failIds[i].idInList].savingFailed();
				}

				if (result.failIds.length>0)
					t.onAutomaticIngredientSaveFail();
				else
					t.onAutomaticIngredientSaveSuccess();
			}
		}

		xhttp.open("POST", "php/insertIngredientGroup.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		var params = "json=";
		xhttp.send(params.concat(j));
	}

	//There were ingredients to save and saving succeeded
	onAutomaticIngredientSaveFail(){
		this.recipeViewRef.setWarning("Please Check Ingredients Data And Try Saving Again.");
	}

	//There were ingredients to save and saving failed
	onAutomaticIngredientSaveSuccess(){
		this.recipeViewRef.setWarning("");
		this.effectiveSave();
	}

	save()
	{	
		if (this.isReadyForSave())
			this.tryAutomaticIngredientSave();
	}

	effectiveSave() //Save recipe in database
	{
		var j = this.getIngredientsJson();

		var xhttp = new XMLHttpRequest();
		var t = this;
		xhttp.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200)
			{
				var id = parseInt(this.responseText);
				if (id<0)
					t.recipeViewRef.setWarning("Saving Failed.");
				else
					t.recipeViewRef.setWarning("");
					t.recipeViewRef.convertToSavedRecipeView(id);
			}
		}
		var params = "";
		params = params.concat("recipeId=", t.recipeViewRef.getId(),"&recipeName=", t.recipeViewRef.getName(), "&json=", j);
		xhttp.open("POST", "php/saveRecipe.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(params);
	}

	loadFromJson(json, keepCurrent = true)
	{
		var ingredients = JSON.parse(json);
	}
}
