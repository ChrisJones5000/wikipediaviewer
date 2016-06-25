/*
	Create Wikipedia Viewer that accomplishes the following:
		Primary Requirements
			1. Ability to search Wikipedia & see resulting entries
			2. Ability to click on a button and display a random entry
		Secondary Requirements
			1. Click on entry to visit Wikipedia entry page
*/

//Search Wikipedia API based on text input
function search() {
	//Get search term from text input
	var $searchTerm = $("#search-box").val();
	validateInput($searchTerm);
	//Include search term in API call
	//Use JSONP due to cross-origin
	var baseURL = "https://en.wikipedia.org/w/api.php?action=opensearch&limit=5&format=json&search=" + $searchTerm + "&callback=?";

	//Use $.ajax instead of $.getJSON
	//$.getJSON does not provide error handling for JSONP
	//Using $.ajax allows for providing a "timeout" that assumes the request failed if no response in that time
	//Set an error if the request does not complete within the specified timeout period (3000ms)
	$.ajax({
		url: baseURL,
		dataType: 'jsonp',
		//Set timeout if no response from API
		timeout: 3000,
		success: function (data){
			var html = "";
			//Loop through JSONP array and build individual entries
			for (var i = 0; i < data[1].length; i++){
				html += "<a href='" + data[3][i] + "' target='_blank'>";
				html += "<div class='entry-container'>";
				html += "<h3>" + data[1][i] + "</h3>";
				html += "<p>" + data[2][i] + "</p>";
				html += "</div></a>";
			}
		
			//Place HTML in output div
			$("#output").html(html);
		},
		error: function(){
			alert("Error retrieving data from Wikipedia");
		}
	});

	function validateInput(val) {
		//Check for empty input
		if (val.trim().length === 0){
			 alert("Please enter a search term.");
		}
	}
}

//Direct user to URL to retrieve random page
//Special:Random appended to the wikipedia URL allows for pulling a random page
//Substituting with [Special:Random/Namespace] will allow for pulling randome page in different namespaces
function randomSearch() {
	var randomURL = "https://en.wikipedia.org/wiki/Special:Random";
	window.open(randomURL);
}

$(".action-btn").click(function(event){
	if (this.id === "find-btn"){
		search();
	} else {
		randomSearch();
	}

});

//If user hits enter instead of clicking on search icon
$("#search-box").keypress(function(event){
	if (event.which === 13) {
		event.preventDefault();
		search();
	}
});

//If search box is in focus then clear text
$("input").focus(function(){ 
	$(this).attr("placeholder", "");
});

//If search box loses focus then add placeholder text back
$("input").blur(function(){
	$(this).attr("placeholder", "Search Wikipedia");
});

//Clear input field on refresh
function clearInput(){
	$("#search-box").val("");
}

clearInput();




































