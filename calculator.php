<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("Calc");
$html->setMeta(
    '<script src="js/Calculator.js"></script>'.
    '<script src="js/Ingredient.js"></script>'.
    '<script src="js/MathUtilities.js"></script>'.
    '<script src="js/Recipe.js"></script>'.
    '<link rel="stylesheet" type="text/css" href="styles/calculator.css">');
$html->setBodyPath("html/calculator.html");
$html->noFooter();

//set body for starting on load
$html->header = str_replace(
    '<body onload="',
    '<body onload="start(); ',
    $html->header);
$html->header = str_replace(
    '<body>',
    '<body onload="start();">',
        $html->header);

$html->body = str_replace("<_SAMPLE_INGREDIENT/>", file_get_contents("html/sampleIngredient.html"), $html->body);

$html->printHtml();
?>
