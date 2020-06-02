<?php
require_once("connection.php");

if(!isset($_POST["email"]) || !isset($_POST["name"]) || !isset($_POST["surname"]) || !isset($_POST["birthdate"])) {
    header("Location: ../profile.php");
}

session_start();
$id = $_SESSION["userId"];
$email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
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

  header("Location: ../profile.php?err=date");
  die;

}

function validateName($name) {
  $namePattern = '/^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$/';
  if (preg_match($namePattern,$name)) {
    return;
  }
  header("Location: ../profile.php?err=nameOrSurname");
  die;
}

function validateEmail($email) {
  if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
      header("Location: ../profile.php?err=email");
      die;
  }
}


validateName($name);
validateName($surname);
validateEmail($email);
validateDate($dateFormatted);

// update query
$update = $mysql->query(
    "UPDATE client 
    SET name='$name', surname='$surname', email='$email', birthdate='$dateFormatted'
    WHERE id=$id");

if(!$update){ //gets profile page and add message
    header("Location: ../profile.php?err=onUpdate");
}
else{
    header("Location: ../profile.php");
}

?>
