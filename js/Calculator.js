var sampleIngredientCopy;
function start()
{
	sampleIngredientCopy = document.getElementById("sampleIngredient").cloneNode(true);
	document.getElementById("sampleIngredient").remove();

	document.getElementById("addNewBtn").addEventListener('click', function(){addIngredient();});
	document.getElementById("loadRecipeCardBtn").addEventListener('click', function(){refreshRecipeData();});
	document.getElementById("saveRecipeBtn").addEventListener('click', function(){saveRecipe();});

	//recipe VIEW
	var rv = new Ingredient(false);
	rv.connect(Calculator.getNewIngredientBody("recipeView"));

	var currentRecipe = new Recipe();
	currentRecipe.connect(document.getElementById("totalRecipeGrams"), document.getElementById("totalRecipeCarbs"), rv);

	Ing1 = new Ingredient(true, "Ingredient 1", 100, 50, 50);
	Ing2 = new Ingredient(true, "Ingredient 2", 100, 60, 40);
	Ing3 = new Ingredient(true);

	currentRecipe.addIngredient(Ing1);
	currentRecipe.addIngredient(Ing2);
	currentRecipe.addIngredient(Ing3);
}

class Calculator{
	static getNewIngredientBody(parentId = "recipe")
	{
		var htmlIng = sampleIngredientCopy.cloneNode(true);
		document.getElementById(parentId).appendChild(htmlIng);
		return htmlIng;
	}
}