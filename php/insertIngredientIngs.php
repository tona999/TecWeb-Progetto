<?php
	require_once("insertIngredient.php");
	if($mysql->affected_rows > 0)
		header("Location: ../ingredients.php?last=".$mysql->insert_id);
	else
		header("Location: ../ingredients.php?last=-1");
?>
