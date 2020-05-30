<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("Page not found");
$html->setMeta("");
$html->setBodyPath("html/404.html");
$html->printHtml();    
?>