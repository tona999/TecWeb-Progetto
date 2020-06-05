<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("FAQ");
$html->setMeta(
    '<meta name="author" content="FAJN" />'.
    '<meta name="description" content="Learn more about type 1 diabetes" />'.
    '<meta name="robots" content="index,follow" />'.
    '<meta name="keywords" content="FAQ,type 1 diabetes,T1D,insulin,dose,carbohydrates" />'
);
$html->setBodyPath("html/commonQuestions.html");
$html->printHtml();
?>
