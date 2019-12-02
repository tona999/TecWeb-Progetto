var sampleIngredientCopy;
var receiptView;

var nameMaxLength = 25;

function start()
{
	document.getElementById("addNewBtn").addEventListener('click', function(){addIngredientToReceipt();});
	document.getElementById("loadReceiptCardBtn").addEventListener('click', function(){refreshReceiptData();});
	document.getElementById("saveReceiptBtn").addEventListener('click', function(){saveReceipt();});

	sampleIngredientCopy = document.getElementById("sampleIngredient").cloneNode(true);
	document.getElementById("sampleIngredient").remove();

	//receipt view
	receiptView = sampleIngredientCopy.cloneNode(true);
	document.getElementById("receiptView").appendChild(receiptView);
	initialiseIngredient(receiptView);


	addIngredientToReceipt("Salame Piccante", 100, 0, 50, -1, 16);
	addIngredientToReceipt("Mozzarella", 100, 20, 150, -1, 0);
	addIngredientToReceipt("Sugo di Pomodoro", 100, 15, 80, -1, 0);
}

//Constructors-----------------------------------------------------------------------------------------------------
function addIngredientToReceipt(name = "", sampleGrams = 100, sampleCarbs = 0, totalGrams = 0, totalBreadUnits = 0, pieces = 0)
{
	var ing = sampleIngredientCopy.cloneNode(true);
	document.getElementById("receipt").appendChild(ing);
	initialiseIngredient(ing);

	setName(ing, name);
	setSampleGrams(ing, toInteger(sampleGrams));
	setSampleCarbs(ing, toInteger(sampleCarbs));
	setPiecesNumber(ing, toInteger(pieces));
	
	//totalGrams = -1 if the value the user inserted is totalBreadUnits, and viceversa. Only one of the totalgrams and totalBreadUnits values is required and the other one is negative, then it is calculated. As a precaution, if both are < 0 then totalGrams is set to 0 
	if (totalBreadUnits >= 0 ){
		setTotalBreadUnits(ing, toFloat(totalBreadUnits));
		ing.totalGramsLastChanged = false;
	}
	else{
		if (totalGrams < 0){
			totalGrams = 0;
			window.alert("Error: Both totalGrams and totalBreadUnits are negative!");
		}
		setTotalGrams(ing, toFloat(totalGrams));
		ing.totalGramsLastChanged = true;
	}

	Refresh(ing);
}

function initialiseIngredient(ing)
{
	ing.removeAttribute("id");

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
	ing.totalGramsLastChanged = true;

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

	return ing;
}

//Ingredient Getters & Setters-----------------------------------------------
function getSampleGrams(ingredient){if(ingredient.sampleGrams.value=="") return toInteger(ingredient.sampleGrams.getAttribute("placeholder")); return toInteger(ingredient.sampleGrams.value);}
function getSampleCarbs(ingredient){return toInteger(ingredient.sampleCarbs.value);}
function getTotalGrams(ingredient){return toFloat(ingredient.totalGrams.value);}
function getTotalBreadUnits(ingredient){return toFloat(ingredient.totalBreadUnits.value)}
function getPiecesNumber(ingredient){return toInteger(ingredient.piecesNumber.value)}

function getTotalCarbs(ingredient){return getTotalGrams(ingredient)*getSampleCarbs(ingredient)/getSampleGrams(ingredient);} //Not visible in the ingredient

///Events are not triggered by using setters, they are mainly used for ingredient construction
function setName(ingredient, val){ingredient.ingredientName.value = val.substring(0, nameMaxLength-1)}
function setSampleGrams(ingredient, val){ingredient.sampleGrams.value = fromInteger(val);}
function setSampleCarbs(ingredient, val){ingredient.sampleCarbs.value = fromInteger(val);}
function setTotalGrams(ingredient, val){ingredient.totalGrams.value = fromFloat(val);}
function setTotalBreadUnits(ingredient, val){ingredient.totalBreadUnits.value = fromFloat(val);}
function setPiecesNumber(ingredient, val){ingredient.piecesNumber.value = fromInteger(val);}

//Receipt Getters & Setters--------------------------------------------------
function getTotalReceiptGrams(){return document.getElementById("totalReceiptGrams")}
function getTotalReceiptCarbs(){return document.getElementById("totalReceiptCarbs")}

//Events & Setters --------------------------------------------
function onCloseClicked(ingredient){
	ingredient.remove();
	refreshReceiptData();
}

function onSampleGramsChanged(ingredient) {
	checkInputFormat(ingredient.sampleGrams);
	checkSampleDataValidity(ingredient, true);
	if (isSampleRowValid(ingredient))
		Refresh(ingredient);
}

function onSampleCarbsChanged(ingredient){
  	checkInputFormat(ingredient.sampleCarbs);
  	checkSampleDataValidity(ingredient, false);
	if (isSampleRowValid(ingredient))
		Refresh(ingredient);
}

function onTotalGramsChanged(ingredient){
	ingredient.totalGramsLastChanged = true;
	checkInputFormat(ingredient.totalGrams);
	if (isSampleRowValid(ingredient))
		Refresh(ingredient);
}

function onTotalBreadUnitsChanged(ingredient){
	ingredient.totalGramsLastChanged = false;
	checkInputFormat(ingredient.totalBreadUnits);
	if (isSampleRowValid(ingredient))
		Refresh(ingredient);
}

function onSignClicked(ingredient, increment){
	var n = toInteger(ingredient.piecesNumber.value) + increment;
	if (n < 0)
		n = 0;
	ingredient.piecesNumber.value = n;

	onPiecesNumberChanged(ingredient);
}

function onPiecesNumberChanged(ingredient){
	checkInputFormat(ingredient.piecesNumber);
	if (isSampleRowValid(ingredient))
		calculatePiecesRow(ingredient);
}

//Structure------------------------------------------------------------------
function isSampleRowValid(ingredient)
{
	var sg = getSampleGrams(ingredient);
	var sc = getSampleCarbs(ingredient);
	return (sg >= 0 && sc >= 0 && sg >= sc);
}

function setValidityStatus(field, status)
{
	if (status)
		field.classList.remove("invalidInput");
	else
		field.className = "invalidInput";
}

function checkSampleDataValidity(ingredient, sampleGramsChanged)
{
	if (getSampleCarbs(ingredient) > getSampleGrams(ingredient))
	{
		if (sampleGramsChanged){
			setValidityStatus(ingredient.sampleGrams, false);
			setValidityStatus(ingredient.sampleCarbs, true);
		}
		else{
			setValidityStatus(ingredient.sampleCarbs, false);
			setValidityStatus(ingredient.sampleGrams, true);
		}
	}
	else
	{
		setValidityStatus(ingredient.sampleGrams, true);
		setValidityStatus(ingredient.sampleCarbs, true);
	}
}

function checkInputFormat(field)
{
	if (field.value.length > field.maxLength)
		field.value = toInteger(field.value.slice(0, field.maxLength));

	  if (toInteger(field.value) <= 0)
		field.value = ""; //Placeholder is shown, therefore removing of value zero is not needed before new value insertion
}
//Modifiers--------------------------------------------------------------------

function Refresh(ingredient)
{
	calculateTotalsRow(ingredient);
	calculatePiecesRow(ingredient);

	refreshReceiptData();
}

function calculateTotalsRow(ingredient)
{
	if (ingredient.totalGramsLastChanged)
		setTotalBreadUnits(ingredient, totalGramsToBreadUnits(ingredient));
	else if (getSampleCarbs(ingredient) != 0) //Division by zero
			setTotalGrams(ingredient, totalBreadUnitsToGrams(ingredient));
}

function calculatePiecesRow(ingredient)
{
	var pieces = getPiecesNumber(ingredient);
	if (pieces > 0)
	{
		var tg = getTotalGrams(ingredient);
		totalCarbs = (tg*getSampleCarbs(ingredient))/getSampleGrams(ingredient);

		ingredient.gramsPP.innerHTML = toFloat(tg/pieces);
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
	totalCarbs = (getTotalGrams(ingredient)*getSampleCarbs(ingredient))/getSampleGrams(ingredient);
	return toFloat(carbsToBreadUnits(totalCarbs));
}

function totalBreadUnitsToGrams(ingredient)
{
	totalCarbs = breadUnitsToCarbs(getTotalBreadUnits(ingredient));
	return toFloat((totalCarbs*getSampleGrams(ingredient))/getSampleCarbs(ingredient));
}

//Utilities----------------------------------------------------------------
function carbsToBreadUnits(carbs){
	return toFloat(carbs/12.0);
}

function breadUnitsToCarbs(breadUnits){
	return toFloat(breadUnits*12.0);
}

function toInteger(str)
{
	if (str == "")
		return 0;
	if (!isNaN(str))
		return Math.abs(parseInt(str));
	return 0;
}

function toFloat(str)
{
	if (str == "")
		return 0;
	if (!isNaN(str))
		return Math.abs(parseFloat(str).toFixed(2));
	return 0;
}

function fromInteger(int)
{
	if (int == 0)
		return "";
	return toInteger(Math.abs(int));
}

function fromFloat(flo)
{
	if (flo == 0)
		return "";
	return toFloat(Math.abs(flo));
}

//DATABASE----------------------------------------------------------------------------------

function refreshReceiptData()
{
	var receipt = document.getElementById("receipt");

	var totalReceiptGrams = 0;
	var totalReceiptCarbs = 0;

	for (var i=0; i<receipt.childNodes.length; i++){
		totalReceiptGrams += toInteger(getTotalGrams(receipt.childNodes[i]));
		totalReceiptCarbs += getTotalCarbs(receipt.childNodes[i]); 
	}

	totalReceiptGrams = toInteger(totalReceiptGrams);
	totalReceiptCarbs = toInteger(totalReceiptCarbs);

	document.getElementById("totalReceiptGrams").innerHTML = totalReceiptGrams;
	document.getElementById("totalReceiptCarbs").innerHTML = totalReceiptCarbs;

	/*RECEIPT VIEW*/
	setSampleGrams(receiptView, totalReceiptGrams);
	setSampleCarbs(receiptView, totalReceiptCarbs);
	//totalReceiptGrams and totalReceiptCarbs are not changed by the user, therefore the events are not called 
	calculateTotalsRow(receiptView);
	calculatePiecesRow(receiptView);
}

function saveReceipt()
{
	//Send data to database
}

