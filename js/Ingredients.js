function start()
{
	document.getElementById("insertForm").onsubmit = function() {
    	if (parseInt(document.getElementById("newSampleGrams").value) < parseInt(document.getElementById("newSampleCarbs").value))
		{
			document.getElementById("warningSpan").innerHTML = "Invalid Data Inserted. The ingredient was not saved.";
			return false;
		}
		else
			document.getElementById("warningSpan").innerHTML = "";
	};

	var ingDescs = document.getElementById("ingredientDescriptions").getElementsByTagName('form');
	for (i = 0; i<ingDescs.length; i++)
	{
		var ingD = new IngredientDescription();
		ingD.connect(ingDescs[i]);
	}
}
