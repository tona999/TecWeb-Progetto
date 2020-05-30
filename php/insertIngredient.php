<?php
	require_once("connection.php");
	session_start();
	
	$name = substr(trim($_POST['ingredientName']), 0, 40);
	$sg = intval($_POST['sampleGrams']);
	$sc = intval($_POST['sampleCarbs']);
	$userId = $_SESSION['userId'];
	
	//Input Check
	if($name=="" || $sg<$sc || $sg < 0 || $sc < 0){
		echo "Invalid Input";
		return;
	}

	$q = "INSERT INTO ingredient (userId, Name, gramsProduct, gramsCarbs) VALUES ($userId, '{$name}', $sg, $sc)";
    $mysql->query($q);
?>
