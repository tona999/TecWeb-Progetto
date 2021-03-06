<?php
require_once("php/page.php");
$html = new Page();
$html->requireLogin();
$html->setTitle("Your Recipes");
$html->setMeta(
    '<meta name="author" content="FAJN" />'.
    '<meta name="description" content="Your recipies" />'.
    '<meta name="robots" content="noindex" />'.
    '<meta name="keywords" content="profile,diabetes,T1D,calculator" />'.
    "<link rel='stylesheet' type='text/css' href='styles/ingredient-description.css' media='screen' />
    <script type='text/javascript' src='js/Recipes.js'></script>
    <script type='text/javascript' src='js/RecipeDescription.js'></script>");
$html->setBodyPath("html/recipes.html");

require_once("php/connection.php");

$q="SELECT recipe.id AS RId, recipe.name AS RName, ingredient.name AS IName, contains.gramsIngredient AS GI FROM recipe LEFT JOIN contains ON recipe.id = contains.recipeId LEFT JOIN ingredient ON contains.ingredientId = ingredient.id WHERE recipe.userId = {$_SESSION['userId']} ORDER BY RName";
$result = $mysql->query($q);

//Formatting the query result
$grouped = array();
if($result != false) {
    while ($row = $result->fetch_assoc()){
        if (!array_key_exists($row["RId"], $grouped)){
            $grouped[$row["RId"]] = new stdClass();
            $grouped[$row["RId"]]->ingredients = array();
        }

        $grouped[$row["RId"]]->id = $row["RId"];
        $grouped[$row["RId"]]->name = $row["RName"];

        //Empty Recipe
        if ($row["IName"]!="" && $row["GI"]!=""){
            $ingredient = new stdClass();
            $ingredient->IName = $row['IName'];
            $ingredient->GI = $row['GI'];
            array_push($grouped[$row["RId"]]->ingredients, $ingredient);
        }
    }
}

//Populating the page
$recipeDescription = file_get_contents("html/recipeDescription.html");
$recipesList = "";
$ingredientsList = "";

foreach ($grouped as $recipe){
    $recDescr = $recipeDescription;
    $recDescr = str_replace("<_RECIPE_ID/>", $recipe->id, $recDescr);
    $recDescr = str_replace("<_RECIPE_NAME/>", $recipe->name, $recDescr);

    if (count($recipe->ingredients)>0){
        $ingredientsList = "<table><thead><tr><th>Ingredient Name</th><th>Grams</th></tr></thead><tbody>";
        foreach ($recipe->ingredients as $ingr)
            $ingredientsList = $ingredientsList."<tr><td>{$ingr->IName}</td><td>{$ingr->GI}</td></tr>";
        $ingredientsList = $ingredientsList."</tbody></table>";
    }
    else{
        $ingredientsList = "<p>This recipe does not contain any ingredients yet.</p>";
    }

    $recDescr = str_replace("<_INGREDIENTS_LIST/>", $ingredientsList, $recDescr);
    $recipesList = $recipesList.$recDescr;
}
$html->body = str_replace("<_RECIPES_LIST/>", $recipesList, $html->body);

$html->header = str_replace('<body>','<body onload="start();">',$html->header);
$html->printHtml();
