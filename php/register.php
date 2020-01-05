<?php

require_once("connection.php");

if(!isset($_POST["email"]) || !isset($_POST["password"]) || !isset($_POST["password2"]) || !isset($_POST["name"]) || !isset($_POST["surname"]) || !isset($_POST["birthdate"])) {
    header("Location: ../registerPage.php");
}


$email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
$password = $_POST["password"];
$password2 = $_POST["password2"];
$name = $_POST["name"];
$surname = $_POST["surname"];
$birthdate = $_POST["birthdate"];


/* Email sanitize and check */
if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
    header("Location: ../registerPage.php?err=email");
    die;
}
// check if the passwords are matching
if($password != $password2){
    header("Location: ../registerPage.php?err=password");
    die;
}

$checkDuplicateEmail = $mysql->query(
    "SELECT * FROM User
    WHERE Email = '$email' ");

if($checkDuplicateEmail->num_rows > 0) {
  header("Location: ../registerPage.php?err=emailInUse");
  die;
}

// insertion query
$insert = $mysql->query(
    "INSERT INTO User (Name, Surname, Email, Password_hash, Admin, Birthdate)
    VALUES ('$name', '$surname','$email','$password',false,'$birthdate')");

// check if has been inserted and gives the Id for this session
$isInserted = $mysql->query(
        "SELECT * FROM User
        WHERE Email = '$email' ");

if($insert){
    session_start();

    while($row = $isInserted->fetch_assoc()){
        $_SESSION["userId"] = $row["Id"];
        $_SESSION["admin"] = $row["Admin"];
    }
    /* TODO: edit pages for logged users */
    header("Location: ../index.php");
}
else{ //gets login page and add message
    header("Location: ../registerPage.php?err=onInsert");
}

?>
