<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("Info");
$html->setMeta("<link rel='stylesheet' type='text/css' href='styles/info.css' media='screen'>");
$html->setBodyPath("html/info.html");
$html->printHtml();  
?>
