<?php
	require_once("connection.php");
	
	session_start();

	$name = $_POST['name'];
	$sg = intval($_POST['sg']);
	$sc = intval($_POST['sc']);
	$userId = $_SESSION['userId'];
	
	//Input Check
	if(trim($name)=="" || $sg<$sc || $sg < 0 || $sc < 0){
		header("Location: ../ingredients.php?InvInp");
		return;
	}

	$name = "'".$name."'";

	$q = "INSERT INTO Ingredient (UserId, Name,GramsProduct,GramsCarbs) VALUES ($userId, $name, $sg, $sc)";

        $mysql->query($q);

	if($mysql->affected_rows > 0)
		header("Location: ../ingredients.php?last=".$mysql->insert_id);
	else
		header("Location: ../ingredients.php?last=-1");
?>
