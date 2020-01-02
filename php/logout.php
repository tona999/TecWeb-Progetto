<?php

session_start();
unset($_SESSION["userID"]);
unset($_SESSION["admin"]);
session_destroy();

header("Location: ../index.php");

?>