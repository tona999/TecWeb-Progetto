<?php
    require_once("php/page.php");
    $html = new Page();
    $html->requireLogin();
    $html->setTitle("Your Ingredients");
    $html->setMeta(
        '<meta name="author" content="FAJN" />'.
        '<meta name="description" content="Your ingredients" />'.
        '<meta name="robots" content="noindex,nofollow" />'.
        '<meta name="keywords" content="ingredients,diabetes,T1D,calculator" />'.
        '<link rel="stylesheet" type="text/css" href="styles/ingredient-description.css" media="screen" />'.
        '<script type="text/javascript" src="js/IngredientDescription.js"></script>'.
        '<script type="text/javascript" src="js/Ingredients.js"></script>');
    $html->setBodyPath("html/ingredients.html");

    require_once("php/connection.php");
    $ingredientsList = "";
    $result = $mysql->query("SELECT * FROM ingredient WHERE userId={$_SESSION['userId']} ORDER BY NAME");

    $ingredientDescription = file_get_contents("html/ingredientDescription.html");
    if($result) {
        while($row = $result->fetch_assoc()){
            $tmpDescr = $ingredientDescription;
            $tmpDescr = str_replace("<_INGREDIENT_ID/>", $row["id"], $tmpDescr);
            $tmpDescr = str_replace("<_INGREDIENT_NAME/>", $row["name"], $tmpDescr);
            $tmpDescr = str_replace("<_SAMPLE_GRAMS/>", $row["gramsProduct"], $tmpDescr);
            $tmpDescr = str_replace("<_SAMPLE_CARBS/>", $row["gramsCarbs"], $tmpDescr);
            $ingredientsList = $ingredientsList . $tmpDescr;
        }
    }

    $html->body = str_replace("<_INGREDIENTS_LIST/>", $ingredientsList, $html->body);

    if (isset($_GET["InvInp"])) //Invalid Input In New Ingredient Insertion
        $html->body = str_replace("<_ERROR/>","<span>Please insert valid data and try again.</span>",$html->body);
    else
        $html->body = str_replace("<_ERROR/>","",$html->body);

    $html->header = str_replace(
        '<body>',
        '<body onload="start();">',
            $html->header);

    $html->toHtml5();
    $html->printHtml();
?>
