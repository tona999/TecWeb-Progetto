<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("Profile");
$html->setMeta(
      '<meta name="author" content="FAJN">'.
      '<meta name="description" content="Edit user profile data">'.
      '<meta name="robots" content="noindex">'.
      '<meta name="keywords" content="profile,diabetes,T1D,calculator" />'
);
$html->setBodyPath("html/profile.html");

//checks for errors in login
if(isset($_GET["err"])){
    if($_GET["err"]=="nameOrSurname"){
      $html->body = str_replace(
          "<ERROR/>",
          "<span class='error'>Invalid Name or Surname!</span>",
          $html->body);
    }
    else if($_GET["err"]=="date"){
        $html->body = str_replace(
            "<ERROR/>",
            "<span class='error'>Invalid Date: use the formate yyyy/mm/dd</span>",
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


require_once("php/connection.php");

$ingredientsList = "";
$result = $mysql->query("SELECT * FROM user WHERE Id={$_SESSION['userId']}");

while($row = $result->fetch_assoc()){
    $html->body = str_replace(
        '&name', $row['name'], $html->body
    );
    $html->body = str_replace(
        '&surname', $row['surname'], $html->body
    );
    $html->body = str_replace(
        '&email', $row['email'], $html->body
    );
    $html->body = str_replace(
        '&birthdate', $row['birthdate'], $html->body
    );
    $html->body = str_replace(
        '&admin', $row['birthdate']==1? "checked" : "false", $html->body
    );
}

$html->toHtml5();
$html->printHtml();
