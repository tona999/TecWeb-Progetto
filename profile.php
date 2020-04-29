<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("Profile");
$html->setMeta("");
$html->setBodyPath("html/profile.html");

require_once("php/connection.php");

$ingredientsList = "";
$result = $mysql->query("SELECT * FROM User WHERE Id={$_SESSION['userId']}");

while($row = $result->fetch_assoc()){
    $html->body = str_replace(
        '&name', $row['Name'], $html->body
    );
    $html->body = str_replace(
        '&surname', $row['Surname'], $html->body
    );
    $html->body = str_replace(
        '&email', $row['Email'], $html->body
    );
    $html->body = str_replace(
        '&birthdate', $row['Birthdate'], $html->body
    );
    $html->body = str_replace(
        '&admin', $row['Birthdate']==1? "checked" : "false", $html->body
    );
}

$html->printHtml();