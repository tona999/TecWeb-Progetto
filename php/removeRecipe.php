<?php
	require_once("connection.php");
	session_start();

	$id = $_POST['id'];
	$q = "DELETE FROM Recipe WHERE UserId={$_SESSION['userId']} AND Id={$id}";
	$mysql->query($q);

	if($mysql->affected_rows > 0)
		echo 1;	
	else
		echo 0;
?>
