<?php
	require_once("connection.php");
	session_start();
	
	$userId = $_SESSION['userId'];

	$request = json_decode($_POST['request']);
	$recipeId = $request->recipeId;
	$recipeName = substr(trim($request->recipeName), 0, 40);
	$ingredients = $request->ingredientsJson;

	if ($recipeName == '') {
		$response = new stdClass();
		$response->emptyName = true;
		echo json_encode($response);
		return;
		echo '{"inputError":"true"}';
		return;
	}

	$result=$mysql->query("SELECT userId as uId FROM recipe WHERE id={$recipeId}");
	$data = mysqli_fetch_assoc($result);
	$uId = $data['uId'];

	// check if all the ingredients are actually in the database. The user could have removed them after opening the calculator.
	// in this case, return the ids of the ingredients that were not found in the database. An error will be shown on the client side on these ingredient.
	$idString = '(';
	for($i=0; $i<count($ingredients); $i++)
	{
		if ($i>0)
			$idString = $idString.',';
		$idString=$idString.$ingredients[$i]->id;
	}
	$idString=$idString.')';

	$ingrsInDbResult = $mysql->query("SELECT id FROM ingredient WHERE userId={$userId} AND id IN $idString");
	$ingrsInDb = array();

	if ($ingrsInDbResult){
		while(($row =  mysqli_fetch_assoc($ingrsInDbResult))) {
			$ingrsInDb[] = $row['id'];
		}
	}

	// check if save was requested for an ingredient(s) that was not found in the database
	if (count($ingrsInDb)<count($ingredients)){
		$ingrsNotInDb = array();
		foreach($ingredients as $ing)
		{
			$found = false;
			for ($i = 0; $i<count($ingrsInDb); $i++)
			{
				if ($ing->id == $ingrsInDb[$i]){
					$found = true;
					break;
				}
			}
			if ($found == false)
				$ingrsNotInDb[] = $ing->id;
		}
		$response = new stdClass();
		$response->ingredientsNotFound = $ingrsNotInDb;
		echo json_encode($response);
		return;
	}

	if ($uId=="") // no recipe with id = recipeId. Create it.
	{
		if ($recipeId<0) // the recipe is being saved for the first time, the id is -1
			$mysql->query("INSERT INTO recipe (userId, name) VALUES ($userId, '{$recipeName}')");
		else // the recipe was removed by the user but it was already loaded in the calculator. Save the recipe with the id already used in the calculator.
			$mysql->query("INSERT INTO recipe (id, userId, name) VALUES ($recipeId, $userId, '{$recipeName}')");

		$recipeId = $mysql->insert_id;
	}
	else if ($uId != $userId) //Another user owns the recipe with that id. Abort.
	{
		echo $recipeId;
		return;
	}

	$mysql->query("DELETE FROM contains WHERE recipeId={$recipeId}");
    $ingList = "";
    foreach($ingredients as $ing)
	{
		$id = $ing->id;
		$grams = $ing->grams;
		if ($ingList!="")
			$ingList = $ingList.',';
		$ingList = $ingList."($recipeId, $id, $grams)";
	}
    $mysql->query("INSERT INTO contains (recipeId, ingredientId, gramsIngredient) VALUES $ingList");

	echo $recipeId;
?>