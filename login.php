<?php
    //Header
    $header = file_get_contents("html/header.html");
    $header = str_replace(
        "<_TITLE/>",
        "Login",
        $header);
    $header = str_replace("<_META_TAGS/>","",$header);
    echo $header;

    //Menu
    require_once("php/menu.php");
    echo $menu;

    //Content
    $content = file_get_contents("html/login.html");
    //checks for error in login
    if(isset($_GET["error"])){
        $content = str_replace(
            "<_ERROR/>",
            "<span>Wrong username or password!</span>",
            $content);
    } else $content = str_replace("<_ERROR/>","",$content);
    echo $content;

    //Footer
    $footer = file_get_contents("html/footer.html");
    echo $footer;
?>