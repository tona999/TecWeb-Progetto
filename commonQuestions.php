<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("FAQ");
$html->setMeta("");
$html->setBodyPath("html/commonQuestions.html");
$html->printHtml();    
?>