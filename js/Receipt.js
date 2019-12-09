class Receipt{
	constructor(name = "")
	{
		this.ingredients = [];
		this.name = name;
	}

	addIngredient(ing)
	{
		this.ingredients.push(ing);
		ing.onInsertInReceipt(this, this.ingredients.length-1); //Connecting Event for Close Button on Ingredient
		this.refreshReceiptData();
	}

	removeIngredient(index)
	{
		this.ingredients[index]=undefined;
		this.refreshReceiptData();
	}

	addIngredients(ingrs)
	{
		ingrs.forEach(addIngredient(value));
	}

	connect(ingredientsContainerRef, totalReceiptGramsRef, totalReceiptCarbsRef, receiptViewRef)
	{
		this.ingredientsContainerRef = ingredientsContainerRef;
		this.totalReceiptGramsRef = totalReceiptGramsRef;
		this.totalReceiptCarbsRef = totalReceiptCarbsRef;
		this.receiptViewRef = receiptViewRef;
	}

	getIngredientsContainerRef(){
		return this.ingredientsContainerRef;
	}

	refreshReceiptData()
	{
		var totalReceiptGrams = 0;
		var totalReceiptCarbs = 0;

		for (var i=0; i<this.ingredients.length; i++){
			if (this.ingredients[i]!=undefined){
				totalReceiptGrams += this.ingredients[i].getTotalGrams();
				totalReceiptCarbs += this.ingredients[i].getTotalCarbs();
			}
		}

		totalReceiptGrams = MathUtilities.toFloat(totalReceiptGrams);
		totalReceiptCarbs = MathUtilities.toFloat(totalReceiptCarbs);

		this.totalReceiptGramsRef.innerHTML = totalReceiptGrams;
		this.totalReceiptCarbsRef.innerHTML = totalReceiptCarbs;

		//RECEIPT VIEW
		this.receiptViewRef.setSampleGrams(totalReceiptGrams);
		this.receiptViewRef.setSampleCarbs(totalReceiptCarbs);
		//totalReceiptGrams and totalReceiptCarbs are not changed by the user, therefore the events are not called 
		this.receiptViewRef.refresh();
	}
}