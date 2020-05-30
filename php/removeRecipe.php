<?php
	require_once("connection.php");
	session_start();

	$id = $_POST['id'];
	$q = "DELETE FROM recipe WHERE userId={$_SESSION['userId']} AND id={$id}";
	$mysql->query($q);

	if($mysql->affected_rows > 0)
		echo 1;	
	else
		echo 0;
?>
