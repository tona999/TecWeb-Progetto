<?php
	require_once("connection.php");
	session_start();

	$id = $_GET['recipeId'];
	$q = "SELECT DISTINCT IngredientId as id, GramsIngredient as grams FROM contains JOIN recipe WHERE UserId={$_SESSION['userId']} AND RecipeId={$id}";
	$result = $mysql->query($q);

	$nq = $mysql->query("SELECT Name FROM recipe WHERE UserId={$_SESSION['userId']} AND Id={$id}"); 
	$recName = mysqli_fetch_assoc($nq)['Name'];

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