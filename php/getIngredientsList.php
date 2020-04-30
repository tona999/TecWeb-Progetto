<?php
	require_once("connection.php");
	session_start();

	$q = "SELECT * FROM Ingredient WHERE UserId='{$_SESSION["userId"]}'";
    $res = $mysql->query($q);

	$ings = array();
	while($row = $res->fetch_assoc()){
		$ing = new \stdClass();
		$ing->id = $row['Id'];
		$ing->name = $row['Name'];
		$ing->sampleGrams = $row['GramsProduct'];
		$ing->sampleCarbs = $row['GramsCarbs'];

		$ings[] = $ing;
	}

	echo json_encode($ings);
?>
