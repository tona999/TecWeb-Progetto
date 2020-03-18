<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("Your Recipes");
$html->setMeta(
    "<link rel='stylesheet' type='text/css' href='styles/buttons.css' media='screen'>
    <link rel='stylesheet' type='text/css' href='styles/ingredient-description.css' media='screen'>
    <script src='js/Recipes.js'></script>
    <script src='js/RecipeDescription.js'></script>");
$html->setBodyPath("html/recipes.html");

    require_once("php/connection.php");

    $q ="SELECT R.Id AS RId, R.Name AS RName, I.Name AS IName, C.GramsIngredient AS GI
	 FROM Recipe as R, Ingredient as I, Contains as C
	 WHERE C.RecipeId = R.Id AND C.IngredientId = I.Id AND R.UserId = I.UserId AND R.UserId = {$_SESSION['userId']} ORDER BY RName";

    $result = $mysql->query($q);

    //START INGREDIENTS LIST
    $recipesList = "";
    $recipeDescription = file_get_contents("html/recipeDescription.html");
    $currentId = -1;
    $ingredientsList = "";
    $tmpDescr = $recipeDescription;
    while ($row = $result->fetch_assoc()){
	if ($currentId!=$row["RId"])
	{	
		if ($currentId!=-1){
			$ingredientsList = $ingredientsList."</table>";
			$tmpDescr = str_replace("<_INGREDIENTS_LIST/>", $ingredientsList, $tmpDescr);
			$recipesList = $recipesList . $tmpDescr;
		}
		$tmpDescr = $recipeDescription;
		$tmpDescr = str_replace("<_RECIPE_ID/>", $row["RId"], $tmpDescr);
		$tmpDescr = str_replace("<_RECIPE_NAME/>", $row["RName"], $tmpDescr);
		$currentId = $row["RId"];
		$ingredientsList = "<table><tr><th>Ingredient Name</th><th>Grams</th></tr>";
	}
	$ingredientsList = $ingredientsList."<tr><td>{$row['IName']}</td><td>{$row['GI']}</td></tr>";
    }
    $ingredientsList = $ingredientsList."</table>";
    $tmpDescr = str_replace("<_INGREDIENTS_LIST/>", $ingredientsList, $tmpDescr);
    $recipesList = $recipesList . $tmpDescr;
    //END INGREDIENTS LIST

    $html->body = str_replace("<_RECIPES_LIST/>", $recipesList, $html->body);

    $html->header = str_replace('<body>','<body onload="start();">',$html->header);

$html->printHtml();
?>
