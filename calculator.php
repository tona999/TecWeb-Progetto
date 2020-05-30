<?php
require_once("php/page.php");
$html = new Page();
$html->requireLogin();
$html->setTitle("Calculator");
$html->setMeta(
    '<script type="text/javascript" src="js/Calculator.js"></script>'.
    '<script type="text/javascript" src="js/Ingredient.js"></script>'.
    '<script type="text/javascript" src="js/MathUtilities.js"></script>'.
    '<script type="text/javascript" src="js/Recipe.js"></script>'.
    '<link rel="stylesheet" type="text/css" href="styles/calculator.css" media="screen">');
    $html->noFooter();

$html->setBodyPath("html/calculator.html");

// run start function on body load
$html->header = str_replace('<body>','<body onload="start();">',$html->header);
$html->body = str_replace("<_SAMPLE_INGREDIENT/>", file_get_contents("html/sampleIngredient.html"), $html->body);

if (isset($_POST['ingredientId']))
    $html->body = str_replace("<_REQUESTED_INGREDIENT_ID/>", $_POST['ingredientId'], $html->body);
else
    $html->body = str_replace("<_REQUESTED_INGREDIENT_ID/>", '-1', $html->body);

if (isset($_POST['recipeId']))
    $html->body = str_replace("<_REQUESTED_RECIPE_ID/>", $_POST['recipeId'], $html->body);
else
    $html->body = str_replace("<_REQUESTED_RECIPE_ID/>", '-1', $html->body);

$html->toHtml5();
$html->printHtml();
?>