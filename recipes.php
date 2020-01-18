<?php

    //Header
    $header = file_get_contents("html/header.html");
    $header = str_replace(
        "<_TITLE/>",
        "Your Recipes",
        $header);
    $header = str_replace(
		"<_META_TAGS/>",
		"<link rel='stylesheet' type='text/css' href='styles/buttons.css'>",
		$header);
    echo $header;

    //Menu
    require_once("php/menu.php");
    echo $menu;

    //Content
    require_once("php/connection.php");
    $recipesList = "";

	$q ="	SELECT R.Id AS RId, R.Name AS RName, I.Name AS IName, C.GramsIngredient AS GI FROM Recipe as R, Ingredient as I, Contains as C WHERE C.RecipeId = R.Id AND C.IngredientId = I.Id AND R.UserId = I.UserId =" . $_SESSION['userId'];

    $result = $mysql->query($q);

    $recipeDescription = file_get_contents("html/recipeDescription.html");

    //START INGREDIENTS LIST
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

    $recipes =  file_get_contents("html/recipes.html");
    $recipes = str_replace("<_RECIPES_LIST/>", $recipesList, $recipes);
	
    echo $recipes;

    //Footer
    $footer = file_get_contents("html/footer.html");
    echo $footer;
?>
