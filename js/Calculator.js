var sampleIngredientCopy;
var currentRecipe;
var ingSel;
var rv;

function start()
{
	ingSel = document.getElementById("ingredientsSelect");

	ingSel.addEventListener('change', function(){
		var selected = this.options[this.selectedIndex];
		var id = selected.getAttribute('data-id');
		var name = selected.getAttribute('data-name');

		if (id==-1)return false;

		if (currentRecipe.hasIngredientWithId(id))
		{
			window.alert(name + " has already been inserted.");
			return false;
		}		

		var sg = selected.getAttribute('data-sg');
		var sc = selected.getAttribute('data-sc');
		
		var Ing = new Ingredient(true, name, sg, sc, 0, -1, 1, id);
		currentRecipe.addIngredient(Ing);
	});

	document.getElementById("refreshIngredientsBtn").addEventListener('click',  refreshIngredientsList);
	refreshIngredientsList();

	sampleIngredientCopy = document.getElementById("sampleIngredient").cloneNode(true);
	document.getElementById("sampleIngredient").remove();
	initializeRecipeStructure();
}

function initializeRecipeStructure()
{
	//recipe VIEW
	rv = new Ingredient(false);
	rv.connect(Calculator.getNewIngredientBody("recipeView"));
	rv.convertToRecipeView();
	rv.saveButtonRef.addEventListener('click', saveCurrentRecipe);

    rv.setVisibility(false);

	currentRecipe = new Recipe();
	currentRecipe.connect(document.getElementById("totalRecipeGrams"), document.getElementById("totalRecipeCarbs"), rv);

	//Add Ingredient To Receipt Event, Save Receipt Event, View Receipt Event, Reset Recipe Ingredient
	document.getElementById("addNewIngredientBtn").addEventListener('click', function(){currentRecipe.addEmptyIngredient();});
	document.getElementById("showRecipeViewBtn").addEventListener('click', showRecipeView);
	document.getElementById("saveRecipeBtn").addEventListener('click', saveCurrentRecipe);
	document.getElementById("resetRecipeBtn").addEventListener('click', function(){currentRecipe.reset();});
}

function saveCurrentRecipe()
{
	window.alert("saveCurrentRecipe");
}

function showRecipeView()
{
	rv.switchVisibility();
}

function refreshIngredientsList()
{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200)
		{
			var s = "<option data-id='-1'>--SELECT AN INGREDIENT--</option>";;
			var j = JSON.parse(this.responseText);
			for (i = 0; i < j.length; i++) {
				s = s + "<option data-id='" + j[i].id + "' data-sg='" + j[i].sampleGrams + "' data-sc='" + j[i].sampleCarbs + "' data-name='" + j[i].name + "'>" + j[i].name + "</option>";
			}
			ingSel.innerHTML = s;
		}
	}
	
	xhttp.open("GET", "php/getIngredientsList.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send();
}

class Calculator{
	static getNewIngredientBody(parentId = "recipe")
	{
		var htmlIng = sampleIngredientCopy.cloneNode(true);
		document.getElementById(parentId).appendChild(htmlIng);
		return htmlIng;
	}
}
