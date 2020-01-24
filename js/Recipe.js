class Recipe{
	constructor(name = "")
	{
		this.ingredients = [];
		this.name = name;
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
		this.ingredients[index]=undefined;
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

	save()
	{
		window.alert("Saving Recipe Demo...");
	}

	reset()
	{
		for (var i=0; i<this.ingredients.length; i++){
			if (this.ingredients[i]!=undefined){
				this.ingredients[i].onCloseClicked();
			}
		}
		this.ingredients = [];

		this.addEmptyIngredient();
	}

	hasIngredientWithId(id)
	{
		for (var i=0; i<this.ingredients.length; i++){
			if (this.ingredients[i]!=undefined){
			console.log(this.ingredients[i].getId());
				if(this.ingredients[i].getId()==id)
					return true;
			}
		}
		return false;
	}

	showRecipeView()
	{
		if(this.recipeViewRef.switchVisibility())
		{
			//recipeVIew was shown, change the receipt container class to fit the ingredients better and switch button icon
		}
		else
		{
			//recipeVIew was hidden, change the receipt container class to occupy all the space and switch button icon
		}
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

		//RECEIPT VIEW
		this.recipeViewRef.setSampleGrams(totalRecipeGrams);
		this.recipeViewRef.setSampleCarbs(totalRecipeCarbs);
		//totalRecipeGrams and totalRecipeCarbs are not changed by the user, therefore the events are not called 
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
}
