class IngredientDescription{
	
	constructor(){}

	connect(ingDescHtml){
		this.form = ingDescHtml;
		this.ingredientId = ingDescHtml.querySelector("[name='ingredientId']").value;	

		this.nameIF = ingDescHtml.querySelector("input[name='ingredientName']");
		this.sampleGramsIF = ingDescHtml.querySelector("input[name='sampleGrams']");
		this.sampleCarbsIF = ingDescHtml.querySelector("input[name='sampleCarbs']");
		this.editBtn = ingDescHtml.querySelector("input[name='editBtn']");
		this.loadBtn = ingDescHtml.querySelector("input[name='loadBtn']");
		this.removeBtn = ingDescHtml.querySelector("input[name='removeBtn']");

		this.warningSpan = ingDescHtml.querySelector("span[class='warningSpan']");
		this.editing = false;

		this.setEditable(false);
		
		var t = this;
		this.editBtn.addEventListener('click', function(){t.onEditClicked();});
		this.removeBtn.addEventListener('click', function(){t.onRemoveRequested();});
	}

	onEditClicked(){
		if (!this.editing){
			this.switchEditToSave();
			this.onEditStart();
		}
		else
		{
			this.onSaveRequested();
		}
	}

	onEditStart()
	{
		this.setEditable(true);
	}

	onSaveRequested()
	{	
		if(!this.checkInputFormat())
			return;

		var params = "id="+this.ingredientId+"&name="+this.nameIF.value.replace(/[^a-zA-Z ]/g, "")+"&sg="+this.sampleGramsIF.value+"&sc="+this.sampleCarbsIF.value;
		var xhttp = new XMLHttpRequest();

		var t = this;
		xhttp.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200)
			{
				const response = JSON.parse(this.responseText);
				if(response.invalidData != undefined)
					t.warning("Please insert valid values before saving.");
				else if (response.ingredientNotFound != undefined)
					t.warning("Saving failed. The ingredient could not be found.");
				else if (response.savingSuccessful != undefined)
					t.onSaveSuccessful();
			}
		}

		xhttp.open("POST", "php/editIngredient.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(params);
	}	

	onSaveSuccessful(){
		this.setEditable(false);
		this.warning("");	
	}

	onRemoveRequested()
	{
		if (!confirm(this.nameIF.value + " will be removed from all recipes.\nAre you sure you want to remove " + this.nameIF.value + "?"))
			return false;
		var params = 	"id="+this.ingredientId;
		var xhttp = new XMLHttpRequest();

		var t = this;
		xhttp.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200)
			{
				if(this.responseText == 1)
					t.onRemoveSuccessful();
				else
					t.onRemoveFailed();
			}
		}

		xhttp.open("POST", "php/removeIngredient.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(params);
	}

	onRemoveSuccessful()
	{
		this.form.remove();
	}

	onRemoveFailed()
	{
		this.warning("Removing Failed");
	}


	setEditable(status){
		this.nameIF.readOnly = !status;
		this.sampleGramsIF.readOnly = !status;
		this.sampleCarbsIF.readOnly = !status;

		this.loadBtn.disabled=status;
		this.removeBtn.disabled=status;

		if (status)
		{

			this.editing = true;
			this.nameIF.classList.remove("non_editable");
			this.sampleGramsIF.classList.remove("non_editable");
			this.sampleCarbsIF.classList.remove("non_editable");

			this.switchEditToSave();
		}
		else
		{
			this.editing = false;
			this.nameIF.className = "non_editable";
			this.sampleGramsIF.className = "non_editable";
			this.sampleCarbsIF.className = "non_editable";

			this.switchSaveToEdit();
		}
	}


	switchEditToSave(){
		this.editBtn.value="Save";
		this.editBtn.className="btn saveBtn"
	}

	switchSaveToEdit(){
		this.editBtn.value="Edit";
		this.editBtn.className="btn editBtn"
	}

	checkInputFormat()
	{
		var res = true;
		if ((this.nameIF.value.trim()) == ""){
			this.warning("Please insert a valid name before saving.");
			res = false;	
		}
		if ((this.sampleGramsIF.value.trim()) == "" || parseInt(this.sampleGramsIF.value) < parseInt(this.sampleCarbsIF.value)){
			this.warning("Please insert valid values before saving.");
			//this.sampleGramsIF.reportValidity("Value Is Not Valid"); //Would be a nice touch, but is not yet supported well.
			res = false;		
		}
		if ((this.sampleCarbsIF.value.trim()) == ""){
			this.warning("Please insert valid values before saving.");
			res = false;	
		}
		if (res)
			this.warning("");
		return res;
			
	}	

	warning(message)
	{
		this.warningSpan.innerHTML = message;
	}
}
