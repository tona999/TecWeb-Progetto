var sampleIngredientCopy;
var currentRecipe;
var ingSel;
var rv;
var ingList;
var requestLoaded = false;

// environment initialization
function start() {
    sampleIngredientCopy = document.getElementById("sampleIngredient").cloneNode(true);
    document.getElementById("sampleIngredient").remove();

    // recipe view setup
    rv = new Ingredient(false);
    rv.connect(getNewIngredientBody("recipeView", true), true); // connect rv object to html element
    rv.convertToRecipeView(); // convert rv from ingredient to recipe representation
    rv.saveButtonRef.addEventListener('click', saveCurrentRecipe);

    // recipe setup
    currentRecipe = new Recipe();
    currentRecipe.connect(document.getElementById("totalRecipeGrams"), document.getElementById("totalRecipeCarbs"), rv); // connect recipe object to the relative html elements

    // events setup: Add Ingredient To Recipe, Save Recipe, View Recipe
    document.getElementById("addNewIngredientBtn").addEventListener('click', function() { currentRecipe.addEmptyIngredient(); });
    document.getElementById("showRecipeViewBtn").addEventListener('click', switchRecipeView);
    document.getElementById("saveRecipeBtn").addEventListener('click', saveCurrentRecipe);

    // ingredients select setup
    ingSel = document.getElementById("ingredientsSelect");
    ingSel.addEventListener('click', refreshIngredientsList);
    ingSel.addEventListener('change', onIngredientSelected);

    // load current user's ingredients list
    refreshIngredientsList();
}

// reloads the ingredients list and consequently refreshes the ingredients select box
function refreshIngredientsList() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            ingList = JSON.parse(this.responseText);
            
            var s = "<option data-id='-1'> SELECT INGREDIENT </option>";
            for (i = 0; i < ingList.length; i++) {
                s = s + "<option data-id='" + ingList[i].id + "' data-name='" + ingList[i].name + "'>" + ingList[i].name + "</option>";
            }
            ingSel.innerHTML = s;
            
            if (!requestLoaded)
                loadRequestedIngredientOrRecipe();
        }
    }

    xhttp.open("GET", "php/getIngredientsList.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}

// load the requested ingredient or recipe, if any.
function loadRequestedIngredientOrRecipe() {
    var idIng = document.getElementById("requestedIngredientId");
    var idRec = document.getElementById("requestedRecipeId");
    // load an ingredient
    if (idIng != null && idIng.innerHTML != '-1') {
        loadIngredientWithId(idIng.innerHTML);
    } else if (idRec != null && idRec.innerHTML != '-1') { // load a recipe
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (this.response == -1){
                    window.alert("The recipe you requested was not found.");
                     return;
                }
                recipeData = JSON.parse(this.responseText);
                for (var i = 0; i < recipeData.ingredientsList.length; i++) {
                    loadIngredientWithId(recipeData.ingredientsList[i].id, recipeData.ingredientsList[i].grams);
                }
                currentRecipe.convertToSaved(recipeData.id, recipeData.name);
            }
        }
            xhttp.open("GET", "php/getRecipeIngredients.php?recipeId=" + idRec.innerHTML, true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send();
    }
    requestLoaded = true;
    idIng.remove();
    idRec.remove();
}

// an ingredient was clicked in ingSel select box
function onIngredientSelected() {
    var selected = this.options[this.selectedIndex];
    var id = selected.getAttribute('data-id');
    var name = selected.getAttribute('data-name');

    if (id == -1) return false;

    if (currentRecipe.hasIngredientWithId(id)) {
        window.alert(name + " is already in your recipe.");
        return false;
    }

    loadIngredientWithId(id);

    ingSel.selectedIndex = '0';
}

// load an ingredient from the ingredients list
function loadIngredientWithId(id, grams = 0) {
    var tmpIng = getIngredientWithId(id);
    if (tmpIng != null) {
        var Ing = new Ingredient(true, tmpIng.name, tmpIng.sampleGrams, tmpIng.sampleCarbs, grams, -1, 1, id);
        currentRecipe.addIngredient(Ing);
    }
}

// returns an ingredient object with the specified id if it exists
function getIngredientWithId(id) {
    for (i = 0; i < ingList.length; i++) {
        if (ingList[i].id == id)
            return ingList[i];
    }
    return null;
}

// saves the current recipe if possible
function saveCurrentRecipe() {
    if (!rv.isReadyForSave())
        setRecipeView(true); // switch to recipe view where an error is visualized
    else
        currentRecipe.save()
}

// returns a new copy of the sample ingredient element which can be connected to an ingredient object
function getNewIngredientBody(parentId = "recipe", insertAsFirstChild = false) {
    var htmlIng = sampleIngredientCopy.cloneNode(true);
    var parent = document.getElementById(parentId);
    if (insertAsFirstChild)
        parent.insertBefore(htmlIng, parent.childNodes[0]);
    else
        parent.appendChild(htmlIng);
    return htmlIng;
}

// utilities used to switch between ingredients view and recipe view
function switchRecipeView() {
    var r = document.getElementById("recipe_screen");
    if (r.classList.contains("recipe_with_view"))
        setRecipeView(false)
    else
        setRecipeView(true);
}

function setRecipeView(status) {
    var r = document.getElementById("recipe_screen");
    if (!status) {
        r.classList.remove("recipe_with_view");
        setRecipeViewVisibility(false);
    } else {
        r.classList.add("recipe_with_view");
        setRecipeViewVisibility(true);
    }
}

function setRecipeViewVisibility(visible) {
    var rv = document.getElementById("recipeView");
    if (visible) {
        if (rv.classList.contains("hidden_recipe_view"))
            rv.classList.remove("hidden_recipe_view");
    } else if (!(rv.classList.contains("hidden_recipe_view")))
        rv.classList.add("hidden_recipe_view");
}