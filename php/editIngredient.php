<?php
	require_once("connection.php");
	session_start();

	$id = $_POST['id'];
	$name = trim($_POST['name']);
	$sg = intval($_POST['sg']);
	$sc = intval($_POST['sc']);

	$response = new stdClass();
	//Input Check
	if($name=="" || trim($id)=="" || $sg<$sc || $sg < 0 || $sc < 0){
		$response->invalidData = true;
		echo json_encode($response);
		return;
	}

	$q = "UPDATE Ingredient SET Name='{$name}', GramsProduct='{$sg}', GramsCarbs='{$sc}' WHERE UserId='{$_SESSION['userId']}' AND Id={$id}";
	$update = $mysql->query($q);
	
	if(!$update || $mysql->affected_rows < 1)
		$response->ingredientNotFound = true;
	else
		$response->savingSuccessful = true;

	echo json_encode($response);
?>
