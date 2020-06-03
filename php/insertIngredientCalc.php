<?php
	require_once("insertIngredient.php");

	if($result == '' && $mysql->affected_rows > 0)
		echo $mysql->insert_id;
	else if ($result == '')
		echo "-1";
	else
		echo $result;
?>
