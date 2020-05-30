<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("Login");
$html->setMeta("");
$html->setLogged();
$html->setBodyPath("html/login.html");
    
//checks for errors in login
if(isset($_GET["err"])){
    if($_GET["err"]=="pass"){
        $html->body = str_replace(
            "<ERROR/>",
            "<span class='error'>Wrong username or password!</span>",
            $html->body);
    }
    else if($_GET["err"]=="email"){
        $html->body = str_replace(
            "<ERROR/>",
            "<span class='error'>Invalid email!</span>",
            $html->body);
    }
} 
else{
    $html->body = str_replace("<ERROR/>","",$html->body);
}

$html->printHtml();
?>