<?php

/*
//LAB:
$host = "localhost";
$username = "fcarboni";
$passwd = "aeWai3veeyiach8F";
$dbname = "fcarboni";
*/

//LOCAL:
$host = "localhost";
$username = "root";
$passwd = "";
$dbname = "tecweb";

$mysql = new mysqli($host, $username, $passwd, $dbname);

if($mysql->connect_error){
    die("<b>Error connecting to database: </b>" . $mysql->connect_error);
}

?>