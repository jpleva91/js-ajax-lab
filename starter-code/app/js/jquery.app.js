$(document).ready(function() {
	// - Checks if jQuery is Ready -
	console.log("jQuery is ready");
	/*
	* === Loads Current Cat Data onto Page ===
	*/
	var getCats = $.get("https://ga-cat-rescue.herokuapp.com/api/cats", function(data) {
		// - Stores data into catObject -
		var catObject = data;
		// - Parses catObject from JSON into javaScript Object -
		catObject = JSON.parse(catObject);
		// - Reverses catObject to Nisplay Newest First -
		var displayCats = catObject.slice(0).reverse();
		// - Loop and Display Object on the Page -
		for(i = 0; i < displayCats.length; i++) {
			// - Append Each as List Item With Notes Italicized - 
			$('#cats').append('<li>'+ 
				displayCats[i].name + 
				" - " + 
				'<i>' + displayCats[i].note + '</i>' + '<br/>' +
				'<img src =' + displayCats[i].image + 'alt = "=^.^=" />' +
				'</li>');
		};
	});
	/*
	* === Adds a New Cat to the Database ===
	*/
	function newCat() {
		// - Grabs Values from Form Ids and Stores them as Variables -
		var catName = $("#cat-name").val();
		var catNote = $('#cat-note').val();
		var catImage =$('#cat-image').val();
		// - Creates an Object using Stored Variables - 
		var newCats = {
			name: catName,
			note: catNote,
			image: catImage
		}
		// - Ajax Request -
		$.ajax({
			// - Post to Database -
			method: "POST",
			url: "https://ga-cat-rescue.herokuapp.com/api/cats",
			// - Convert newCats Object to JSON String -
			data: JSON.stringify(newCats)
		})
		// - Add Most Recent newCats Values to Top of Unordered List -
		$('#cats').prepend('<li>' + newCats.name + " - " + '<i>' + newCats.note + '<br/>' + '<img src =' + newCats.image + 'alt = "=^.^=" />' + '</li>');
	};
	/*
	* === Handles Form Submission ===
	*/
	$('#btn-click').click(function(event) {
		// - Prevents Default Submit Action -
		event.preventDefault();
		// - Runs newCat Function -
		newCat();
	});
});