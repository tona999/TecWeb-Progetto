function start()
{
	addIngredient();
}

function addIngredient()
{
	var sampleIngredient = document.getElementById("sampleIngredient");
	var ing = sampleIngredient.cloneNode(true);
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

//Events & Setters --------------------------------------------
function onCloseClicked(ingredient){
	ingredient.remove();
}

function onSampleGramsChanged(ingredient) {
  	var sg = ingredient.sampleGrams;
  	if (sg.value <= 0)
		sg.value = "";
	else
		sg.value = parseFloat(sg.value).toFixed(0);
	
	checkMaxSize(sg);
	checkSampleDataValidity(ingredient, true);
}

function onSampleCarbsChanged(ingredient){
  	var sc = ingredient.sampleCarbs;
  	if (sc.value <= 0)
		sc.value = "";

	checkMaxSize(sc);
	checkSampleDataValidity(ingredient, false);
}

function onTotalGramsChanged(ingredient){
  	var tg = ingredient.totalGrams;
  	if (tg.value <= 0)
		tg.value = "";

	checkMaxSize(tg);
	calculateSecondRow(ingredient, true);
}

function onTotalBreadUnitsChanged(ingredient){
  	var tbu = ingredient.totalBreadUnits;
  	if (tbu.value <= 0)
		tbu.value = "";

	checkMaxSize(tbu);
	calculateSecondRow(ingredient, false);
}

function onPiecesNumberChanged(ingredient){
	var pn = ingredient.piecesNumber;
	if (pn.value <= 0)
		pn.value = "0";

	calculateThirdRow(ingredient);
}

function onSignClicked(ingredient, increment){
	var pn = ingredient.piecesNumber;
	pn.value = parseInt(ingredient.piecesNumber.value) + increment;

	onPiecesNumberChanged(ingredient);
}

//Structure-----------------------------------------------------------------
function checkSampleDataValidity(ingredient, sampleGramsChanged)
{
	var sg = ingredient.sampleGrams;
	var sc = ingredient.sampleCarbs;

	if (parseInt(ingredient.sampleCarbs.value) > parseInt(ingredient.sampleGrams.value))
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

function calculateSecondRow(ingredient, totalCarbsChanged)
{
	if (totalCarbsChanged == true)
		ingredient.totalBreadUnits.value = (totalGramsToBreadUnits(ingredient)).toFixed(1);
	else
		ingredient.totalGrams.value = (totalBreadUnitsToGrams(ingredient)).toFixed(1);
}

function calculateThirdRow(ingredient)
{
	pieces = ingredient.piecesNumber.value;
	if (pieces > 0)
	{
		totalCarbs = (ingredient.totalGrams.value*ingredient.sampleCarbs.value)/ingredient.sampleGrams.value;

		ingredient.gramsPP.innerHTML = (ingredient.totalGrams.value/pieces).toFixed(1);
		ingredient.carbsPP.innerHTML = (totalCarbs/pieces).toFixed(1);
		ingredient.breadUnitsPP.innerHTML = (carbsToBreadUnits(totalCarbs)/pieces).toFixed(1);
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

//Utilities----------------------------------------------------------------
function carbsToBreadUnits(carbs){
	return carbs/12.0;
}

function breadUnitsToCarbs(breadUnits){
	return breadUnits*12.0;
}