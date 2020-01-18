<?php
    //Header
    $header = file_get_contents("html/header.html");
    $header = str_replace(
        "<_TITLE/>",
        "Info",
        $header);
    $header = str_replace("<_META_TAGS/>","",$header);
    echo $header;

    //Menu
    require_once("php/menu.php");
    echo $menu;

    //Content
    $content = file_get_contents("html/info.html");
    echo $content;

    //Footer
    $footer = file_get_contents("html/footer.html");
    echo $footer;
?>
