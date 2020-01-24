<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("Info");
$html->setMeta("");
$html->setLogged();
$html->setBodyPath("html/info.html");
$html->printHtml();  
?>