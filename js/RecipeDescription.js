class RecipeDescription{
	constructor(){}
	connect(recDescHtml){
		this.form = recDescHtml;
		this.recipeId = recDescHtml.querySelector("[name='recipeId']").value;
		this.recipeName = recDescHtml.querySelector("[name='recipeName']").innerHTML;
		this.removeBtn = recDescHtml.querySelector("input[name='removeBtn']");

		var t = this;
		this.removeBtn.addEventListener('click', function(){t.onRemoveRequested();});
	}

	onRemoveRequested()
	{
		if (!confirm("Are you sure you want to remove " + this.recipeName + "?"))
			return false;
		var params = "id="+this.recipeId;
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

		xhttp.open("POST", "php/removeRecipe.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(params);
	}

	onRemoveSuccessful()
	{
		this.form.remove();
	}

	onRemoveFailed()
	{
		window.alert("Saving Failed");
	}
}
