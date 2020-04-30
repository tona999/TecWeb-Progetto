<?php
	require_once("insertIngredient.php");

	if($mysql->affected_rows > 0)
		echo $mysql->insert_id;
	else
		echo "-1";
?>
