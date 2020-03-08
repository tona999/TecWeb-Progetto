<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("Calculator");
$html->setMeta(
    '<script src="js/Calculator.js"></script>'.
    '<script src="js/Ingredient.js"></script>'.
    '<script src="js/MathUtilities.js"></script>'.
    '<script src="js/Recipe.js"></script>'.
    '<link rel="stylesheet" type="text/css" href="styles/calculator.css">');
    $html->noFooter();

if (isset($_SESSION["userId"]))
{
    $html->setBodyPath("html/calculator.html");

    //set body for starting on load
    $html->header = str_replace('<body>','<body onload="start();">',$html->header);
    $html->body = str_replace("<_SAMPLE_INGREDIENT/>", file_get_contents("html/sampleIngredient.html"), $html->body);
}
else
{
    $html->body = "<h1>PLEASE <a href='register.php'>REGISTER</a> AND <a href='login.php'>LOG IN</a> TO USE OUR CALCULATOR.</h1>";
}

$html->printHtml();
?>
