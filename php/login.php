<?php

require_once("connection.php");

if(!isset($_POST["email"]) || !isset($_POST["password"])) {
    header("Location: ../login.php");
}

/* Email sanitize and check */
$email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
    header("Location: ../login.php?err=email");
    die;
}
$password = $_POST["password"];

$result = $mysql->query(
    "SELECT * FROM User 
    WHERE Email = '$email'
    AND Password_hash = '$password' "); //TODO: change with actually the HASH!

if($result->num_rows > 0){
    session_start();    

    while($row = $result->fetch_assoc()){
        $_SESSION["userId"] = $row["Id"];
        $_SESSION["admin"] = $row["Admin"];
    }

    /* TODO: edit pages for logged users */
    header("Location: ../index.php");
}
else{ //gets login page and add message
    header("Location: ../login.php?err=pass");
}

?>
