<?php
	require_once("connection.php");
	session_start();

	$userId = $_SESSION['userId'];
	$recipeId = $_POST["recipeId"];
	$recipeName = substr(trim($_POST['recipeName']), 0, 40);
	$ingredients = json_decode($_POST["json"]);

	$result=$mysql->query("SELECT UserId as uId FROM Recipe WHERE Id={$recipeId}");
	$data = mysqli_fetch_assoc($result);
	$uId = $data['uId'];

	if ($uId=="") //No recipe with that id. Create it.
	{
		if ($recipeId<0)
			$mysql->query("INSERT INTO Recipe (UserId, Name) VALUES ($userId, '{$recipeName}')");
		else
			$mysql->query("INSERT INTO Recipe (Id, UserId, Name) VALUES ($recipeId, $userId, '{$recipeName}')");

		$recipeId = $mysql->insert_id;
	}
	else if ($uId!= $userId) //Another user owns the recipe with that id. Abort.
	{
		echo $recipeId;
		return;
	}

	$mysql->query("DELETE FROM Contains WHERE RecipeId={$recipeId}");
    $ingList = "";
    foreach($ingredients as $ing)
	{
		$id = $ing->id;
		$grams = $ing->grams;
		if ($ingList!="")
			$ingList = $ingList.',';
		$ingList = $ingList."($recipeId, $id, $grams)";
	}
    $mysql->query("INSERT INTO Contains (RecipeId, IngredientId, GramsIngredient) VALUES $ingList");

	echo $recipeId;
?>