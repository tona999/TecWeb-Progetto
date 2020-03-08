<?php
	require_once("connection.php");
	session_start();

	$id = $_GET['recipeId'];
	$q = "SELECT DISTINCT IngredientId as id, GramsIngredient as grams FROM contains JOIN recipe WHERE UserId={$_SESSION['userId']} AND RecipeId={$id}";
	$result = $mysql->query($q);
	if ($result) {
    	while ($row = mysqli_fetch_assoc($result)) {
    		$ing = new \stdClass();
    		$ing->id = $row["id"];
    		$ing->grams = $row["grams"];

    		$ings[] = $ing;
    	}
		echo json_encode($ings);
    	$result->close();
	}
?>