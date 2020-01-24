<?php
	require_once("connection.php");
	session_start();

	$q = "SELECT * FROM Ingredient WHERE UserId='{$_SESSION["userId"]}'";
        $res = $mysql->query($q);

	while($row = $res->fetch_assoc()){
		$json->ids[] = $row['Id'];
		$json->names[] = $row['Name'];
		$json->sampleGrams[] = $row['GramsProduct'];
		$json->sampleCarbs[] = $row['GramsCarbs'];
	}

	echo json_encode($json);
?>
