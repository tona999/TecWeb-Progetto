<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("Info");
$html->setMeta(
    '<meta name="author" content="FAJN">'.
    '<meta name="description" content="Learn how to use our calculator.">'.
    '<meta name="robots" content="index,nofollow">'.
    '<meta name="keywords" content="calculator, how to, calculate, info, diabetes, T1D" />'.
    '<link rel="stylesheet" type="text/css" href="styles/info.css" media="screen" />'
);
$html->setBodyPath("html/info.html");
$html->printHtml();
?>
