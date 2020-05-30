<?php

$host = "localhost";
$username = "root";
$passwd = "root";
$dbname = "tecweb";

$mysql = new mysqli($host, $username, $passwd, $dbname);

if($mysql->connect_error){
    die("<b>Error connecting to database: </b>" . $mysql->connect_error);
}

?>
