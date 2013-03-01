function saveData()
{
	var data = new Object();

	data.credits = credits.nextValue;
	data.cities = cities;
	data.currCity = currCity;
	data.heat = heat.nextValue;
	data.rewards = currSpecialRewards;
	//data.currentJobs = currentJobs;

	for(var key in data.cities)
	{
		delete data.cities[key].pointer;
	}

	console.log(data);

	localStorage.setItem('GnS_saveData', JSON.stringify(data));

}

function loadData()
{
	///// test
	var retrievedObject = localStorage.getItem('GnS_saveData');

	console.log('GnS_saveData: ', JSON.parse(retrievedObject));

	var parsedObject = new Object();
	parsedObject = JSON.parse(retrievedObject);

	credits.nextValue = parsedObject.credits;
	heat.nextValue = parsedObject.heat;
	cities = parsedObject.cities;
	currCity = parsedObject.currCity;
	currSpecialRewards = parsedObject.rewards;
	addEvent("RANDOMIZE_JOBS");
	setLocation();

}