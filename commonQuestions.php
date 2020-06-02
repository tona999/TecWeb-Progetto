<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("FAQ");
$html->setMeta(
    '<meta name="author" content="FAJN">'.
    '<meta name="description" content="Learn more about how calculate insulin from frequently asked questions">'.
    '<meta name="robots" content="index,follow">'.
    '<meta name="keywords" content="FAQ,calculate,how calculate,diabetes,T1D,calculator,insulin" />'
);
$html->setBodyPath("html/commonQuestions.html");
$html->printHtml();
?>
