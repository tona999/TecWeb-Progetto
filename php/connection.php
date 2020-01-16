<?php

$host = "localhost";
$username = "fcarboni";
$passwd = "aeWai3veeyiach8F";
$dbname = "fcarboni";

$mysql = new mysqli($host, $username, $passwd, $dbname);

if($mysql->connect_error){
    die("<b>Error connecting to database: </b>" . $mysql->connect_error);
}

?>