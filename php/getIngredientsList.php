<?php
	require_once("connection.php");
	session_start();

	$q = "SELECT * FROM ingredient WHERE userId='{$_SESSION["userId"]}'";
    $res = $mysql->query($q);

	$ings = array();
	while($row = $res->fetch_assoc()){
		$ing = new \stdClass();
		$ing->id = $row['id'];
		$ing->name = $row['name'];
		$ing->sampleGrams = $row['gramsProduct'];
		$ing->sampleCarbs = $row['gramsCarbs'];

		$ings[] = $ing;
	}

	echo json_encode($ings);
?>
