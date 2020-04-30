function start()
{
	var recDescs = document.getElementById("recipesList").getElementsByTagName('form');
	for (i = 0; i<recDescs.length; i++)
	{
		var recD = new RecipeDescription();
		recD.connect(recDescs[i]);
	}
}
