<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("Login");
$html->setMeta("");
$html->setLogged();
$html->setBodyPath("html/login.html");
    
//checks for error in login
if(isset($_GET["error"])){
    $html->body = str_replace(
        "<ERROR/>",
        "<span>Wrong username or password!</span>",
        $html->body);
} 
else{
    $html->body = str_replace("<ERROR/>","",$html->body);
}

$html->printHtml();
?>