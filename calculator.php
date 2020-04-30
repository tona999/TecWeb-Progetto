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
    $html->body = "<h2>Please <a href='login.php'><button>Log in</button></a> or <a href='register.php'><button>Register</button></a> to use the calculator.</h2>";
}

$html->toHtml5();

$html->printHtml();
?>
