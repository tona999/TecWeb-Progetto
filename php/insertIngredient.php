<?php
	require_once("connection.php");
	session_start();

	$name = $_POST['ingredientName'];
	$sg = intval($_POST['sampleGrams']);
	$sc = intval($_POST['sampleCarbs']);
	$userId = $_SESSION['userId'];
	
	//Input Check
	if(trim($name)=="" || $sg<$sc || $sg < 0 || $sc < 0){
		echo "Invalid Input";
		return;
	}

	$q = "INSERT INTO Ingredient (UserId, Name, GramsProduct, GramsCarbs) VALUES ($userId, '{$name}', $sg, $sc)";

    $mysql->query($q);
?>
