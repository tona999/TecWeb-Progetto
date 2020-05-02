<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("Register");
$html->setMeta("");
$html->setBodyPath("html/register.html");

//checks for errors in login
if(isset($_GET["err"])){
    if($_GET["err"]=="nameOrSurname"){
      $html->body = str_replace(
          "<ERROR/>",
          "<span>Invalid Name or Surname!</span>",
          $html->body);
    }
    else if($_GET["err"]=="pass"){
        $html->body = str_replace(
            "<ERROR/>",
            "<span>Wrong username or password!</span>",
            $html->body);
    }
    else if($_GET["err"]=="email"){
        $html->body = str_replace(
            "<ERROR/>",
            "<span>Invalid email!</span>",
            $html->body);
    }
    else if($_GET["err"]=="date"){
        $html->body = str_replace(
            "<ERROR/>",
            "<span>Invalid Date: use the formate yyyy/mm/dd</span>",
            $html->body);
    }
    else if($_GET["err"]=="password"){
        $html->body = str_replace(
            "<ERROR/>",
            "<span>Passwords don't match</span>",
            $html->body);
    }
    else if($_GET["err"]=="passwordFormat"){
        $html->body = str_replace(
            "<ERROR/>",
            "<span>Password must contain between 6 and 15 characters</span>",
            $html->body);
    }
    else if($_GET["err"]=="emailInUse"){
        $html->body = str_replace(
            "<ERROR/>",
            "<span>Email already used</span>",
            $html->body);
    }
    else if($_GET["err"]=="onInsert"){
        $html->body = str_replace(
            "<ERROR/>",
            "<span>ERROR creating user</span>",
            $html->body);
    }
}
else{
    $html->body = str_replace("<ERROR/>","",$html->body);
}

$html->toHtml5();
$html->printHtml();
?>
