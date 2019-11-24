function start()
{
	addIngredient();
}

function addIngredient()
{
	var receipt = document.getElementById("receipt")
	var ingredient = document.createElement("object");
	ingredient.type = "text/html";
	ingredient.data = "ingredient.html";

	receipt.appendChild(ingredient);
	
	//ingredient.removeAttribute("id");
}