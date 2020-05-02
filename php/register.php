<?php

require_once("connection.php");

if(!isset($_POST["email"]) || !isset($_POST["password"]) || !isset($_POST["password2"]) || !isset($_POST["name"]) || !isset($_POST["surname"]) || !isset($_POST["birthdate"])) {
    header("Location: ../registerPage.php");
}

$email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
$password = $_POST["password1"];
$password2 = $_POST["password2"];
$name = $_POST["name"];
$surname = $_POST["surname"];
$birthdate = $_POST["birthdate"];
$dateFormatted = date('Y-m-d', strtotime($_POST["birthdate"]));


function validateDate($dateFormatted){
  $months = [31,28,31,30,31,30,31,31,30,31,30,31];
  $datePattern = '/^(?<year>[0-9]{4})[\/|-](?<month>[0-9]{1,2})[\/|-](?<day>[0-9]{1,2})$/';
  preg_match_all($datePattern, $dateFormatted, $matches);


  if ($matches["year"][0] < (date('Y') - 3) && $matches["year"][0] > (date('Y')-150)) {
    if ($matches["month"][0] < 13 && $matches["month"][0] > 0 ) {
      if ($matches["year"][0]%4 == 0) {
        $months[$matches["month"][0]-1]++;
      }
      if ($matches["day"][0] < $months[$matches["month"][0]-1] && $matches["day"][0] > 0) {
        return;
      }
    }
  }

  header("Location: ../registerPage.php?err=date");
  die;

}

function validateName($name) {
  $namePattern = '/^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$/';
  if (preg_match($namePattern,$name)) {
    return;
  }
  header("Location: ../registerPage.php?err=nameOrSurname");
  die;
}

function validateEmail($email) {
  if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
      header("Location: ../registerPage.php?err=email");
      die;
  }
}

function validatePassword($password1,$password2) {
  if($password1 != $password2){
      header("Location: ../registerPage.php?err=password");
      die;
  } else if (strlen($password1)< 6 || strlen($password1) > 15){
      header("Location: ../registerPage.php?err=passwordFormat");
      die;
  }
}


validateName($name);
validateName($surname);
validateEmail($email);
validateDate($dateFormatted);
validatePassword($password, $password2);

$password = sha1($password);

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
    VALUES ('$name', '$surname','$email','$password',false,'$dateFormatted')");

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
