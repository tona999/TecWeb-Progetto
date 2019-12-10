var sampleIngredientCopy;
var receiptView;
var nameMaxLength = 25;

function start()
{
	sampleIngredientCopy = document.getElementById("sampleIngredient").cloneNode(true);
	document.getElementById("sampleIngredient").remove();

	document.getElementById("addNewBtn").addEventListener('click', function(){addIngredient();});
	document.getElementById("loadReceiptCardBtn").addEventListener('click', function(){refreshReceiptData();});
	document.getElementById("saveReceiptBtn").addEventListener('click', function(){saveReceipt();});

	//receipt VIEW
	var rv = new Ingredient();
	rv.connect(getNewIngredientBody("receiptView"));

	var cake = new Receipt();
	cake.connect(document.getElementById("receipt"), document.getElementById("totalReceiptGrams"), document.getElementById("totalReceiptCarbs"), rv);

	var I1 = new Ingredient("Ingredient 1", 100, 50, 50, -1, 5);
	I1.connect(getNewIngredientBody());
	cake.addIngredient(I1);

	var I2 = new Ingredient("Ingredient 2", 100, 50, 50, -1, 5);
	I2.connect(getNewIngredientBody());
	cake.addIngredient(I2);

	var I3 = new Ingredient("Ingredient 3", 100, 50, 50, -1, 5);
	I3.connect(getNewIngredientBody());
	cake.addIngredient(I3);
}


function getNewIngredientBody(parentId = "receipt")
{
	var htmlIng = sampleIngredientCopy.cloneNode(true);
	document.getElementById(parentId).appendChild(htmlIng);
	return htmlIng;
}