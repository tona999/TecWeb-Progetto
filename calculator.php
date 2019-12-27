<?php
    $header = file_get_contents("html/header.html");
    /* Header */
    $header = str_replace(
        "<_TITLE/>",
        "Calc",
        $header);
    $header = str_replace(
        "<_META_TAGS/>",
        '<script src="js/Calculator.js"></script>'.
        '<script src="js/Ingredient.js"></script>'.
        '<script src="js/MathUtilities.js"></script>'.
        '<script src="js/Recipe.js"></script>'.
        '<link rel="stylesheet" type="text/css" href="styles/calculator.css">',
        $header);
    echo str_replace(
        "<body>",
        '<body onload="start()">',
        $header);
    require_once("php/menu.php");
    echo file_get_contents("html/calculator.html");
    echo file_get_contents("html/footer.html");
?>