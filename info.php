<?php
    $header = file_get_contents("html/header.html");
    $header = str_replace(
        "<_TITLE/>",
        "Info",
        $header);
    $header = str_replace("<_META_TAGS/>","",$header);
    echo $header;
    require_once("php/menu.php");
    echo file_get_contents("html/info.html");
    echo file_get_contents("html/footer.html");
?>