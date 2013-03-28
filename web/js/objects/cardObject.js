var cardObjectHideDirection = {
	'TOP': 1,
	'LEFT': 2,
	'RIGHT': 3,
	'BOTTOM': 4
};


function CardObject(_stage){

	var stage = _stage;

	var card;
	
	//INIT======================================
	this.init = function(structure)
	{
		card = new Object();

		card.bg = structure

		var textlines =




	}

	//UPDATE==================================		(optional)
	this.update = function()
	{
		stage.removeChild(capture);
		stage.addChild(capture);
	}

	//FINALIZE==================================
	this.finalize = function()
	{
		stage.removeChild(capture);
	}

}