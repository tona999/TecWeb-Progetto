<?php

require_once("connection.php");
if(!isset($_POST["email"]) || !isset($_POST["password"])) {
    header("Location: ../login.html");
}

/*  TODO: 
    - sanitize input 
    - add password check (also in js) */
$email = $_POST["email"];
$password = $_POST["password"];

$result = $mysql->query(
    "SELECT * FROM User 
    WHERE Email = '$email'
    AND Password_hash = '$password' ");

if($result->num_rows > 0){
    session_start();
    $_SESSION["logged"] = true;
    
    /* TODO: edit pages for logged users */
    header("Location: ../index.php");
}
else{ /* gets login page and add message */
    $login = "../html/login.html";
    $tag = "<!-- ERROR LOG -->";
    $message = "<p>Wrong email or password !</p>";
    $html = file_get_contents($login);
    $html = str_replace($tag, $message, $html);
    echo $html;
}

?>