<?php
	require_once("connection.php");
	
	session_start();

	$id = $_POST['id'];
	$name = trim($_POST['name']);
	$sg = intval($_POST['sg']);
	$sc = intval($_POST['sc']);

	//Input Check
	if($name=="" || trim($id)=="" || $sg<$sc || $sg < 0 || $sc < 0){
		echo 0;
		return;
	}

	$q = "UPDATE Ingredient SET Name='" . $name . "', GramsProduct=". $sg . ", GramsCarbs=" . $sc . " WHERE UserId=" . $_SESSION["userId"] . " AND Id=" . $id;

        $update = $mysql->query($q);

	if(!$update)
		echo 0;	
	else
		echo 1;
?>
