class Recipe{
	constructor(name = "", id = '-1')
	{
		this.ingredients = [];
		this.recipeName = name;
		this.id = id;
	}

	connect(totalRecipeGramsRef, totalRecipeCarbsRef, recipeViewRef)
	{
		this.totalRecipeGramsRef = totalRecipeGramsRef;
		this.totalRecipeCarbsRef = totalRecipeCarbsRef;
		this.recipeViewRef = recipeViewRef;
	}

	convertToSaved(id, name)
	{
		this.recipeViewRef.convertToSavedRecipeView(id, name);
	}

	addEmptyIngredient()
	{
		this.addIngredient(new Ingredient(true));
	}

	addIngredient(ing)
	{
		this.ingredients.push(ing);
		ing.onInsertInRecipe(this, this.ingredients.length-1); // connecting events for recipe and ingredient interaction
	}

	removeIngredient(index)
	{
		this.ingredients[index]=undefined; // ingredients are bound to array indexes. Indexes can not shift.
		this.refreshRecipeData();
	}

	getName()
	{
		if (this.recipeViewRef != undefined)
			return this.recipeViewRef.getName().trim();
		else
			return this.name; //an abstract recipe
	}

	getId()
	{
		if (this.recipeViewRef != undefined)
			return this.recipeViewRef.getId();
		else
			return this.id; //an abstract recipe
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

	getIngredientWithId(id)
	{
		for (var i=0; i<this.ingredients.length; i++){
			if (this.ingredients[i]!=undefined){
				if(this.ingredients[i].getId()==id)
					return this.ingredients[i];
			}
		}
		return null;
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

		// recipe view
		this.recipeViewRef.setSampleGrams(totalRecipeGrams);
		this.recipeViewRef.setSampleCarbs(totalRecipeCarbs);
		// totalRecipeGrams and totalRecipeCarbs are not changed by the user, therefore the events are not triggered 
		this.recipeViewRef.refresh();
	}

	getIngredientsComposition()
	{
		var arr = new Array();
		for (var i=0; i<this.ingredients.length; i++){
			if (this.ingredients[i]!=undefined){
				arr.push({id: this.ingredients[i].getId(), grams: this.ingredients[i].getTotalGrams()});
			}
		}
		return JSON.stringify(arr);
	}

	isReadyForSave()
	{
		if (this.getName().trim()=="")
		{
			this.recipeViewRef.setWarning("Please assign a valid name to your recipe and try again.");
			return false;
		}
		else
			this.recipeViewRef.setWarning("");

		return true;
	}
	
	save()
	{	
		if (this.isReadyForSave())
			this.saveRecipe();
	}

	saveRecipe()
	{
		// check if all ingredients have been saved
		var allIngsReady = true;
		for (var i=0; i<this.ingredients.length; i++){
			var ing = this.ingredients[i];
			if (ing!=undefined && !ing.isSaved()){
				allIngsReady = false;
				ing.requireSave();
			}
		}

		if (!allIngsReady)
		{
			this.recipeViewRef.setWarning("Please save all ingredients, or remove the ones you don't wish to save, before proceeding.");
			return;
		}
		else
			this.recipeViewRef.setWarning("");

		// all ingredients have been saved, now save the recipe
		var xhttp = new XMLHttpRequest();
		var t = this;
		xhttp.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200)
			{
				var response = JSON.parse(this.responseText);
				if (response.emptyName != undefined){
					t.recipeViewRef.setWarning("The recipe name can not be empty.");
					return;
				}
				
				if (response.ingredientsNotFound != undefined)
				{
					response.ingredientsNotFound.forEach(id => {
						var ing = t.getIngredientWithId(id);
						ing.savingFailed();
						ing.convertToNotSaved();
					});
					t.recipeViewRef.setWarning("Saving Failed. Some ingredients were missing. Please see ingredients data.");
					return;
				}
				else t.recipeViewRef.setWarning("");

				var id = parseInt(response);
				if (id<0)
					t.recipeViewRef.setWarning("Saving Failed.");
				else{
					t.recipeViewRef.setWarning("");
					t.convertToSaved(id);
				}
			}
		}
		var request = {recipeId:t.getId(), recipeName:t.getName().replace(/[^a-zA-Z ]/g, ""), ingredientsJson:JSON.parse(this.getIngredientsComposition())};

		xhttp.open("POST", "php/saveRecipe.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("request=" + JSON.stringify(request));
	}
}
