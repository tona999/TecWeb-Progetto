<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("Info");
<<<<<<< HEAD
$html->setMeta("");
$html->setLogged();
=======
$html->setMeta("<link rel='stylesheet' type='text/css' href='styles/info.css' media='screen' />");
>>>>>>> develop
$html->setBodyPath("html/info.html");
$html->printHtml();  
?>