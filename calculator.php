<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("Calculator");
$html->setMeta(
    '<script type="text/javascript" src="js/Calculator.js"></script>'.
    '<script type="text/javascript" src="js/Ingredient.js"></script>'.
    '<script type="text/javascript" src="js/MathUtilities.js"></script>'.
    '<script type="text/javascript" src="js/Recipe.js"></script>'.
    '<link rel="stylesheet" type="text/css" href="styles/calculator.css" media="screen">');
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
    $html->body = "<h1>Please <a href='register.php'>register</a> or <a href='login.php'>log in</a> to use the calculator.</h1>";
}

$html->toHtml5();

$html->printHtml();
?>
