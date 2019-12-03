class Ingredient{
	constructor(name = "", sampleGrams = 100, sampleCarbs = 0, totalGrams = 0, totalBreadUnits = 0, piecesNumber = 0) 
	{
		//Format checks are needed, thus the use of the setters
		this.setName(name);
		this.setSampleGrams(sampleGrams);
		this.setSampleCarbs(sampleCarbs);
		this.setTotalGrams(totalGrams);		
		this.setPiecesNumber(piecesNumber);

		if (totalBreadUnits >= 0)
		{
			this.totalBreadUnits = toFloat(totalBreadUnits);
			this.totalGrams = 0;
			this.totalGramsLastChanged = false;
		}
		else
		{
			if(toFloat(totalGrams) > 0)
				this.totalGrams = toFloat(totalGrams);
			else
				this.totalGrams = 0;
			this.totalBreadUnits = 0;
			this.totalGramsLastChanged = true;
		}
    }

    Connect(htmlIng)
    {
    	htmlIng.removeAttribute("id");

    	this.totalGramsLastChanged = true;

		this.ingredientNameRef = 	document.getElementById("ingredientName");
		this.closeButtonRef = 		document.getElementById("closeButton");
		this.sampleGramsRef = 		document.getElementById("sampleGrams");
		this.sampleCarbsRef = 		document.getElementById("sampleCarbs");
		this.totalGramsRef = 		document.getElementById("totalGrams");
		this.totalBreadUnitsRef = 	document.getElementById("totalBreadUnits");
		this.piecesNumberRef = 		document.getElementById("piecesNumber");
		this.plusButtonRef = 		document.getElementById("plusButton");
		this.minusButtonRef = 		document.getElementById("minusButton");
		this.gramsPPRef = 			document.getElementById("gramsPP");
		this.breadUnitsPPRef = 		document.getElementById("breadUnitsPP");
		this.carbsPPRef = 			document.getElementById("carbsPP");
		
		var t = this;//t is this ingredient object, while "this" in the inline function is the input element that called the event, so this.value is the value of that input element
		this.sampleGramsRef.addEventListener('input', function(){t.onSampleGramsChanged(this.value);});
		this.sampleCarbsRef.addEventListener('input', function(){t.onSampleCarbsChanged(this.value);});
		this.totalGramsRef.addEventListener('input', function(){t.onTotalGramsChanged(this.value);});
		this.totalBreadUnitsRef.addEventListener('input', function(){t.onTotalBreadUnitsChanged(this.value);});
		this.piecesNumberRef.addEventListener('input', function(){t.onPiecesNumberChanged(this.value);});

		this.closeButtonRef.addEventListener('click', function(){t.onCloseClicked(htmlIng);}); //function.bind could also be used
		this.plusButtonRef.addEventListener('click', function(){t.onSignClicked(1);});
		this.minusButtonRef.addEventListener('click', function(){t.onSignClicked(-1);});

		this.ingredientNameRef.removeAttribute("id");
		this.closeButtonRef.removeAttribute("id");
		this.sampleGramsRef.removeAttribute("id");
		this.sampleCarbsRef.removeAttribute("id");
		this.totalGramsRef.removeAttribute("id");
		this.totalBreadUnitsRef.removeAttribute("id");
		this.piecesNumberRef.removeAttribute("id");
		this.plusButtonRef.removeAttribute("id");
		this.minusButtonRef.removeAttribute("id");
		this.gramsPPRef.removeAttribute("id");
		this.breadUnitsPPRef.removeAttribute("id");
		this.carbsPPRef.removeAttribute("id");

		this.Refresh();
		this.Display();
    }

    Display()
    {
    	this.ingredientNameRef.value = this.ingredientName;		
		this.sampleGramsRef.value = fromInteger(this.sampleGrams);
		this.sampleCarbsRef.value = fromInteger(this.sampleCarbs);
		this.totalGramsRef.value = fromFloat(this.totalGrams);
		this.totalBreadUnitsRef.value = fromFloat(this.totalBreadUnits);
		this.piecesNumberRef.value = fromInteger(this.piecesNumber);
		this.gramsPPRef.innerHTML = toFloat(this.gramsPP);
		this.breadUnitsPPRef.innerHTML = toFloat(this.breadUnitsPP);
		this.carbsPPRef.innerHTML = toFloat(this.carbsPP);
    }

    /*INGREDIENT GETTERS & SETTERS*/
	setName(val){this.ingredientName = val.substring(0, nameMaxLength-1);}
	setSampleGrams(val){this.sampleGrams = toInteger(val);}
	setSampleCarbs(val){this.sampleCarbs = toInteger(val);}
	setTotalGrams(val){this.totalGrams = toFloat(val);}
	setTotalBreadUnits(val){this.totalBreadUnits = toFloat(val);}
	setPiecesNumber(val){this.piecesNumber = toInteger(val);}

	getTotalCarbs(){return getTotalGrams()*getSampleCarbs()/getSampleGrams();} //Not visible in the ingredient

    /*EVENTS*/
    onCloseClicked(htmlRoot){
    	htmlRoot.remove();
    	//Remove from a list etc.
    }
	onSampleGramsChanged(val){
		this.setSampleGrams(val);
		this.checkSampleDataValidity(true);
		this.Refresh();
	}
	onSampleCarbsChanged(val){
		this.setSampleCarbs(val);
		this.checkSampleDataValidity(false);
		this.Refresh();
	}
	onTotalGramsChanged(val){
		this.totalGramsLastChanged = true;
		this.setTotalGrams(val);
		this.Refresh();
	}
	onTotalBreadUnitsChanged(val){
		this.totalGramsLastChanged = false;
		this.setTotalBreadUnits(val);
		this.Refresh();
	}
	onSignClicked(increment){
		var n = this.piecesNumber + increment;
		if (n>=0)
			this.onPiecesNumberChanged(n);
		else
			this.onPiecesNumberChanged(0);
	}
	onPiecesNumberChanged(val){
		this.setPiecesNumber(val);
		this.Refresh();
	}

	/*MATHS*/
	Refresh()
	{	if (this.isSampleDataValid()){
			this.calculateTotalsRow();
			this.calculatePiecesRow();
			this.Display();

			refreshReceiptData();
		}
	}

	calculateTotalsRow()
	{
		if (this.totalGramsLastChanged)
			this.setTotalBreadUnits(this.totalGramsToBreadUnits());
		else if (this.sampleCarbs > 0) //Division by zero
			this.setTotalGrams(this.totalBreadUnitsToGrams());
		else
			this.setTotalGrams(0);
	}

	calculatePiecesRow()
	{
		if (this.piecesNumber > 0)
		{
			var totalCarbs = (this.totalGrams*this.sampleCarbs)/this.sampleGrams;

			this.gramsPP = toFloat(this.totalGrams/this.piecesNumber);
			this.carbsPP = toFloat(totalCarbs/this.piecesNumber);
			this.breadUnitsPP = toFloat(carbsToBreadUnits(totalCarbs)/this.piecesNumber);
		}
		else
		{
			this.gramsPP = 0.0;
			this.carbsPP = 0.0;
			this.breadUnitsPP = 0.0;
		}
	}

	totalGramsToBreadUnits()
	{
		var totalCarbs = (this.totalGrams*this.sampleCarbs)/this.sampleGrams;
		return toFloat(carbsToBreadUnits(totalCarbs));
	}

	totalBreadUnitsToGrams()
	{
		var totalCarbs = breadUnitsToCarbs(this.totalBreadUnits);
		return toFloat((totalCarbs*this.sampleGrams)/this.sampleCarbs);
	}

	/*INGREDIENT UTILITIES*/
	checkSampleDataValidity(sampleGramsChanged)
	{
		if (this.sampleCarbs > this.sampleGrams)
		{
			if (sampleGramsChanged){
				setValidityStatus(this.sampleGramsRef, false);
				setValidityStatus(this.sampleCarbsRef, true);
			}
			else{
				setValidityStatus(this.sampleCarbsRef, false);
				setValidityStatus(this.sampleGramsRef, true);
			}
		}
		else
		{
			setValidityStatus(this.sampleGramsRef, true);
			setValidityStatus(this.sampleCarbsRef, true);
		}
	}

	isSampleDataValid()
	{
		return (this.sampleGrams >= 0 && this.sampleCarbs >= 0 && this.sampleGrams >= this.sampleCarbs);
	}
}


/*GENERIC UTILITIES*/
function carbsToBreadUnits(carbs){
	return toFloat(carbs/12.0);
}

function breadUnitsToCarbs(breadUnits){
	return toFloat(breadUnits*12.0);
}

function setValidityStatus(field, status)
{
	if (status)
		field.classList.remove("invalidInput");
	else
		field.className = "invalidInput";
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

/*RECEIPT*/
function addIngredient(name = "", sampleGrams = 100, sampleCarbs = 0, totalGrams = 0, totalBreadUnits = 0, piecesNumber = 0)
{
	var htmlIng = sampleIngredientCopy.cloneNode(true);
	document.getElementById("receipt").appendChild(htmlIng);
	var ing = new Ingredient(name, sampleGrams, sampleCarbs, totalGrams, totalBreadUnits, piecesNumber);
	ing.Connect(htmlIng);
}

function refreshReceiptData()
{
	//SAME AS BEFORE WRITE IT WITH A LIST
	/*
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

	//RECEIPT VIEW
	setSampleGrams(receiptView, totalReceiptGrams);
	setSampleCarbs(receiptView, totalReceiptCarbs);
	//totalReceiptGrams and totalReceiptCarbs are not changed by the user, therefore the events are not called 
	calculateTotalsRow(receiptView);
	calculatePiecesRow(receiptView);
	*/
}

function saveReceipt()
{

}


/*MAIN*/
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
	var htmlReceiptView = sampleIngredientCopy.cloneNode(true);
	document.getElementById("receiptView").appendChild(htmlReceiptView);
	var rv = new Ingredient();
	rv.Connect(htmlReceiptView);

	//Sample Ingredients
	addIngredient();
	addIngredient("Salame Piccante", 100, 0, 50, -1, 16);
	addIngredient("Sugo di Pomodoro", 100, 15, 80, -1, 5);
}

