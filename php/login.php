<?php

require_once("connection.php");

if(!isset($_POST["email"]) || !isset($_POST["password"])) {
    header("Location: ../login.php");
}

/*  TODO: 
    - sanitize input 
    - add mail check (also in js) */
$email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
$password = $_POST["password"];

$result = $mysql->query(
    "SELECT * FROM User 
    WHERE Email = '$email'
    AND Password_hash = '$password' "); //TODO: change with actually the HASH!

if($result->num_rows > 0){
    session_start();
    $_SESSION["logged"] = true;
    
    echo "Logged <br>";
    while($row = $result->fetch_assoc()){
        $_SESSION["admin"] = $row["Admin"];
    }

    /* TODO: edit pages for logged users */
    header("Location: ../index.php");
}
else{ //gets login page and add message
    header("Location: ../login.php?error");
}

?>