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

	$f = "SELECT name FROM ingredient WHERE userId='{$_SESSION['userId']}' AND id={$id}";
	$found = $mysql->query($f);
	if ($found != false && mysqli_num_rows($found) < 1)
		$response->ingredientNotFound = true;
	else
	{
		$q = "UPDATE ingredient SET name='{$name}', gramsProduct='{$sg}', gramsCarbs='{$sc}' WHERE userId='{$_SESSION['userId']}' AND id={$id}";
		$update = $mysql->query($q);
		$response->savingSuccessful = true;
	}

	echo json_encode($response);
?>