// Variables
// Global variables in initial function
var topics_array = [];
var topics_headers = "";
var billId_init = "";
var bills_init = "";

// Global variables for second main function
var billId = "";
var description = "";
var chamber = "";
var sponsors = "";
var actions = "";
var actions_second = "";
var sources = "";
var votes = "";
var votes_second = "";
var vote_count_array_yes = [];
var vote_count_array_no = [];
var vote_count_array_other = [];
var vote_count_array_yes_two = [];
var vote_count_array_no_two = [];
var vote_count_array_other_two = [];
var updated_at = "";

// Use this to get month of action date for bill
var month = new Array();
month[0]="Jan.";
month[1]="Feb.";
month[2]="March";
month[3]="April";
month[4]="May";
month[5]="June";
month[6]="July";
month[7]="Aug.";
month[8]="Sept.";
month[9]="Oct.";
month[10]="Nov.";
month[11]="Dec.";

// API key
var apiKey = '9ae0c27da2ce431baa7a85d2d89d51d8';


// Functions
// Uppercases first letter of each word in a string
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

// This is used to convert dates
function replaceAll(txt, replace, with_this) {
	return txt.replace(new RegExp(replace, 'g'),with_this);
}


// Everything was be run on hash changes
$(window).hashchange( function(){
	var hash = window.location.hash;
	hash02 = hash.replace(/^#/, '');
	hash_not_proper = hash02.replace('-', ' ');
	hash_proper = hash_not_proper.toProperCase();
	hash_uppercase = hash_not_proper.toUpperCase()

	// Set the page title based on the hash.
	document.title = 'Iowa Bill Tracker: ' + ( hash_not_proper || '2013 Legislature' );

	// Iterate over all links
    $('.bill_float_wrap a').each(function(){
    	$(this).attr('href') === hash;
    });

    // First page stuff
	// The word 'categories' on the page that takes you to first page of the app
	// And the initial page load
	if (hash === "" || hash === "#") {
		parent.postMessage("scroll_message","*");
		// Hide out second, third page stuff
		$('#contents_header').hide();
		$('#bill_content_init').hide();
		$("#go_back_second_page").hide();
		$('#bill_content').hide();
		$("#go_back_third_page").hide();

		// Check to see if the icons have been loaded
		// If not, load them
		if ($('#agriculture').html() === '') {
			loadCategories();
		}
		
		// Fade in first page stuff
		$('#list_of_categories').fadeIn(200);
		$('#list_of_categories2').fadeIn(200);
		$('.icons').fadeIn(200);

		// Clear out DIVs
		$('#bill_content_init').html('');
		$('#bill_content_init').html("<div class='loading_content_init'><h4 class='headers'>Loading...</h4></div><div id='bills_init'></div>");
		$('#contents_header_categories').html();
		$('#contents_header_bill_id').html('');
		
		// Clear out all the IDs in bill_content DIV
		$('#billId').html('');
		$('#chamber').html('');
		$('#description').html('');
		$('#actions').html('');
		$('#actions_second').html('');
		$('#sources').html('');
		$('#sponsors').html('');
		$('#updated_at').html('');
	// Second page stuff
	// Check to make sure this isn't a bill and is instead a categories page
	// Then load up the bills under that category
	} else if (hash.slice(0,3) !== "#SF" && hash.slice(0,3) !== "#HF") {
		parent.postMessage("scroll_message","*");
		// Hide first, third page stuff
		$('#list_of_categories').hide();
		$('#list_of_categories2').hide();
		$('#bill_content').hide();
		$("#go_back_third_page").hide();
		
		// Clear out, refresh contents header topic DIV
		// Get rid of bill ID in content header div
		$('#contents_header_bill_id').html('');
		// Load correct topic with hash
		$('#contents_header_topic').html('');
		$('#contents_header_topic').html('<a href="#' + hash_proper + '">' + hash_uppercase + '</a>')
		$('#contents_header').fadeIn(200);
		
		// Show right DIV
		$('#bill_content_init').fadeIn(200);
		//$('.loading_content_init').show();
		$("#go_back_second_page").show();

		// Clear out all the IDs in bill_content DIV
		$('#billId').html('');
		$('#chamber').html('');
		$('#description').html('');
		$('#actions').html('');
		$('#actions_second').html('');
		$('#sources').html('');
		$('#sponsors').html('');
		$('#updated_at').html('');

		// Fire it up
		initialLoadJSON(hash_not_proper);
	// Third page stuff
	// When a user clicks a bill number, extensive bill information will be displayed
	// Via second JSON call function
	} else if (hash.slice(0,3) === "#SF" || hash.slice(0,3) === "#HF") {
		parent.postMessage("scroll_message","*");
		// Info on action more, less buttons
		$('#view_more_actions_button').hide();
		$('#view_less_actions_button').hide();
		$('#actions_second').hide();

		// Info on votes more, less buttons
		$('#view_more_votes_button').hide();
		$('#view_less_votes_button').hide();
		$('#votes_second').hide();

		$('#loading').hide();
		// Hide first, second page stuff
		$('#list_of_categories').hide();
		$('#list_of_categories2').hide();
		$('#bill_content_init').hide();
		$("#go_back_second_page").hide();

		// Bill ID to content header DIV
		$('#contents_header_bill_id').html(hash_not_proper);
		$('#contents_header').fadeIn(200);

		// Show extensive bill information
		// Do this before JSON call below
		$('#bill_content').fadeIn(200);
		$('.loading_content').show();

		// Load bill path info from JSON file
		$.getJSON('http://billtracker.c3service.com/bills.js?callback=?', function(data){
			$.each(data, function(key, val) {
				if (hash_not_proper === val.bill_id) {
					// Check to see if we have a category listing on the page already
					// If not, we'll grab one with this JSON call
					if ($('#contents_header_topic a').attr('href') === undefined) {
						topic = val.topics[0];
						// Clear out, refresh DIV
						$('#contents_header_topic').html('');
						$('#contents_header_topic').html('<a href="#' + topic.toProperCase() + '">' + topic.toUpperCase() + '</a>');
					}
					// Send this info to our loadJSON function
					billPath = val.bill_path;
					loadJSON(billPath);
				}
			});
		});
	}
	// Set Facebook like button to current page
	// This only for mobile/tablet users
	$('.fb-like').attr('data-href', 'http://billtracker.c3service.com/ia_bill_watch/' + window.location.hash);
});
// Since the event is only triggered when the hash changes, we need to trigger
// The event now, to handle the hash the page may have loaded with.
$(document).ready(function() {
	$(window).hashchange();
});

// First page stuff
// Show credits on click
function toggle_credits(){
	$('#app_description').hide();
	$('#choose_category').hide();
	$('.icons').hide();
	$('#credits').fadeIn(200);
};

// Hide credits with go back button
function toggle_front_page(){
	$('#credits').hide();
	$('#app_description').fadeIn(200);
	$('#choose_category').fadeIn(200);
	$('.icons').fadeIn(200);
}

// Third page stuff
// Toggle full list of actions when button is clicked
$('.actions_buttons').live('click', function (e) {
	e.preventDefault();
	$('#view_more_actions_button').toggle();
	$('#view_less_actions_button').toggle();
	$('#actions_second').toggle();
})

// Toggle full list of votes when button is clicked
$('.votes_buttons').live('click', function (e) {
	e.preventDefault();
	$('#view_more_votes_button').toggle();
	$('#view_less_votes_button').toggle();
	$('#votes_second').toggle();
})

// Buttons that display vote total tables
// Toggles between 'Yes', 'No' and 'Other' vote tables
$('.votes_tables_buttons').live('click', function (e) {
	e.preventDefault();
	// Add active class to current button
	// Remove active class from other buttons in group
	$(e.target).parent().addClass('active').siblings().removeClass('active');
	
	table_id = '.' + $(e.target).parent().attr('title');
	$(table_id).show().siblings().hide();
})

// Reporters' descriptions buttons
$('.action_info_button').live('click', function (e) {
	e.preventDefault();
	// Add active class to current button
	// Remove active class from other buttons in group
	action_info_button_name = $(e.target).parent().parent().attr('name');
	$('#' + action_info_button_name).toggle();
})


// Load up icons, circles for categories
// YIPPEE
function loadCategories() {
	// First hide all of our icons
	$('img').each(function(){
		$(this).parent().css('opacity', 0);
	});
	// Show DIV containing icons
	$('#list_of_categories').show();
	$('#list_of_categories2').show();
	$('.icons').show();
	// Then fade in each icon with a delay
	// We'll add circles with Raphael too
	count = 0;
	$('.circles').each($).wait(200, function(){
		// xpos - 26, ypos - 25
		circle_id = $(this).attr('id');
		var img_src = 'icons/' + circle_id + '.png';
		var paper = Raphael(circle_id, 125, 175);
		// 125 / 2 = 62.5 = We'll set the image in the middle
		var circle = paper.circle(60, 62.5, 55);
		var img = paper.image(img_src, 35, 35, 50, 50);
		var text = paper.text(circle.attrs.cx, 140, circle_id.replace('-', ' ').toProperCase())
		var layer_group = paper.set();
		circle.attr('opacity', '0');
		img.attr('opacity', '0');
		text.attr('opacity', '0');
		circle.attr('fill', '#2ca6cb');
		circle.attr('stroke', '#999999');
		circle.attr('stroke-width', '1');
		circle.attr('cursor', 'pointer');
		text.attr('font-size', '14px')
		layer_group.push(circle);
		layer_group.push(img);
		layer_group.push(text);
		var fadeIn = Raphael.animation(
			{'opacity': '0.7'},
			1000,'easeIn'
		);
		// Fade in circle
		layer_group.animate(fadeIn);
		//img.animate(fadeIn);
		// Set mouseover, mouseout events just to be fancy
		layer_group.mouseover(function() {
			circle.attr('opacity', '1');
			img.attr('opacity', '1');
			text.attr('opacity', '1');
			circle.attr('stroke', '#000000');
			circle.attr('stroke-width', '1.5');
		});
		layer_group.mouseout(function() {
			circle.attr('opacity', '0.7');
			img.attr('opacity', '0.7');
			text.attr('opacity', '0.7');
			circle.attr('stroke', '#999999');
			circle.attr('stroke-width', '1');
		});
		layer_group.click(function(e) {
			// Find the DIV the circle is in and gets its id, which will be its topic
			
			// Find the topic name by finding the PNG file name of the attribute
			// This will be the icons category: education, elections, etc.
			if (this.attrs.src !== undefined) {
				topic_a = this.attrs.src.replace('icons/', '');
				topic = topic_a.replace('.png', '');
			} else {
				topic_a = this.next.attrs.src.replace('icons/', '');
				topic = topic_a.replace('.png', '');
			}
			window.location.hash = topic.toProperCase();
		});
	});
}

// Initial function that starts all this madness
function initialLoadJSON(topic) {
	var topic_format = topic.toProperCase() + "";
	// First clear out our variables
	topics_array = [];
	topics_headers = "";
	billId_init = "";
	bills_init = "";
	
	topics_headers = '';
	topics_headers += '<h4 class="topics">' + topic_format + '</h4>';
	topics_headers += '<hr class="headers_hr" />';
	
	// console.log(topic_format);
	
	// Our JSON call will parse data and place on the page
	$.getJSON('http://billtracker.c3service.com/bills.js?callback=?', function(data){
		// This will look at the JSON file and see what bills have the topics selected
		// It will then display those bills, as well as their status
		$.each(data, function(key, val) {
			billId_init = '';
			for (num in val.topics) {
				if (topic_format === val.topics[num]) {
					// Some bills have more than one topic
					// So we are looping through the topics array
					// And adding bills to their appropriate topics
					billId_init += '<div class="bill_outer"><div class="bill_float_wrap"><section>';
					billId_init += '<h4 class="headers billId_buttons" id="' + val.bill_id + '" bill_path="' + val.bill_path + '">';
					billId_init += '<a href="#' + val.bill_id + '">' + val.bill_id + '</a></h4>';
					
					// We'll add graphic on page depending on the bills status
					// This loop will run if bill originated in the lower chamber
					if (val.chamber !== null) {
						if (val.chamber === "lower") {
							if (val.action_dates.passed_lower === null) {
								billId_init += '<table class="bill_status_boxes"><tr><td>';
								billId_init += '<div class="square_dark_grey"></div><div class="square_light_grey"></div>';
								billId_init += '<div class="square_light_grey"></div><div class="square_light_grey"></div>';
								billId_init += '<div class="passed_text">INTRODUCED TO HOUSE</div>';
								billId_init += '</td></tr></table></section>';
							} else if (val.action_dates.signed !== null) {
								billId_init += '<table class="bill_status_boxes"><tr><td>';
								billId_init += '<div class="square_dark_grey"></div><div class="square_dark_grey"></div>';
								billId_init += '<div class="square_dark_grey"></div><div class="square_dark_grey"></div>';
								billId_init += '<div class="passed_text">SIGNED INTO LAW</div>';
								billId_init += '</td></tr></table></section>';
							} else if (val.action_dates.passed_upper !== null) {
								billId_init += '<table class="bill_status_boxes"><tr><td>';
								billId_init += '<div class="square_dark_grey"></div><div class="square_dark_grey"></div>';
								billId_init += '<div class="square_dark_grey"></div><div class="square_light_grey"></div>';
								billId_init += '<div class="passed_text">PASSED SENATE</div>';
								billId_init += '</td></tr></table></section>';
							} else if (val.action_dates.passed_lower !== null) {
								billId_init += '<table class="bill_status_boxes"><tr><td>';
								billId_init += '<div class="square_dark_grey"></div><div class="square_dark_grey"></div>';
								billId_init += '<div class="square_light_grey"></div><div class="square_light_grey"></div>';
								billId_init += '<div class="passed_text">PASSED HOUSE</div>';
								billId_init += '</td></tr></table></section>';
							}	
							// This loop will run if bill originated in the upper chamber
						} else if (val.chamber === "upper") {
							if (val.action_dates.passed_upper === null) {
								billId_init += '<table class="bill_status_boxes"><tr><td>';
								billId_init += '<div class="square_dark_grey"></div><div class="square_light_grey"></div>';
								billId_init += '<div class="square_light_grey"></div><div class="square_light_grey"></div>';
								billId_init += '<div class="passed_text">INTRODUCED TO SENATE</div>';
								billId_init += '</td></tr></table></section>';
							} else if (val.action_dates.signed !== null) {
								billId_init += '<table class="bill_status_boxes"><tr><td>';
								billId_init += '<div class="square_dark_grey"></div><div class="square_dark_grey"></div>';
								billId_init += '<div class="square_dark_grey"></div><div class="square_dark_grey"></div>';
								billId_init += '<div class="passed_text">SIGNED INTO LAW</div>';
								billId_init += '</td></tr></table></section>';
							} else if (val.action_dates.passed_lower !== null) {
								billId_init += '<table class="bill_status_boxes"><tr><td>';
								billId_init += '<div class="square_dark_grey"></div><div class="square_dark_grey"></div>';
								billId_init += '<div class="square_dark_grey"></div><div class="square_light_grey"></div>';
								billId_init += '<div class="passed_text">PASSED HOUSE</div>';
								billId_init += '</td></tr></table></section>';
							} else if (val.action_dates.passed_upper !== null) {
								billId_init += '<table class="bill_status_boxes"><tr><td>';
								billId_init += '<div class="square_dark_grey"></div><div class="square_dark_grey"></div>';
								billId_init += '<div class="square_light_grey"></div><div class="square_light_grey"></div>';
								billId_init += '<div class="passed_text">PASSED SENATE</div>';
								billId_init += '</td></tr></table></section>';
							}
						}
					}
					
					if (val.action_dates !== null) {
						// Crap to do to pull out date information
						date_val_og =  val.action_dates.last.replace(' 00:00:00', '');
						date_val = new Date(replaceAll(date_val_og, '-', '/'));
						// For some reason the date is a date behind when we send it to Date();
						// So we'll add one to the date
						date_val.setDate(date_val.getDate());
						// Add to page
						billId_init += '<aside><div class="last_updated">Latest Activity: ' + month[date_val.getMonth()] + ' ' + date_val.getDate() + ', ' + date_val.getFullYear() + '</div></aside>';
						billId_init += '</div></div>';
					}
					// Enter reporter's description
					billId_init += "<p><strong>Reporter's insight:</strong> " + val.reporter_description + "</p>";
				}
			}
			bills_init += billId_init;
			billId_init += '<br /><br /><br />'
		});
	})
	.error(
		function() {
			$('#bill_content_init').html('');
			$("#go_back_second_page").hide();
			$('#bill_content_init').html('Sorry, there has been an error');
		}
	)
	.complete(
		function() {
			// Add stuff to the page
			$('.loading_content_init').hide();
			$('#bills_init').html(topics_headers + bills_init);
		}
	)
};

// Second JSON call to the Open States API
function loadJSON(billPath) {
	// Set the'Go back' button so it goes to the bill's category page
	topic_hash = $('#contents_header_topic a').attr('href');
	$('#go_back_third_page a').attr('href', topic_hash);
	$("#go_back_third_page").show();
	
	// First clear out our variables
	billId = "";
	description = "";
	chamber = "";
	sponsors = "";
	actions = "";
	actions_second = "";
	sources = "";
	votes = "";
	votes_second = "";
	vote_count_array_yes = [];
	vote_count_array_no = [];
	vote_count_array_other = [];
	vote_count_array_yes_two = [];
	vote_count_array_no_two = [];
	vote_count_array_other_two = [];
	updated_at = "";
	
	// First JSON call grabs bill info from Open States site
	$.getJSON('http://billtracker.c3service.com/' + billPath + '/annotated.js?callback=?', function(data){
		$('#loading').hide();
		// Run through the JSON file we called
		// And pull out bill information we want
		$.each(data, function(key, val) {
			// List of floor actions
			if (key === 'actions') {
				// Title table
				actions += '<table cellpadding="5px" width="50%"><tr>';
				actions += '<td width="40%"><h4 class="headers">Actions</h4></td>';
				actions += '<td><div class="house_box">H</div>House</td>';
				actions += '<td><div class="senate_box">S</div>Senate</td>';
				actions += '</tr></table>';
				
				// Where we'll keep the action info
				actionsHeader = '<table cellpadding="5px"><tbody>';
				actionsBody = '';
				actionsBody02 = '';
				actionsFooter = '</tbody></table>';
				
				// Counter to break up actions into first table of 10
				// Then second table with the rest of the actions
				count_actions = 0;
				
				// Loop creates tbody info
				// It loops in reverse, starting with the most recent action
				for (var actions_num = val.length - 1; actions_num >= 0; actions_num--) {
					count_actions += 1;
					
					if (count_actions < 11) {
						actions01 = '<tr>';
						// Holds date
						date_val_og =  val[actions_num]['date'].replace(' 00:00:00', '');
						date_val = new Date(replaceAll(date_val_og, '-', '/'));
						// For some reason the date is a date behind when we send it to Date();
						// So we'll add one to the date
						date_val.setDate(date_val.getDate());
						actions02 = '<td width="20%"><strong>';
						actions02 += month[date_val.getMonth()] + ' ' + date_val.getDate() + ', ' + date_val.getFullYear();
						actions02 += ':</strong></td>';
						// Holds chamber
						actions03 = '<td>' + val[actions_num]['action'] + '</td>';
						
						// Add reporters notes for each action
						if (val[actions_num]['text'] !== null && val[actions_num]['text'] !== "" && val[actions_num]['text'] !== " ") {
							actions03 += '<td><div class="action_info_button" name="description_' + count_actions + '">';
							if ($.browser.msie) {
								actions03 += '<a href="#"><img src="images/action_info_small.png" alt="Read more about this bill" /></a>';
							} else {
								actions03 += '<a href="#"><img src="images/action_info.png" width="37px" alt="Read more about this bill" /></a>';
							}
							actions03 += '</div></td>';
							actions03 += '</tr>';
							actions03 += '<tr><td colspan="4">';
							actions03 += '<div style="display: none;" class="reporters_paragraph" id="description_' + count_actions + '">';
							actions03 += "<strong>Reporter's insight:</strong> ";
							actions03 += val[actions_num]['text'];
							actions03 += '</div></tr></tr>';
						} else {
							actions03 += '</tr>';
						}
						// Holds action
						// Loop converts 'lower' to 'House' and 'upper to 'Senate'
						if (val[actions_num]['actor'] === 'lower') {
							actions04 = '<td><div class="house_box">H</div></td>';
						} else if (val[actions_num]['actor'] === 'upper') {
							actions04 = '<td><div class="senate_box">S</div></td>';
						}
						// Put the body together
						actionsBody += actions01 + actions04 + actions02 + actions03;
						// Button action
						$('#view_more_actions_button').hide();
						$('#actions_second').hide();
					} else {
						actions01 = '<tr>';
						// Holds date
						date_val_og =  val[actions_num]['date'].replace(' 00:00:00', '');
						date_val = new Date(replaceAll(date_val_og, '-', '/'));
						// For some reason the date is a date behind when we send it to Date();
						// So we'll add one to the date
						date_val.setDate(date_val.getDate());
						actions02 = '<td width="20%"><strong>';
						actions02 += month[date_val.getMonth()] + ' ' + date_val.getDate() + ', ' + date_val.getFullYear();
						actions02 += ':</strong></td>';
						// Holds chamber
						actions03 = '<td>' + val[actions_num]['action'] + '</td>';
						// Holds action
						// Loop converts 'lower' to 'House' and 'upper to 'Senate'
						if (val[actions_num]['actor'] === 'lower') {
							actions04 = '<td><div class="house_box">H</div></td>';
						} else if (val[actions_num]['actor'] === 'upper') {
							actions04 = '<td><div class="senate_box">S</div></td>';
						}
						actions05 = '</tr>';
						// Put the body together
						actionsBody02 += actions01 + actions04 + actions02 + actions03 + actions05;
						// Button action
						$('#view_more_actions_button').fadeIn(200);
					}
				}
				// Put it all together
				// Actions is table with first 10 actions
				// Actions_second is all the other actions to the bill
				actions += actionsHeader + actionsBody + actionsFooter;
				actions_second += actionsHeader + actionsBody02 + actionsFooter;
			}
			
			// Title of the bill
			if (key === 'title') {
				description += '<h4 class="headers">Description</h4>';
				description += '<div class="regular_text">' + val + '</div><br />';
				description += "<div class='regular_text'><strong>Reporter's insight:</strong> " + data.reporter_description + '</div>';
			}
			
			// Which chamber the bill originated in
			// This will set up our thermometer graphic at the top of the page
			if (key === 'chamber') {
				chamber += '<table id ="chamber"><tr>';
				// Run this if it is a House bill
				if (val === 'upper') {
					chamber += '<td class="chamber_black_text">INTRODUCED IN THE SENATE';
					chamber += '<div class="arrow_up_black"></div><hr class="chamber_black_hr_bar" />';
					chamber += '</td>'
					// We will color the text passed on whether or not its passed a particular chamber
					if (data.action_dates.passed_upper === null) {
						chamber += '<td class="chamber_grey_text">PASSED THE SENATE';
						chamber += '<div class="arrow_up_grey"></div><hr class="chamber_grey_hr_bar" />';
						chamber += '</td>'
					} else {
						chamber += '<td class="chamber_black_text">PASSED THE SENATE';
						chamber += '<div class="arrow_up_black"></div><hr class="chamber_black_hr_bar" />';
						chamber += '</td>'
					}
					// See if its passed the other chamber now
					if (data.action_dates.passed_lower === null) {
						chamber += '<td class="chamber_grey_text">PASSED THE HOUSE';
						chamber += '<div class="arrow_up_grey"></div><hr class="chamber_grey_hr_bar" />';
						chamber += '</td>'
					} else {
						chamber += '<td class="chamber_black_text">PASSED THE HOUSE';
						chamber += '<div class="arrow_up_black"></div><hr class="chamber_black_hr_bar" />';
						chamber += '</td>'
					}
					// Finally see its been signed into law
					if (data.action_dates.signed === null) {
						chamber += '<td class="chamber_grey_text">SIGNED INTO LAW';
						chamber += '<div class="arrow_up_grey"></div><hr class="chamber_grey_hr_bar" />';
						chamber += '</td>'
					} else {
						chamber += '<td class="chamber_black_text">SIGNED INTO LAW';
						chamber += '<div class="arrow_up_black"></div><hr class="chamber_black_hr_bar" />';
						chamber += '</td>'
					}
				// Run this if its a House bill
				} else {
					// Run this just in case the data doesn't specify where the bill was introduced
					// In that case, we'll just say "INTRODUCED"
					if (val === 'lower') {
						chamber += '<td class="chamber_black_text">INTRODUCED IN THE HOUSE';
						chamber += '<div class="arrow_up_black"></div><hr class="chamber_black_hr_bar" />';
						chamber += '</td>'
					} else {
						chamber += '<td class="chamber_black_text">INTRODUCED';
						chamber += '<div class="arrow_up_black"></div><hr class="chamber_black_hr_bar" />';
						chamber += '</td>'
					}
					// We will color the text passed on whether or not its passed a particular chamber
					if (data.action_dates.passed_lower === null) {
						chamber += '<td class="chamber_grey_text">PASSED THE HOUSE';
						chamber += '<div class="arrow_up_grey"></div><hr class="chamber_grey_hr_bar" />';
						chamber += '</td>'
					} else {
						chamber += '<td class="chamber_black_text">PASSED THE HOUSE';
						chamber += '<div class="arrow_up_black"></div><hr class="chamber_black_hr_bar" />';
						chamber += '</td>'
					}
					// See if its passed the other chamber now
					if (data.action_dates.passed_upper === null) {
						chamber += '<td class="chamber_grey_text">PASSED THE SENATE';
						chamber += '<div class="arrow_up_grey"></div><hr class="chamber_grey_hr_bar" />';
						chamber += '</td>'
					} else {
						chamber += '<td class="chamber_black_text">PASSED THE SENATE';
						chamber += '<div class="arrow_up_black"></div><hr class="chamber_black_hr_bar" />';
						chamber += '</td>'
					}
					// Finally see its been signed into law
					if (data.action_dates.signed === null) {
						chamber += '<td class="chamber_grey_text">SIGNED INTO LAW';
						chamber += '<div class="arrow_up_grey"></div><hr class="chamber_grey_hr_bar" />';
						chamber += '</td>'
					} else {
						chamber += '<td class="chamber_black_text">SIGNED INTO LAW';
						chamber += '<div class="arrow_up_black"></div><hr class="chamber_black_hr_bar" />';
						chamber += '</td>'
						}
				}
				chamber += '</tr></table>';
			}
			
			// Go through the sponsors
			// And link to their pages on OpenStates website
			if (key === 'sponsors' && data.sponsors[0].leg_id !== null) {
				sponsors = "";
				var legislator_count = 0;
				// We'll check to see how many sponsors the bill has
				number_of_sponsors = data.sponsors.length;
				// Add to global sponsors variable
				// Which will be added to the DOM with jQuery
				sponsors += '<h4 class="headers">Sponsors</h4>';
				// If we're pulling out JSON data on the bills' sponsors,
				// We'll call another Open States site to grab legislator information
				for (legislators in val) {
					legislator_count += 1;
					// We'll run this to see if the current legislator is the last in the list of sponsors
					// If not, we'll add a comma at the end of the legislator name
					// Because another will be coming after him or her
					if (number_of_sponsors === 1 || legislator_count === number_of_sponsors) {
						sponsors += '<a href="http://openstates.org/ia/legislators/';
						sponsors += val[legislators].leg_id + '" target="_blank">' + val[legislators].name;
						sponsors += '</a>';
					} else {
						sponsors += '<a href="http://openstates.org/ia/legislators/';
						sponsors += val[legislators].leg_id + '" target="_blank">' + val[legislators].name;
						sponsors += '</a>, ';
					}
					// Call funciton that will get legislators' info
					// getLegInfo(legislators, val, number_of_sponsors);
				}
			}
			
			// When all this information was last updated
			if (key === 'updated_at') {
				updated_at += '<p><em>Updated at: ' + val + '</em></p>';
			}
			
			// This allows people to read the different versions of the bills
			// We'll create tables with links
			if (key === 'versions') {
				sources += '<h4 class="headers">Track the Bill</h4>';
				sources += '<p>Track the progress of this bill by reading the different versions of the bill as it moves through the legislature:</p>'
				sources += '<table width="100%">';
				for (version_num in val) {
						// Break the table into fours
						if (version_num % 4 === 0) {
							sources += '<tr>';
						}
						sources += '<td>';
						sources += '<a href="' + val[version_num]['url'] + '" target="_blank">';
						sources += '<strong>&#187; ' + val[version_num]['name'] + '</strong></a>';
						sources += '</td>';
						if (version_num % 4 === 3) {
							sources += '</tr>';
						}
				}
				sources += '</table>';
			}
			
			// The bill number
			if (key === 'bill_id') {
				if (data.action_dates.signed === null) {
					billId += '<div class="bill_number_header"><h5 id="bill_number">' + val + '</h5></div>';
					billId += '<div class="bill_status_img">';
					if ($.browser.msie) {
						billId += '<img src="images/status_in_progress_small.jpg" alt="This bill is in progress" />';
					} else {
						billId += '<img width="128px" src="images/status_in_progress.jpg" alt="This bill is in progress" />';
					}
					billId += '</div>';
				} else {
					billId += '<div class="bill_number_header"><h5 id="bill_number">' + val + '</h5></div>';
					billId += '<div class="bill_status_img">';
					if ($.browser.msie) {
						billId += '<img src="images/status_signed_small.jpg" alt="This bill has been signed" />';
					} else {
						billId += '<img width="130px" src="images/status_signed.jpg" alt="This bill has been signed" />';
					}
					billId += '</div>'
				}
			}
			
			// If the bill has been voted on, this will track how each legislator voted
			count_votes = 0;
			if (key === 'votes' && data.votes.length > 0){
				$('#loading').fadeIn(200);
				
				// Only create this if we have votes recorded
				// Create the header
				votes += '<h4 class="headers">Votes</h4>';
				// This will create our table
				for (votes_num in val) {
					count_votes += 1;
					
					// We'll break this in to two 
					// if (count_votes < 2) {
						
					// First convert JSON date info to Javascript date
					vote_date_val_og =  val[votes_num]['date'].replace(' 00:00:00', '');
					vote_date_val = new Date(replaceAll(vote_date_val_og, '-', '/'));
					vote_date_val.setDate(vote_date_val.getDate());
					
					current_vote_count = '';
					current_vote_count += '<div>';
					current_vote_count += '<h4 class="votes_headers">';
					// This will set the chamber and vote date
					if (val[votes_num].chamber === 'upper') {
						current_vote_count += 'Senate vote: ';
						current_vote_count += month[vote_date_val.getMonth()] + ' ' + vote_date_val.getDate() + ', ' + vote_date_val.getFullYear();
					} else if (val[votes_num].chamber === 'lower') {
						current_vote_count += 'House vote: ';
						current_vote_count += month[vote_date_val.getMonth()] + ' ' + vote_date_val.getDate() + ', ' + vote_date_val.getFullYear();
					}
					current_vote_count += '</h4>';
					current_vote_count += 'Motion: ' + val[votes_num].motion + ' <br />';
							
					// This determines if the bill passed
					if (val[votes_num].passed === true) {
						current_vote_count += ' <strong>The motion passed.</strong>';
					} else {
						current_vote_count += ' <strong>The motion did not pass.</strong>';
					}
					if (val[votes_num].yes_count > val[votes_num].no_count) {
						current_vote_count += '<br /><br /><ul class="nav nav-pills">';
						current_vote_count += '<li class="active votes_tables_buttons" title="yes_vote_number_' + votes_num + '">';
						current_vote_count += '<a href="#">Yes - ' + val[votes_num].yes_count + '</a></li>';
						current_vote_count += '<li class="votes_tables_buttons" title="no_vote_number_' + votes_num + '">';
						current_vote_count += '<a href="#">No - ' + val[votes_num].no_count + '</a></li>';
						current_vote_count += '<li class="votes_tables_buttons" title="other_vote_number_' + votes_num + '">';
						current_vote_count += '<a href="#">Other - ' + val[votes_num].other_count + '</a></li>';
						current_vote_count += '</ul>';
						
						table_header_yes = '<table class="table table-striped yes_vote_number_' + votes_num + '">';
						table_header_no = '<table class="table table-striped no_vote_number_' + votes_num + '" style="display: none;">';
						table_header_other = '<table class="table table-striped other_vote_number_' + votes_num + '" style="display: none;">';
							
					} else if (val[votes_num].yes_count < val[votes_num].no_count) {
						current_vote_count += '<br /><br /><ul class="nav nav-pills">';
						current_vote_count += '<li class="votes_tables_buttons" title="yes_vote_number_' + votes_num + '">';
						current_vote_count += '<a href="#">Yes - ' + val[votes_num].yes_count + '</a></li>';
						current_vote_count += '<li class="active votes_tables_buttons" title="no_vote_number_' + votes_num + '">';
						current_vote_count += '<a href="#">No - ' + val[votes_num].no_count + '</a></li>';
						current_vote_count += '<li class="votes_tables_buttons" title="other_vote_number_' + votes_num + '">';
						current_vote_count += '<a href="#">Other - ' + val[votes_num].other_count + '</a></li>';
						current_vote_count += '</ul>';
						
						table_header_yes = '<table class="table table-striped yes_vote_number_' + votes_num + '" style="display: none;">';
						table_header_no = '<table class="table table-striped no_vote_number_' + votes_num + '">';
						table_header_other = '<table class="table table-striped other_vote_number_' + votes_num + '" style="display: none;">';
						
					} else {
						current_vote_count += '<br /><br /><ul class="nav nav-pills">';
						current_vote_count += '<li class="votes_tables_buttons" title="yes_vote_number_' + votes_num + '">';
						current_vote_count += '<a href="#">Yes - ' + val[votes_num].yes_count + '</a></li>';
						current_vote_count += '<li class="votes_tables_buttons" title="no_vote_number_' + votes_num + '">';
						current_vote_count += '<a href="#">No - ' + val[votes_num].no_count + '</a></li>';
						current_vote_count += '<li class="active votes_tables_buttons" title="other_vote_number_' + votes_num + '">';
						current_vote_count += '<a href="#">Other - ' + val[votes_num].other_count + '</a></li>';
						current_vote_count += '</ul>'; '</a></li>';
						current_vote_count += '</ul>';
						
						table_header_yes = '<table class="table table-striped yes_vote_number_' + votes_num + '" style="display: none;">';
						table_header_no = '<table class="table table-striped no_vote_number_' + votes_num + '" style="display: none;">';
						table_header_other = '<table class="table table-striped other_vote_number_' + votes_num + '">';
					}
					current_vote_count += '</div>';
					
					table_header_one_yes = '<div class="votes_tables">';

					table_header = '<thead><td><strong>Member</strong></td>';
					table_header += '<td><strong>Party</strong></td><td><strong>District</strong></td>';
					table_header += '</thead><tbody>';

					if (count_votes < 2) {
						vote_count_array_yes.push(current_vote_count + table_header_one_yes + table_header_yes + table_header);
						vote_count_array_no.push(table_header_no + table_header);
						vote_count_array_other.push(table_header_other + table_header);
					} else {
						vote_count_array_yes_two.push(current_vote_count + table_header_one_yes + table_header_yes + table_header);
						vote_count_array_no_two.push(table_header_no + table_header);
						vote_count_array_other_two.push(table_header_other + table_header);
					}
					
					// This will create the votes count tables
					// And make call to our second JSON call to OpenStates with getLegInfoVotes();
					// Which will pull legislator information
					yes_votes = val[votes_num].yes_votes;
					no_votes = val[votes_num].no_votes;
					other_votes = val[votes_num].other_votes;
					
					number_of_legislators = yes_votes.length;
					number_of_legislators_no = no_votes.length;
					number_of_legislators_other = other_votes.length;
					
					number_of_votes = data.votes.length;
					
					// The getLegInfoVotes function makes a seperate call to the OpenStates API
					// To pull legislator information
					for (legislator_num in yes_votes) {
						legislators_who_voted = yes_votes[legislator_num];
						getLegInfoVotes(legislators_who_voted, legislator_num, number_of_legislators, votes_num, number_of_votes, 'yes', count_votes);
					}
					for (legislator_num in no_votes) {
						legislators_who_voted = no_votes[legislator_num];
						getLegInfoVotes(legislators_who_voted, legislator_num, number_of_legislators_no, votes_num, number_of_votes, 'no', count_votes);
					}
					for (legislator_num in other_votes) {
						legislators_who_voted = other_votes[legislator_num];
						getLegInfoVotes(legislators_who_voted, legislator_num, number_of_legislators_other, votes_num, number_of_votes, 'other', count_votes);
					}
					
				// }
				}
			}
		});
	})
	.error(
		function() {
			$('#bill_content').html('');
			$('#bill_content').html('Sorry, there has been an error');
		}
	)
	// Add all of our HTML to DOM after second JSON call is completed
	.complete(
		function() {
			loadToPage('loadJSON');
		}
	)
}

function getLegInfoVotes(legislators_who_voted, legislator_num, number_of_legislators, votes_num, number_of_votes, yes_no, count_votes) {
	// legislators_who_voted = object with legislator ID and last name
	// legislator_num = current legislator we are on (starts at 0)
	// number_of_legislators = total number of legislators who voted (starts at 1)
	// votes_num = current vote we are on (starts at 0)
	// number_of_votes = number of votes total on a bill (starts at 1)
	// yes_no = Whether or not the legislature voted yes or no
	
	var name = "";
	var district = "";
	var party = "";
	var legChamber = "";
	
	// If the bill has a sponsor or sponsors
	// We'll grab the legislator information from other URL
	// Using the leg_id field in the original JSON file
	var legId = legislators_who_voted['leg_id'];
	if (legId != null) {
		$.getJSON('http://openstates.org/api/v1/legislators/' + encodeURI(legId) + '/?apikey=' + encodeURI(apiKey) + '&callback=?', function(data){
			// Global variables
		
			// Pull out the data from the legislators
			$.each(data, function(key, val) {
				
				// console.log(key, ': ', val);
				if (key === 'full_name') {
					name = val;
				}
				if (key === 'district') {
					district = val;
				}
				if (key === 'party') {;
					party = val;
				}
				if (key === 'id') {;
					id = val;
				}
			});
			
			votes_num = parseInt(votes_num);
			
			if (yes_no === 'yes' && count_votes < 2) {
				vote_count_array_yes[votes_num] += '<tr><td><a href="http://openstates.org/ia/legislators/' + id + '" target="_blank">' + name + '</a></td><td>' + party + '</td><td>' + district + '</td></tr>';
			} else if (yes_no === 'no' && count_votes < 2) {
				vote_count_array_no[votes_num] += '<tr><td><a href="http://openstates.org/ia/legislators/' + id + '" target="_blank">' + name + '</a></td><td>' + party + '</td><td>' + district + '</td></tr>';
			} else if (yes_no === 'other' && count_votes < 2) {
				vote_count_array_other[votes_num] += '<tr><td><a href="http://openstates.org/ia/legislators/' + id + '" target="_blank">' + name + '</a></td><td>' + party + '</td><td>' + district + '</td></tr>';
			} else if (yes_no === 'yes' && count_votes >= 2) {
				vote_count_array_yes_two[votes_num - 1] += '<tr><td><a href="http://openstates.org/ia/legislators/' + id + '" target="_blank">' + name + '</a></td><td>' + party + '</td><td>' + district + '</td></tr>';
			} else if (yes_no === 'no' && count_votes >= 2) {
				vote_count_array_no_two[votes_num - 1] += '<tr><td><a href="http://openstates.org/ia/legislators/' + id + '" target="_blank">' + name + '</a></td><td>' + party + '</td><td>' + district + '</td></tr>';
			} else if (yes_no === 'other' && count_votes >= 2) {
				vote_count_array_other_two[votes_num - 1] += '<tr><td><a href="http://openstates.org/ia/legislators/' + id + '" target="_blank">' + name + '</a></td><td>' + party + '</td><td>' + district + '</td></tr>';
			}
			
		})
		.complete(
			function() {
				// We'll only add our votes tables to the page
				// When we are done going through all the legislators and all the votes
				if (parseInt(legislator_num) + 1 === number_of_legislators && parseInt(votes_num) + 1 === number_of_votes && yes_no === 'other') {
					loadToPage('votes');
				}
			}
		)
	}
}

// Get it on the page!
function loadToPage(DOM_manipulation_check) {
	$('.loading_content').hide();
	
	// We'll run this check to see if the call is coming from the getLegInfo or getLegInfoVotes functions
	// If it coming from getLegInfoVotes, we only need to clear out the votes divs on the page and add content
	// Otherwise it is coming from the initial loadJSON function and we need to clear everything out
	if (DOM_manipulation_check !== 'votes') {
		// Hide these by default
		$('#view_less_actions_button').hide();
		$('#actions_second').hide();
		$('#view_more_votes_button').hide();
		$('#view_less_votes_button').hide();
		$('#votes_second').hide();
		
		// Clear out DIVs
		$('#billId').html('');
		$('#chamber').html('');
		$('#description').html('');
		$('#actions').html('');
		$('#sources').html('');
		$('#sponsors').html('');
		$('#votes').html('');
		$('#votes_second').html('');
		$('#updated_at').html('');
		
		// Add to page
		$('#billId').html(billId);
		$('#chamber').html(chamber);
		$('#description').html(description);
		$('#actions').html(actions);
		$('#actions_second').html(actions_second);
		$('#sources').html(sources);
		$('#sponsors').html(sponsors);
		$('#updated_at').html(updated_at);
	} else {
		
		// Clear out DIVs
		$('#votes').html('');
		$('#votes_second').html('');
		// Add content via a vote array we created
		for (num in vote_count_array_yes) {
			votes += vote_count_array_yes[num];
			votes += '</tbody></table>';
			votes += vote_count_array_no[num];
			votes += '</tbody></table>';
			votes += vote_count_array_other[num];
			votes += '</tbody></table></div>';
		}
		for (num in vote_count_array_yes_two) {
			votes_second += vote_count_array_yes_two[num];
			votes_second += '</tbody></table>';
			votes_second += vote_count_array_no_two[num];
			votes_second += '</tbody></table>';
			votes_second += vote_count_array_other_two[num];
			votes_second += '</tbody></table></div>';
		}
		$('#loading').hide();
		
		// Add to page
		$('#votes').html(votes);
		
		$('#votes_second').html(votes_second);
		$('#view_more_votes_button').fadeIn(200);
	}
	$('#votes_loading').html('');
}