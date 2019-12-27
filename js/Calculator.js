var sampleIngredientCopy;
var currentRecipe;

function start()
{
	sampleIngredientCopy = document.getElementById("sampleIngredient").cloneNode(true);
	document.getElementById("sampleIngredient").remove();
	initializeRecipeStructure();

	Ing1 = new Ingredient(true, "Sliced Bread", 100, 50, 320, -1, 12);

	currentRecipe.addIngredient(Ing1);
}

function initializeRecipeStructure()
{
	//recipe VIEW
	var rv = new Ingredient(false);
	rv.connect(Calculator.getNewIngredientBody("recipeView"));
    rv.setVisibility(false);

	currentRecipe = new Recipe();
	currentRecipe.connect(document.getElementById("totalRecipeGrams"), document.getElementById("totalRecipeCarbs"), rv);

	//Add Ingredient To Receipt Event, Save Receipt Event, View Receipt Event
	document.getElementById("addNewIngredientBtn").addEventListener('click', function(){currentRecipe.addIngredient(new Ingredient(true));});
	document.getElementById("showRecipeViewBtn").addEventListener('click', function(){currentRecipe.showRecipeView();});
	document.getElementById("saveRecipeBtn").addEventListener('click', function(){currentRecipe.save();});
	document.getElementById("resetRecipeBtn").addEventListener('click', function(){currentRecipe.reset();});
}

function loadReceipt()
{
	//Here pop up a list to choose a receipt to load
}

class Calculator{
	static getNewIngredientBody(parentId = "recipe")
	{
		var htmlIng = sampleIngredientCopy.cloneNode(true);
		document.getElementById(parentId).appendChild(htmlIng);
		return htmlIng;
	}
}