<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("Info");
$html->setMeta(
    '<meta name="author" content="FAJN">'.
    '<meta name="description" content="Learn how to calculate the corret amount of insulin">'.
    '<meta name="robots" content="index,nofollow">'.
    '<meta name="keywords" content="calculate,how,info,diabetes,T1D,calculator" />'.
    '<link rel="stylesheet" type="text/css" href="styles/info.css" media="screen" />'
);
$html->setBodyPath("html/info.html");
$html->printHtml();
?>
