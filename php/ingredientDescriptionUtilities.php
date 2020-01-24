<?php
    function getNewIngredientDescription($Id, $Name, $GramsProduct, $GramsCarbs)
    {
    	$tmpDescr = file_get_contents("html/ingredientDescription.html");
    	$tmpDescr = str_replace("<_INGREDIENT_ID/>", $Id, $tmpDescr);
	$tmpDescr = str_replace("<_INGREDIENT_NAME/>", $Name, $tmpDescr);
	$tmpDescr = str_replace("<_SAMPLE_GRAMS/>", $GramsProduct, $tmpDescr);
	$tmpDescr = str_replace("<_SAMPLE_CARBS/>", $GramsCarbs, $tmpDescr);
	return $tmpDescr;
    }
?>
