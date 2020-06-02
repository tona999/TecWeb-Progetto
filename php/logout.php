<?php

session_start();
unset($_SESSION["userId"]);
unset($_SESSION["admin"]);
session_destroy();

header("Location: ../index.php");

?>