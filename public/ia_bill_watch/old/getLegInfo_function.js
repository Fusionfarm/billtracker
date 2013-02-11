// Second JSON call to Open States page with legislators info
// Has to have its own function
// Data is added to the DOM after this function
// var legislator_count = 0;

// function getLegInfo(legislators, val, number_of_sponsors) {	
	// legislator_count = 0;
	
	// Our global variables
	// var val = val;
	// legislator_number = legislators;
	
	// If the bill has a sponsor or sponsors
	// We'll grab the legislator information from other URL
	// Using the leg_id field in the original JSON file
	// var legId = val[legislator_number]['leg_id'];
	//if (legId != null) {
		//$.getJSON('http://openstates.org/api/v1/legislators/' + encodeURI(legId) + '/?apikey=' + encodeURI(apiKey) + '&callback=?', function(data){
			// Global variables
			// legislator_count += 1;
			// var name = "";
			// var district = "";
			// var party = "";
			// var legChamber = "";
		
			// Pull out the data from the legislators
			// $.each(data, function(key, val) {
				// console.log(key, ': ', val);
				// if (key === 'full_name') {
					// name = val;
				// }
				// if (key === 'district') {
					// district = 'District: ' + val;
				// }
				// if (key === 'party') {
					// iparty = val;
				// }
				// if (key === 'chamber') {
					// legChamber = val;
				// }
			// });
			// This will add each sponsor to the page
			// Well first check to see if the number of sponsors is 1
			// If so, we won't add a comma at the end of legislator's name
			// if (legChamber === 'lower' && parseInt(number_of_sponsors) === 1) {
				// sponsors += 'Rep. ' + name + ' (' + district + ', ' + party + ')';
			// } else if (legChamber === 'upper' && parseInt(number_of_sponsors) === 1) {
				// sponsors += 'Senator ' + name + ' (' + district + ', ' + party + ')';
			// We'll then check to see if this is the last sponsor in our list of sponsors
			// If it isn't, we'll add a comma
			// } else if (legChamber === 'lower' && parseInt(number_of_sponsors - 1) !== parseInt(legislator_count)) {
				// sponsors += 'Rep. ' + name + ' (' + district + ', ' + party + '), ';
			// } else if (legChamber === 'upper' && parseInt(number_of_sponsors - 1) !== parseInt(legislator_count)) {
				// sponsors += 'Senator ' + name + ' (' + district + ', ' + party + '), ';
			// If it is the last sponsor, it will end up here
			// And we won't add a comma
			// } else if (legChamber === 'lower') {
				// sponsors += 'Rep. ' + name + ' (' + district + ', ' + party + ')';
			// } else if (legChamber === 'upper') {
				// sponsors += 'Senator ' + name + ' (' + district + ', ' + party + ')';
			// }
		// })
		// Add all of our HTML to DOM after second JSON call is completed
		// .complete(
			// function() {
				// loadToPage('sponsors');
			// }
		// )
	// }
// }