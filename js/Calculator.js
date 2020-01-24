var sampleIngredientCopy;
var currentRecipe;
var ingSel;

function start()
{
	ingSel = document.getElementById("ingredientsSelect");

	ingSel.addEventListener('change', function(){
		var selected = this.options[this.selectedIndex];
		var id = selected.getAttribute('data-id');
		var name = selected.getAttribute('data-name');

		if (currentRecipe.hasIngredientWithId(id))
		{
			window.alert(name + " has already been inserted.");
			return false;
		}		

		var sg = selected.getAttribute('data-sg');
		var sc = selected.getAttribute('data-sc');
		var name = selected.getAttribute('data-name');
		
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
	var rv = new Ingredient(false);
	rv.connect(Calculator.getNewIngredientBody("recipeView"));
	rv.removeCloseButton();
	rv.convertToRecipeView();
	rv.saveButtonRef.addEventListener
    	rv.setVisibility(false);

	currentRecipe = new Recipe();
	currentRecipe.connect(document.getElementById("totalRecipeGrams"), document.getElementById("totalRecipeCarbs"), rv);

	//Add Ingredient To Receipt Event, Save Receipt Event, View Receipt Event
	document.getElementById("addNewIngredientBtn").addEventListener('click', function(){currentRecipe.addIngredient(new Ingredient(true));});
	document.getElementById("showRecipeViewBtn").addEventListener('click', function(){currentRecipe.showRecipeView();});
	document.getElementById("saveRecipeBtn").addEventListener('click', function(){currentRecipe.save();});
	document.getElementById("resetRecipeBtn").addEventListener('click', function(){currentRecipe.reset();});
}


function refreshIngredientsList()
{
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200)
		{
			var s = "";
			var json = JSON.parse(this.responseText);
			for (i = 0; i < json.names.length; i++) {
				s = s + "<option data-id='" + json.ids[i] + "' data-sg='" + json.sampleGrams[i] + "' data-sc='" + json.sampleCarbs[i] + "' data-name='" + json.names[i] + "'>" + json.names[i] + "</option>";
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
