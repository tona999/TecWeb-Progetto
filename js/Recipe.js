class Recipe{
	constructor(name = "")
	{
		this.ingredients = [];
		this.name = name;
	}

	addIngredient(ing)
	{
		this.ingredients.push(ing);
		ing.onInsertInRecipe(this, this.ingredients.length-1); //Connecting Event for Close Button on Ingredient
		this.refreshRecipeData();
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
}