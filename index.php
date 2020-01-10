<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("Home");
$html->setMeta("");
$html->setBodyPath("html/home.html");
$html->printHtml();    
?>