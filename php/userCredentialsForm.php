<?php

require_once("connection.php");

if(!isset($_POST["email"]) || !isset($_POST["password1"]) || !isset($_POST["password2"]) || !isset($_POST["name"]) || !isset($_POST["surname"]) || !isset($_POST["birthdate"]) || !isset($_POST["oldPassword"])) {
    header("Location: ../userCredentials.php?err=fill");
    die;
}

<<<<<<< HEAD
error_log("dd");

=======
>>>>>>> develop
$email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
$password1 = $_POST["password1"];
$password2 = $_POST["password2"];
$name = $_POST["name"];
$surname = $_POST["surname"];
$birthdate = $_POST["birthdate"];
$dateFormatted = date('Y-m-d', strtotime($_POST["birthdate"]));
$oldPassword = $_POST["oldPassword"];

function validateDate($dateFormatted){
  $months = array(31,28,31,30,31,30,31,31,30,31,30,31);
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

  header("Location: ../userCredentials.php?err=date");
  die;

}

function validateName($name) {
  $namePattern = '/^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$/';
  if (preg_match($namePattern,$name)) {
    return;
  }
  header("Location: ../userCredentials.php?err=nameOrSurname");
  die;
}

function validateEmail($email) {
  if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
      header("Location: ../userCredentials.php?err=email");
      die;
  }
}

function validatePassword($password1,$password2) {
  if($password1 != $password2){
      header("Location: ../userCredentials.php?err=password");
      die;
  } else if (strlen($password1)< 6 || strlen($password1) > 15){
      header("Location: ../userCredentials.php?err=passwordFormat");
      die;
  }
}


validateName($name);
validateName($surname);
validateEmail($email);
validateDate($dateFormatted);
validatePassword($password1, $password2);

// TODO: verificare che sia attiva la sessione
if(!isset($_SESSION["userId"])) {
  header("Location: ../userCredentials.php?err=notLogged");
  die;
}
$id = $_SESSION["userId"];

$checkDuplicateEmail = $mysql->query(
    "SELECT * FROM User
    WHERE Email = '$email'
    AND Id != '$id'");

if($checkDuplicateEmail->num_rows > 0) {
      header("Location: ../userCredentials.php?err=emailInUse");
      die;
    }

$checkOldPassword = $mysql->query(
        "SELECT Password_hash FROM User
        WHERE Id = '$id'");


if($checkOldPassword->num_rows > 0) {
  $row = $checkOldPassword->fetch_assoc();
  if($oldPassword != $row["Password_hash"]) {
      header("Location: ../userCredentials.php?err=oldPassword");
      die;
  }
}
else {
  error_log("user not found");
}

// error_log("UPDATE User
// SET Name = '".$name."', Surname = '".$surname."', Email = '".$email."', Password_hash = '".$password1."', Birthdate = '".$dateFormatted."'
// WHERE Id = ".$id);
// insertion query
$update = $mysql->query(
  "UPDATE User
  SET Name = '".$name."', Surname = '".$surname."', Email = '".$email."', Password_hash = '".$password1."', Birthdate = '".$dateFormatted."'
  WHERE Id = ".$id
);

// check if has been inserted and gives the Id for this session

if($update){
    header("Location: ../userCredentials.php?err=updated");
    die;
}
else { //gets login page and add message
    header("Location: ../userCredentials.php?err=onInsert");
    die;
}

error_log("dd");

?>
