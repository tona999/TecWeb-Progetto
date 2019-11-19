function start()
{
	addIngredient();
}

function addIngredient()
{
	var ingredient = document.createElement("iframe");
	ingredient.src = "ingredient.html";

	var receipt = document.getElementById("receipt")
	receipt.appendChild(ingredient);
}