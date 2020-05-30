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
$password = sha1($_POST["password"]);

$result = $mysql->query(
    "SELECT * FROM user 
    WHERE email = '$email'
    AND password_hash = '$password' ");

if($result->num_rows > 0){
    session_start();    

    while($row = $result->fetch_assoc()){
        $_SESSION["userId"] = $row["id"];
        $_SESSION["admin"] = $row["admin"];
    }

    /* TODO: edit pages for logged users */
    header("Location: ../index.php");
}
else{ //gets login page and add message
    header("Location: ../login.php?err=pass");
}

?>