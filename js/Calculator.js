var sampleIngredientCopy;
var currentRecipe;
var ingSel;
var rv;
var ingList;
var ingredientsLoaded = false;

function start() {
    sampleIngredientCopy = document.getElementById("sampleIngredient").cloneNode(true);
    document.getElementById("sampleIngredient").remove();

    //recipe VIEW
    rv = new Ingredient(false);
    rv.connect(Calculator.getNewIngredientBody("recipeView", true), true);
    rv.convertToRecipeView();
    rv.saveButtonRef.addEventListener('click', saveCurrentRecipe);

    currentRecipe = new Recipe();
    currentRecipe.connect(document.getElementById("totalRecipeGrams"), document.getElementById("totalRecipeCarbs"), rv);

    //Add Ingredient To Receipt Event, Save Receipt Event, View Receipt Event, Reset Recipe Ingredient
    document.getElementById("addNewIngredientBtn").addEventListener('click', function() { currentRecipe.addEmptyIngredient(); });
    document.getElementById("showRecipeViewBtn").addEventListener('click', switchRecipeView);
    document.getElementById("saveRecipeBtn").addEventListener('click', saveCurrentRecipe);
    document.getElementById("resetRecipeBtn").addEventListener('click', function() { currentRecipe.reset(); });

    //Load Ingredients For In-Calculator Selection
    ingSel = document.getElementById("ingredientsSelect");
    ingSel.addEventListener('click', getIngredientsList);
    ingSel.addEventListener('change', function() {
        var selected = this.options[this.selectedIndex];
        var id = selected.getAttribute('data-id');
        var name = selected.getAttribute('data-name');

        if (id == -1) return false;

        if (currentRecipe.hasIngredientWithId(id)) {
            window.alert(name + " is already in your recipe.");
            return false;
        }

        var sg = selected.getAttribute('data-sg');
        var sc = selected.getAttribute('data-sc');

        var Ing = new Ingredient(true, name, sg, sc, 0, -1, 1, id);
        currentRecipe.addIngredient(Ing);

        ingSel.selectedIndex = '0';
    });

    getIngredientsList();
}

function onIngredientsLoaded() {
    if (ingredientsLoaded) return;
    //Ingredients are loaded correctly, now load any necessary ingredients or a recipe.
    const urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('ingredientId');
    if (id != null) {
        //Load Ingredient
        loadIngredient(id);
    } else {
        id = urlParams.get('recipeId');
        if (id != null) {
            var name = urlParams.get('recipeName');
            //Load Recipe
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var ings = JSON.parse(this.responseText);
                    for (var i = 0; i < ings.length; i++) {
                        loadIngredient(ings[i].id, ings[i].grams);
                    }
                    rv.convertToSavedRecipeView(id, name);
                }
            }
            xhttp.open("GET", "php/getRecipeIngredients.php?recipeId=" + id, true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send();
        }
    }
    ingredientsLoaded = true;
}

function loadIngredient(id, grams = 0) {
    var tmpIng = getIngredientWithId(id);
    if (tmpIng != null) {
        var Ing = new Ingredient(true, tmpIng.name, tmpIng.sampleGrams, tmpIng.sampleCarbs, grams, -1, 1, id);
        currentRecipe.addIngredient(Ing);
    }
}

function saveCurrentRecipe() {
    if (!rv.isReadyForSave())
        setRecipeView(true);
    else
        currentRecipe.save()
}

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

function getIngredientsList() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            ingList = JSON.parse(this.responseText);
            refreshIngredientsSelect();

            //Force Repaint The Selection Box Somehow Here If Possible
            if (!ingredientsLoaded)
                onIngredientsLoaded();
        }
    }

    xhttp.open("GET", "php/getIngredientsList.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}

function refreshIngredientsSelect() {
    var s = "<option data-id='-1'> SELECT INGREDIENT </option>";
    for (i = 0; i < ingList.length; i++) {
        s = s + "<option data-id='" + ingList[i].id + "' data-sg='" + ingList[i].sampleGrams + "' data-sc='" + ingList[i].sampleCarbs + "' data-name='" + ingList[i].name + "'>" + ingList[i].name + "</option>";
    }
    ingSel.innerHTML = s;
}

function getIngredientWithId(id) {
    for (i = 0; i < ingList.length; i++) {
        if (ingList[i].id == id)
            return ingList[i];
    }
    return null;
}

class Calculator {
    static getNewIngredientBody(parentId = "recipe", insertAsFirstChild = false) {
        var htmlIng = sampleIngredientCopy.cloneNode(true);
        var parent = document.getElementById(parentId);
        if (insertAsFirstChild)
            parent.insertBefore(htmlIng, parent.childNodes[0]);
        else
            parent.appendChild(htmlIng);
        return htmlIng;
    }
}