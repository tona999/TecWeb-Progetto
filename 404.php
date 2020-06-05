<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("Page not found");
$html->setMeta(
  '<meta name="author" content="FAJN" />'.
  '<meta name="description" content="Page not found" />'.
  '<meta name="robots" content="noindex" />'.
  '<meta name="keywords" content="404,diabetes,type 1 diabetes,T1D,calculator" />'
);
$html->setBodyPath("html/404.html");
$html->printHtml();
?>
