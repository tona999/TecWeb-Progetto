//Events & Setters --------------------------------------------
function onSampleGramsChanged() {
  	var sg = getSampleGramsElement();
  	if (sg.value <= 0)
		sg.value = "";
	else
		sg.value = parseFloat(sg.value).toFixed(0);
	checkMaxSize(sg);
	checkSampleDataValidity(true);
}

function onSampleCarbsChanged(){
  	var sc = getSampleCarbsElement();
  	if (sc.value <= 0)
		sc.value = "";

	checkMaxSize(sc);
	checkSampleDataValidity(false);
}

function onTotalGramsChanged(){
  	var tg = getTotalGramsElement();
  	if (tg.value <= 0)
		tg.value = "";

	checkMaxSize(tg);

	calculateSecondRow(true);
}

function onTotalBreadUnitsChanged(){
  	var tbu = getTotalBreadUnitsElement();
  	if (tbu.value <= 0)
		tbu.value = "";

	checkMaxSize(tbu);

	calculateSecondRow(false);
}

function onPiecesNumberChanged(){
	var pn = getPiecesNumberElement();
	if (pn.value <= 0)
		pn.value = "";

	calculateThirdRow();
}

function onSignClicked(increment){
	var pn = getPiecesNumberElement();
	pn.value = getPiecesNumber()+increment;

	onPiecesNumberChanged();
}

function checkSampleDataValidity(sampleGramsChanged)
{
	var sg = getSampleGramsElement();
	var sc = getSampleCarbsElement();

	if (getSampleCarbs() > getSampleGrams())
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

//Getters---------------------------------------------------------------
function getSampleGramsElement(){	return document.getElementById("sampleGrams");}
function getSampleCarbsElement(){	return document.getElementById("sampleCarbs");}
function getTotalGramsElement(){	return document.getElementById("totalGrams");}
function getTotalBreadUnitsElement(){	return document.getElementById("totalBreadUnits");}
function getPiecesNumberElement(){	return document.getElementById("piecesNumber");}
function getGramsPerPieceElement(){	return document.getElementById("gramsPerPieceResultText");}
function getCarbsPerPieceElement(){	return document.getElementById("carbsPerPieceResultText");}
function getBreadUnitsPerPieceElement(){	return document.getElementById("breadUnitsPerPieceResultText");}

function getSampleGrams(){	return genericGetter(getSampleGramsElement());}
function getSampleCarbs(){	return genericGetter(getSampleCarbsElement());}
function getTotalGrams(){	return genericGetter(getTotalGramsElement());}
function getTotalBreadUnits(){	return genericGetter(getTotalBreadUnitsElement());}
function getPiecesNumber(){	return genericGetter(getPiecesNumberElement());}
function genericGetter(target){
	if (target.value == "") return 0;
	else return parseInt(target.value);
}

//Utilities----------------------------------------------------------------
function carbsToBreadUnits(carbs){
	return carbs/12.0;
}

function breadUnitsToCarbs(breadUnits){
	return breadUnits*12.0;
}

function totalGramsToBreadUnits(totalGrams)
{
	totalCarbs = (getTotalGrams()*getSampleCarbs())/getSampleGrams();
	return carbsToBreadUnits(totalCarbs);
}

function totalBreadUnitsToGrams(totalBreadUnits)
{
	totalCarbs = breadUnitsToCarbs(getTotalBreadUnits());
	return (totalCarbs*getSampleGrams())/getSampleCarbs();
}

function calculateSecondRow(totalCarbsChanged)
{
	if (totalCarbsChanged == true)
		getTotalBreadUnitsElement().value = (totalGramsToBreadUnits(getTotalGrams())).toFixed(1);
	else
		getTotalGramsElement().value = (totalBreadUnitsToGrams(getTotalBreadUnits())).toFixed(1);
}

function calculateThirdRow()
{
	pieces = getPiecesNumber();
	if (pieces > 0)
	{
		totalCarbs = (getTotalGrams()*getSampleCarbs())/getSampleGrams();

		getGramsPerPieceElement().innerHTML = (getTotalGrams()/pieces).toFixed(1);
		getCarbsPerPieceElement().innerHTML = (totalCarbs/pieces).toFixed(1);
		getBreadUnitsPerPieceElement().innerHTML = (carbsToBreadUnits(totalCarbs)/pieces).toFixed(1);
	}
	else
	{
		getGramsPerPieceElement().innerHTML = 0.0;
		getCarbsPerPieceElement().innerHTML = 0.0;
		getBreadUnitsPerPieceElement().innerHTML = 0.0;

	}
}

function setSecondRow(status){
	getTotalGramsElement().disabled = !status;
	getTotalBreadUnitsElement().disabled = !status;
}


function getIngredientRoot(element)
{
	if (element == null)
		return null;

	root = element;
	while (root.tagName !="iframe" && root.parentElement!=null)
	{
		window.alert(root);
		root = root.parentElement;
	}
	window.alert(root);
	return root;
}

function removeIngredient(element)
{
	var frame = getIngredientRoot(element);
	document.getElementById("receipt").removeChild(frame);
}