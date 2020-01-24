<?php
require_once("php/page.php");
require_once("php/connection.php");

$html = new Page();
$html->setTitle("User Credentials");
$html->setMeta("");
$html->setLogged();
$html->setBodyPath("html/userCredentials.html");

if(!isset($_SESSION["userId"])) {
  header("Location: ../userCredentials.php?err=notLogged");
  die;
}
$id = $_SESSION["userId"];


$user = $mysql->query(
    "SELECT *
    FROM User
    WHERE Id = '$id'");


function replacePlaceholder($user, $html) {
  if ($user->num_rows > 0) {
    // output data of each row
    $row = $user->fetch_assoc();

    $html->body = str_replace("placeholder_name",$row['Name'],$html->body);
    $html->body = str_replace("placeholder_surname",$row['Surname'],$html->body);
    $html->body = str_replace("placeholder_email",$row['Email'],$html->body);
    $html->body = str_replace("placeholder_birthdate",$row['Birthdate'],$html->body);


    }
   else {
    echo "0 results";
  }
}
replacePlaceholder($user,$html);
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
            "<span>New Passwords don't match</span>",
            $html->body);
    }
    else if($_GET["err"]=="passwordFormat"){
        $html->body = str_replace(
            "<ERROR/>",
            "<span>New password must contain between 6 and 15 characters</span>",
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
    else if($_GET["err"]=="updated"){
        $html->body = str_replace(
            "<ERROR/>",
            "<span>Your credentials have been updated!</span>",
            $html->body);
    }
    else if($_GET["err"]=="oldPassword"){
        $html->body = str_replace(
            "<ERROR/>",
            "<span>Old password wrong!</span>",
            $html->body);
    }
    else if($_GET["err"]=="fill"){
        $html->body = str_replace(
            "<ERROR/>",
            "<span>Fill the fields required!</span>",
            $html->body);
    }
    else if($_GET["err"]=="notLogged"){
        $html->body = str_replace(
            "<ERROR/>",
            "<span>Your are not logged in.<br> <a href='login.php'>Go to Login</a></p>",
            $html->body);
    }
}
else{
    $html->body = str_replace("<ERROR/>","",$html->body);
}

$html->printHtml();
?>
