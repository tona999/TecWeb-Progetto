<?php

session_start();
$menu = file_get_contents("html/menu.html");
if(isset($_SESSION["logged"]) && $_SESSION["logged"] == true){
    $menu = str_replace(
        "<_LOGGED/>",
        '<li><a href="ingredients.php"><img src="img/icons/tool.svg" alt=""> Ingredients </a></li>'.
        '<li><a href="recipes.php"><img src="img/icons/tool.svg" alt=""> Recipes </a></li>',
        $menu);
}
else{
    $menu = str_replace(
        "<_LOGGED/>",
        "",
        $menu);
}

?>