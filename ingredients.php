<?php

    //Header
    $header = file_get_contents("html/header.html");
    $header = str_replace(
        "<_TITLE/>",
        "Your Ingredients",
        $header);
    $header = str_replace(
		"<_META_TAGS/>",
		"<link rel='stylesheet' type='text/css' href='styles/ingredient-description.css'>".
		"<link rel='stylesheet' type='text/css' href='styles/buttons.css'>".
		"<script src='js/IngredientDescription.js'></script>".
		"<script src='js/Ingredients.js'></script>"
		,$header);
    echo $header;

    //Menu
    require_once("php/menu.php");
    echo $menu;

    //Content
    require_once("php/connection.php");
    $ingredientsList = "";
    $result = $mysql->query("SELECT * FROM Ingredient WHERE UserId = " . $_SESSION["userId"]);

    $ingredientDescription = file_get_contents("html/ingredientDescription.html");
    while($row = $result->fetch_assoc()){
    	$tmpDescr = $ingredientDescription;
	$tmpDescr = str_replace("<_INGREDIENT_ID/>", $row["Id"], $tmpDescr);
	$tmpDescr = str_replace("<_INGREDIENT_NAME/>", $row["Name"], $tmpDescr);
	$tmpDescr = str_replace("<_SAMPLE_GRAMS/>", $row["GramsProduct"], $tmpDescr);
	$tmpDescr = str_replace("<_SAMPLE_CARBS/>", $row["GramsCarbs"], $tmpDescr);
	$ingredientsList = $ingredientsList . $tmpDescr;
    }

    $ingredients =  file_get_contents("html/ingredients.html");
    $ingredients = str_replace("<_INGREDIENTS_LIST/>", $ingredientsList, $ingredients);

    if (isset($_GET["InvInp"])) //Invalid Input In New Ingredient Insertion
	$ingredients = str_replace("<_ERROR/>","<span>Please insert valid data and try again.</span>",$ingredients);
    else
    	$ingredients = str_replace("<_ERROR/>","",$ingredients);
	
    echo $ingredients;

    //Footer
    $footer = file_get_contents("html/footer.html");
    echo $footer;

?>
