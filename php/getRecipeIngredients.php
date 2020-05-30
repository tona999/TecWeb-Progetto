<?php
	require_once("connection.php");
	session_start();

	$id = $_GET['recipeId'];
	$q = "SELECT DISTINCT ingredientId as id, gramsIngredient as grams FROM contains JOIN recipe WHERE userId={$_SESSION['userId']} AND recipeId={$id}";
	$result = $mysql->query($q);

	$nq = $mysql->query("SELECT name FROM recipe WHERE userId={$_SESSION['userId']} AND id={$id}"); 
	$recName = mysqli_fetch_assoc($nq)['name'];

	$ings = array();
	$rec = new \stdClass();
	if ($result) {
    	while ($row = mysqli_fetch_assoc($result)) {
    		$ing = new \stdClass();
    		$ing->id = $row["id"];
    		$ing->grams = $row["grams"];
    		$ings[] = $ing;
		}
    	$result->close();
	}
	$rec->ingredientsList = $ings;
	$rec->name = $recName;
	$rec->id = $id;

	if ($recName==null){
		echo -1;
		return;
	}

	echo json_encode($rec);
?>