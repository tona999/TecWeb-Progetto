//Events & Setters --------------------------------------------
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
  	var sc = getSampleCarbsElement();
  	if (sc.value <= 0)
		sc.value = "";

	checkMaxSize(sc);
	checkSampleDataValidity(false);
}

function onTotalGramsChanged(ingredient){
  	var tg = getTotalGramsElement();
  	if (tg.value <= 0)
		tg.value = "";

	checkMaxSize(tg);

	calculateSecondRow(true);
}

function onTotalBreadUnitsChanged(ingredient){
  	var tbu = getTotalBreadUnitsElement();
  	if (tbu.value <= 0)
		tbu.value = "";

	checkMaxSize(tbu);

	calculateSecondRow(false);
}

function onPiecesNumberChanged(ingredient){
	var pn = getPiecesNumberElement();
	if (pn.value <= 0)
		pn.value = "";

	calculateThirdRow();
}

function onSignClicked(ingredient, increment){
	var pn = getPiecesNumberElement();
	pn.value = getPiecesNumber()+increment;

	onPiecesNumberChanged();
}

function checkSampleDataValidity(ingredient, sampleGramsChanged)
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