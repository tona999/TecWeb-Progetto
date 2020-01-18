<?php
    //Header
    $header = file_get_contents("html/header.html");
    $header = str_replace(
        "<_TITLE/>",
        "T1D Calculator",
        $header);
    $header = str_replace(
        "<_META_TAGS/>",
        '<script src="js/Calculator.js"></script>'.
        '<script src="js/Ingredient.js"></script>'.
        '<script src="js/MathUtilities.js"></script>'.
        '<script src="js/Recipe.js"></script>'.
        '<link rel="stylesheet" type="text/css" href="styles/calculator.css">',
        $header);
    $header = str_replace(
        "<body>",
        '<body onload="start()">',
        $header);
    echo $header;

    //Menu
    require_once("php/menu.php");
    echo $menu;

    //Content
    $content = file_get_contents("html/calculator.html");
    $content = str_replace("<_SAMPLE_INGREDIENT/>", file_get_contents("html/sampleIngredient.html"), $content);
    echo $content;

    //Footer
    $footer = file_get_contents("html/footer.html");
    $footer = str_replace("<footer>", "<footer hidden>",$footer); //TODO: find better way to hide footer, or do not insert it at all.
    echo $footer;
?>
