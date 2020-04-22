<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("Info");
$html->setMeta("<link rel='stylesheet' type='text/css' href='styles/info.css'>");
$html->setBodyPath("html/info.html");
$html->printHtml();  
?>
