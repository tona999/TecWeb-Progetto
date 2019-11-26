var sampleIngredientCopy;
var totalGramsLastChanged = true;
function start()
{
	sampleIngredientCopy = document.getElementById("sampleIngredient").cloneNode(true);
	document.getElementById("sampleIngredient").remove();
	addIngredient();
}

function addIngredient()
{
	var ing = sampleIngredientCopy.cloneNode(true);
	ing.removeAttribute("id");
	document.getElementById("receipt").appendChild(ing);

	ing.ingredientName = 	document.getElementById("ingredientName");
	ing.closeButton = 		document.getElementById("closeButton");
	ing.sampleGrams = 		document.getElementById("sampleGrams");
	ing.sampleCarbs = 		document.getElementById("sampleCarbs");
	ing.totalGrams = 		document.getElementById("totalGrams");
	ing.totalBreadUnits = 	document.getElementById("totalBreadUnits");
	ing.piecesNumber = 		document.getElementById("piecesNumber");
	ing.plusButton = 		document.getElementById("plusButton");
	ing.minusButton = 		document.getElementById("minusButton");
	ing.gramsPP = 			document.getElementById("gramsPP");
	ing.breadUnitsPP = 		document.getElementById("breadUnitsPP");
	ing.carbsPP = 			document.getElementById("carbsPP");

	ing.closeButton.addEventListener('click', function(){onCloseClicked(ing)}, false);
	ing.sampleGrams.addEventListener('input', function(){onSampleGramsChanged(ing)}, false);
	ing.sampleCarbs.addEventListener('input', function(){onSampleCarbsChanged(ing)}, false);
	ing.totalGrams.addEventListener('input', function(){onTotalGramsChanged(ing)}, false);
	ing.totalBreadUnits.addEventListener('input', function(){onTotalBreadUnitsChanged(ing)}, false);
	ing.piecesNumber.addEventListener('input', function(){onPiecesNumberChanged(ing)}, false);
	ing.plusButton.addEventListener('click', function(){onSignClicked(ing, 1)}, false);
	ing.minusButton.addEventListener('click', function(){onSignClicked(ing, -1)}, false);

	ing.ingredientName.removeAttribute("id");
	ing.closeButton.removeAttribute("id");
	ing.sampleGrams.removeAttribute("id");
	ing.sampleCarbs.removeAttribute("id");
	ing.totalGrams.removeAttribute("id");
	ing.totalBreadUnits.removeAttribute("id");
	ing.piecesNumber.removeAttribute("id");
	ing.plusButton.removeAttribute("id");
	ing.minusButton.removeAttribute("id");
	ing.gramsPP.removeAttribute("id");
	ing.breadUnitsPP.removeAttribute("id");
	ing.carbsPP.removeAttribute("id");
} 

function refreshReceiptData()
{
	var receipt = document.getElementById("receipt");

	var totalReceiptGrams = 0;
	var totalReceiptCarbs = 0;

	for (var i=0; i<receipt.childNodes.length; i++){
		totalReceiptGrams = totalReceiptGrams + toInteger(receipt.childNodes[i].totalGrams.value);
	}

	document.getElementById("totalReceiptGrams").innerHTML = totalReceiptGrams;
	document.getElementById("totalReceiptCarbs");
}

function toInteger(str)
{
	if (str == "")
		return 0;
	if (!isNaN(str))
		return parseInt(str);
	return 0;
}

function toFloat(str)
{
	if (str == "")
		return 0;
	if (!isNaN(str))
		return parseFloat(str).toFixed(2);
	return 0;
}

//Events & Setters --------------------------------------------
function onCloseClicked(ingredient){
	ingredient.remove();
}

function onSampleGramsChanged(ingredient) {
  	var sg = ingredient.sampleGrams;
  	if (toInteger(sg.value) <= 0)
		sg.value = "";
	else
		sg.value = toInt(sg.value);
	
	checkMaxSize(sg);
	checkSampleDataValidity(ingredient, true);
	calculateSecondRow(ingredient, totalGramsLastChanged);
	calculateThirdRow(ingredient);
}

function onSampleCarbsChanged(ingredient){
  	var sc = ingredient.sampleCarbs;
  	if (toInteger(sc.value) <= 0)
		sc.value = "";

	checkMaxSize(sc);
	checkSampleDataValidity(ingredient, false);
	calculateSecondRow(ingredient, totalGramsLastChanged);
	calculateThirdRow(ingredient);
}

function onTotalGramsChanged(ingredient){
	totalGramsLastChanged = true;
  	var tg = ingredient.totalGrams;
  	if (toInteger(tg.value) <= 0)
		tg.value = "";

	checkMaxSize(tg);
	calculateSecondRow(ingredient, true);
	calculateThirdRow(ingredient);
}

function onTotalBreadUnitsChanged(ingredient){
	totalGramsLastChanged = false;
  	var tbu = ingredient.totalBreadUnits;
  	if (toFloat(tbu.value) <= 0)
		tbu.value = "";

	checkMaxSize(tbu);
	calculateSecondRow(ingredient, false);
	calculateThirdRow(ingredient);
}

function onPiecesNumberChanged(ingredient){
	var pn = ingredient.piecesNumber;
	if (toInteger(pn.value) <= 0)
		pn.value = "";

	calculateThirdRow(ingredient);
}

function onSignClicked(ingredient, increment){
	var pn = ingredient.piecesNumber;
	pn.value = toInteger(ingredient.piecesNumber.value) + increment;

	onPiecesNumberChanged(ingredient);
}

//Structure-----------------------------------------------------------------
function checkSampleDataValidity(ingredient, sampleGramsChanged)
{
	var sg = ingredient.sampleGrams;
	var sc = ingredient.sampleCarbs;

	if (toInteger(ingredient.sampleCarbs.value) > toInteger(ingredient.sampleGrams.value))
	{
		if (sampleGramsChanged){
			sg.className = "invalidInput";
			sc.classList.remove("invalidInput");
		}
		else{
			sc.className = "invalidInput";
			sg.classList.remove("invalidInput");
		}
		return false;
	}
	else
	{
		sg.classList.remove("invalidInput");
		sc.classList.remove("invalidInput");
		return true;
	}
}

function checkMaxSize(field)
{
	if (field.value.length > field.maxLength)
		field.value = field.value.slice(0, field.maxLength);
}

//Modifiers--------------------------------------------------------------------

function calculateSecondRow(ingredient, totalGramsChanged)
{
	if (!isSampleRowValid(ingredient))
		return;

	if (totalGramsChanged == true)
		ingredient.totalBreadUnits.value = toFloat(totalGramsToBreadUnits(ingredient));
	else
		ingredient.totalGrams.value = toFloat(totalBreadUnitsToGrams(ingredient));
}

function calculateThirdRow(ingredient)
{
	if (!isSampleRowValid(ingredient))
		return;

	pieces = toInteger(ingredient.piecesNumber.value);
	if (pieces > 0)
	{
		totalCarbs = (ingredient.totalGrams.value*ingredient.sampleCarbs.value)/ingredient.sampleGrams.value;

		ingredient.gramsPP.innerHTML = toFloat(ingredient.totalGrams.value/pieces);
		ingredient.carbsPP.innerHTML = toFloat(totalCarbs/pieces);
		ingredient.breadUnitsPP.innerHTML = toFloat(carbsToBreadUnits(totalCarbs)/pieces);
	}
	else
	{
		ingredient.gramsPP.innerHTML = 0.0;
		ingredient.carbsPP.innerHTML = 0.0;
		ingredient.breadUnitsPP.innerHTML = 0.0;
	}
}

function totalGramsToBreadUnits(ingredient)
{
	totalCarbs = (ingredient.totalGrams.value*ingredient.sampleCarbs.value)/ingredient.sampleGrams.value;
	return carbsToBreadUnits(totalCarbs);
}

function totalBreadUnitsToGrams(ingredient)
{
	totalCarbs = breadUnitsToCarbs(ingredient.totalBreadUnits.value);
	return (totalCarbs*ingredient.sampleGrams.value)/ingredient.sampleCarbs.value;
}

function isSampleRowValid(ingredient)
{
	return !(toInteger(ingredient.sampleGrams.value) == 0 || toInteger(ingredient.sampleCarbs.value) == 0);
}

//Utilities----------------------------------------------------------------
function carbsToBreadUnits(carbs){
	return carbs/12.0;
}

function breadUnitsToCarbs(breadUnits){
	return breadUnits*12.0;
}