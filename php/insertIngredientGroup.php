<?php
	require_once("connection.php");
	session_start();

	$userId = $_SESSION['userId'];
	$group = json_decode($_POST['json'], true);

	$result = new stdClass();
	$result->successIds = array();
	$result->failIds = array();
	
	foreach($group as $ing)
	{
		$name = substr(trim($ing["ingredientName"]), 0, 40);
		$sg = intval($ing["sampleGrams"]);
		$sc = intval($ing["sampleCarbs"]);
		$idInList = intval($ing["idInList"]);

		//Input Check
		if($name=="" || $sg<$sc || $sg < 0 || $sc < 0) //The data is not valid => the ingredient can not be saved
			array_push($result->failIds, $idInList);
		else
		{
			$q = "INSERT INTO ingredient (userId, name, gramsProduct, gramsCarbs) VALUES ({$userId}, '{$name}', {$sg}, {$sc})";
    		$mysql->query($q);

			if($mysql->affected_rows > 0){
				$idStruct = new stdClass();
				$idStruct->idInList = $idInList;
				$idStruct->id = $mysql->insert_id;
				array_push($result->successIds, $idStruct);
			}
		}
	}
	echo json_encode($result);
?>