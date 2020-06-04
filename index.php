<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("Home");
$html->setMeta(
      '<meta name="author" content="FAJN">'.
      '<meta name="description" content="Type 1 diabetes calculator homepage">'.
      '<meta name="robots" content="index,follow">'.
      '<meta name="keywords" content="diabetes,type 1 diabetes,T1D,calculator,insulin" />'
);
$html->setBodyPath("html/home.html");
$html->printHtml();
?>
