// Global variables
var commentsKey = '79d51927999049d8504147f1ce757d7d:10:70171363';
var byDateUrl1 = 'http://api.nytimes.com/svc/community/v2/comments/by-date/';
var byDateUrl2 = '.jsonp?api-key=' + commentsKey;
var randomUrl = 'http://api.nytimes.com/svc/community/v2/comments/random.jsonp?api-key=' + commentsKey;
var userUrl1 = 'http://api.nytimes.com/svc/community/v2/comments/user/id/';
var userUrl2 = '.jsonp?api-key=' + commentsKey;
var users = [];
var comments = [];
var ratedComments = [];

// Get the time and date to display in the subheader
var getDateTime = function() {
	var d = new Date();
	var n = d.toDateString();
	n += '<br>' + d.toLocaleTimeString();
	$('#date').html(n);
	var t = setTimeout(function() {getDateTime()}, 500);
}

// Check if a user has already been retrieved by the API
var userExists = function(id) {
	for (var i = 0; i < users.length; i++) {
		if (users[i].id == id) {
			return i;
		}
	}
	return null;
}

// Retrieve comments from a specified date
var getCommentsByDate = function(date) {
	// Construct the URL for the API request
	var u = byDateUrl1 + date + byDateUrl2;
	// Make the API request
	$.ajax({
		type: 'GET',
		url: u,
		dataType: 'jsonp',
		jsonp: 'callback',
	})
	.success(function(res) {
		// Parse the response for each comment returned
  		var data = res.results.comments;
  		for (var i = 0; i < data.length; i++) {
  			var cur = data[i];
  			var user;
  			var comment;
  			var articleURL;
	  		var userID = cur.userComments.substring(50, (cur.userComments.length - 4));
  			while (userID == undefined)
	  			continue;
	  		var displayName = cur.display_name;
	  		if ((displayName != undefined) && (displayName.length == 0))
	  			displayName = 'Anonymous';
	  		var userIdx = userExists(userID);
	  		// Add the user to the array of retrieved users, if not already retrieved
	  		if (userIdx == null) {
	  			user = {};
	  			user.id = userID;
	  			user.displayName = displayName;
	  			user.score = 0;
	  			users.push(user);
	  		}
	  		else {
	  			user = users[userIdx];
	  		}
  			var comment = cur.commentBody;
  			var article = cur.articleURL;
  			var appendStr = '';
  			// Prepend a box with the comment and relevant information to comments container in HTML
  			appendStr += '<div id="' + comments.length + '" class="comment ' + userID + '"><p class="user">' + displayName + '</p><p class="says"> says:</p><br><br>' + comment + '<br><br><b>Original article:</b><br><a target=_blank href="' + article + '">' + article + '</a><br><br><div class="emptyStar" id="' + comments.length + '_star1"></div><div class="emptyStar" id="' + comments.length + '_star2"></div><div class="emptyStar" id="' + comments.length + '_star3"></div><div class="emptyStar" id="' + comments.length + '_star4"></div></div>';
  			$('#commentsContainer').prepend(appendStr).masonry('reloadItems').masonry('layout');
  			var com = 
  			{
  				id: comments.length,
  				author: user.displayName,
  				score: 0,
  				text: comment
  			}
  			// Add the comment to the array of retrieved comments
  			comments.push(com);
  		}
  	});
}

// Retrieve random comments
var getRandomComments = function() {
	// Make the API request
	$.ajax({
		type: 'GET',
		url: randomUrl,
		dataType: 'jsonp',
		jsonp: 'callback',
	})
	.success(function(res) {
		// Parse the response for each comment returned
  		var data = res.results.comments;
  		for (var i = 0; i < data.length; i++) {
  			var cur = data[i];
  			var user;
  			var comment;
  			var articleURL;
	  		var userID = cur.userComments.substring(50, (cur.userComments.length - 4));
  			while (userID == undefined)
	  			continue;
	  		var displayName = cur.display_name;
	  		if ((displayName != undefined) && (displayName.length == 0))
	  			displayName = 'Anonymous';
	  		var userIdx = userExists(userID);
	  		// Add the user to the array of retrieved users, if not already retrieved
	  		if (userIdx == null) {
	  			user = {};
	  			user.id = userID;
	  			user.displayName = displayName;
	  			user.score = 0;
	  			users.push(user);
	  		}
	  		else {
	  			user = users[userIdx];
	  		}
  			var comment = cur.commentBody;
  			var article = cur.articleURL;
  			var appendStr = '';
  			// Prepend a box with the comment and relevant information to comments container in HTML
  			appendStr += '<div id="' + comments.length + '" class="comment ' + userID + '"><p class="user">' + displayName + '</p><p class="says"> says:</p><br><br>' + comment + '<br><br><b>Original article:</b><br><a target=_blank href="' + article + '">' + article + '</a><br><br><div class="emptyStar" id="' + comments.length + '_star1"></div><div class="emptyStar" id="' + comments.length + '_star2"></div><div class="emptyStar" id="' + comments.length + '_star3"></div><div class="emptyStar" id="' + comments.length + '_star4"></div></div>';
  			$('#commentsContainer').prepend(appendStr).masonry('reloadItems').masonry('layout');
  			var com = 
  			{
  				id: comments.length,
  				author: user.displayName,
  				score: 0,
  				text: comment
  			}
  			// Add the comment to the array of retrieved comments
  			comments.push(com);
  		}
  	});
}

// Retrieve comments from a specified user
var getCommentsByUser = function(userID) {
	// Construct the URL for the API request
	var u = userUrl1 + userID + userUrl2;
	// Make the API request
	$.ajax({
		type: 'GET',
		url: u,
		dataType: 'jsonp',
		jsonp: 'callback',
	})
	.success(function(res) {
		// Parse the response for each comment returned
  		var data = res.results.comments;
  		for (var i = 0; i < data.length; i++) {
  			var cur = data[i];
  			var userID = cur.userComments.substring(50, (cur.userComments.length - 4));
  			while (userID == undefined)
	  			continue;
  			var userDisplayName = cur.display_name;
  			if (userDisplayName.length == 0)
  				displayName = 'Anonymous';
  			var comment = cur.commentBody;
  			var article = '';
  			if (comment.articleURL != undefined) {
  				article = '<br><br><b>Original article:</b><br><a target=_blank href="' + article + '">' + article + '</a>';
  			}
  			var appendStr = '';
  			// Prepend a box with the comment and relevant information to comments container in HTML
  			appendStr += '<div id="' + comments.length + '" class="comment ' + userID + '"><p class="user">' + userDisplayName + '</p><p class="says"> says:</p><br><br>' + comment + article + '<br><br><div class="emptyStar" id="' + comments.length + '_star1"></div><div class="emptyStar" id="' + comments.length + '_star2"></div><div class="emptyStar" id="' + comments.length + '_star3"></div><div class="emptyStar" id="' + comments.length + '_star4"></div></div>';
  			$('#commentsContainer').prepend(appendStr).masonry('reloadItems').masonry('layout');
  			var com = 
  			{
  				id: comments.length,
  				author: userDisplayName,
  				score: 0,
  				text: comment
  			}
  			// Add the comment to the array of retrieved comments
  			comments.push(com);
  		}
  	});
}

// Sorting functions to sort comment leaderboard by comment author or rating, ascending or descending
var starsDescending = function(a, b) {
  if (a.stars < b.stars) {
    return 1;
  }
  if (a.stars > b.stars) {
    return -1;
  }
  return 0;
}
var starsAscending = function(a, b) {
  if (a.stars > b.stars) {
    return 1;
  }
  if (a.stars < b.stars) {
    return -1;
  }
  return 0;
}
var authorDescending = function(a, b) {
  if (a.author.toUpperCase() < b.author.toUpperCase()) {
    return 1;
  }
  if (a.author.toUpperCase() > b.author.toUpperCase()) {
    return -1;
  }
  return 0;
}
var authorAscending = function(a, b) {
  if (a.author.toUpperCase() > b.author.toUpperCase()) {
    return 1;
  }
  if (a.author.toUpperCase() < b.author.toUpperCase()) {
    return -1;
  }
  return 0;
}
var sort = function(type) {
	var rows = [];
	var children = $($('.tbody').children());
	children.each(function() {
		var tempObj = {};
		tempObj.id = $(this)[0].id;
		tempObj.stars = $(this)[0].classList[0];
		tempObj.author = $(this)[0].classList[1];
		tempObj.obj = $(this);
		rows.push(tempObj);
	});
	rows.sort(type);
	children.remove();
	for (var i = 0; i < rows.length; i++) {
		$('.tbody').append(rows[i].obj);
	}
}

var fill = function(element) {
	var elem = $(element);
	elem.removeClass('emptyStar');
	elem.addClass('fullStar');
}

var empty = function(element) {
	var elem = $(element);
	elem.removeClass('fullStar');
	elem.addClass('emptyStar');
}

// Functions to manipulate the HTML document once it is ready
$(document).ready(function() {

	// Fade in the page, start the date/time clock, and slide in the welcome message on page load
	$(window).load(function() {
		$('body').hide().fadeIn(1000);
		getDateTime();
		setTimeout(function() {
			$('#welcome').slideDown(1500);
		}, 600);
	});

	var container = $('#commentsContainer');

	// Initialize the masonry for boxes with comments and relevant information
	container.masonry({
		itemSelector: '.comment',
		isFitWidth: true
	});

	// On clicking the app title, go back to homepage with welcome message
	$('#title').click(function() {
		container.children().remove();
		container.css('width', 'initial').css('height', 'initial');
		$('#welcome').slideDown(600);
	});

	// On clicking "Comments from a day" button, prompt for a date and make an API request for comments
	$('#buttonDate').click(function() {
		var date = prompt('Please enter a date in the format "YYYYMMDD" (YearMonthDay).', 'YYYYMMDD');
		var isValid = '[1-2][0-9][0-9][0-9][0-1][0-9][0-3][0-9]';
		while (date.match(isValid) == null) {
			date = prompt('Please enter a date in the format "YYYYMMDD" (YearMonthDay).', 'YYYYMMDD');
		}
		$('#welcome').slideUp(600);
		getCommentsByDate(date);
	});

	// On clicking "Random comments" button, make an API request for random comments
	$('#buttonRand').click(function() {
		$('#welcome').slideUp(600);
		getRandomComments();
	});

	// On clicking a user's name, make an API request for more comments by that user
	container.on('click', 'p.user', function() {
		var num = $(this).parent()[0].classList[1];
		getCommentsByUser(num);
	});

	// On clicking sort arrow buttons in leaderboard column headers, sort comment rows by author or ranking
	$('#starsDescending').click(function() { sort(starsDescending); });
	$('#starsAscending').click(function() { sort(starsAscending); });
	$('#authorDescending').click(function() { sort(authorDescending); });
	$('#authorAscending').click(function() { sort(authorAscending); });

	// On clicking any help topic, hide the help topic listing
	$('li').click(function() {
		$('#helpWelcome').hide();
		$('#helpTopics').show();
		$('.topic').hide();
		$('#back').show();
	});

	// On clicking a specific help topic, show the relevant solution
	$('#li1').click(function() { $('#getCommentHelp').show(); });
	$('#li2').click(function() { $('#getArticleHelp').show(); });
	$('#li3').click(function() { $('#ratingHelp').show(); });
	$('#li4').click(function() { $('#leaderboardHelp').show(); });

	// On clicking back button in help topic solution, go back to help topic listing
	$('#back').click(function() {
		$('.topic').hide();
		$('#helpTopics').hide();
		$('#helpWelcome').show();
	});

	// On clicking an empty star, update the comment's rating count and comment leaderboard
	container.on('click', 'div.emptyStar', function() {
		// Identify the comment whose rating is being changed
		var commentNum = $(this)[0].id.substring(0, $(this)[0].id.indexOf('_'));
		var id = $(this)[0].id.charAt($(this)[0].id.indexOf('r') + 1);
		var count = parseInt(id);
		// Change the empty stars to full yellow stars in the document accordingly
		for (var i = 1; i <= 4; i++) {
			var t = '#' + commentNum + '_star' + i;
			var cur = $(t);
			empty(cur);
		}
		for (var i = 1; i <= count; i++) {
			var t = '#' + commentNum + '_star' + i;
			var cur = $(t);
			fill(cur);
		}
		// Generate a snippet of the comment with its author and rating, for the leaderboard
		var comment = comments[$(this).parent()[0].id];
		var stars = '<p style="display: inline-block; vertical-align: middle;">' + count + '</p>';
		if (count != 0) {
			for (var i = 0; i < count; i++) {
				stars += '<div class="fullStarTable"></div>';
			}
		}
		var ellipsis = (comment.text.length > 100) ? '...' : '';
		var comRating = $('<tr class="_' + count + ' ' + comment.author + '" id="tr_' + comment.id + '">').append(
					        $('<td class="commentText">').append(
					        	comment.text.substring(0, 100) + ellipsis)).append(
					    			$('<td>').append(
					        			comment.author)).append(
					        				$('<td>').append(
					        					stars));
		// If the comment hasn't been previously rated, add it to the leaderboard
		if (ratedComments.indexOf(comment.id) == -1) {
			ratedComments.push(comment.id);
			$('#ratings').append(comRating);
		}
		// If the comment has already been rated, replace its previous leaderboard entry
		else {
			var temp = '#tr_' + comment.id;
			$(temp).replaceWith(comRating);
		}
		// Re-sort the leaderboard by descending rating count
		sort(starsDescending);
	});

	// On clicking a full star, update the comment's rating count and comment leaderboard
	container.on('click', 'div.fullStar', function() {
		// Identify the comment whose rating is being changed
		var commentNum = $(this)[0].id.substring(0, $(this)[0].id.indexOf('_'));
		var id = $(this)[0].id.charAt($(this)[0].id.indexOf('r') + 1);
		// Change the empty stars to full yellow stars in the document accordingly
		for (var i = 1; i <= 4; i++) {
			var t = '#' + commentNum + '_star' + i;
			var cur = $(t);
			empty(cur);
		}
		for (var i = 1; i < id; i++) {
			var t = '#' + commentNum + '_star' + i;
			var cur = $(t);
			fill(cur);
		}
		// Generate a snippet of the comment with its author and rating, for the leaderboard
		var comment = comments[$(this).parent()[0].id];
		var count = parseInt(id) - 1;
		var stars = '<p style="display: inline-block; vertical-align: middle;">' + count + '</p>';
		if (count != 0) {
			for (var i = 0; i < count; i++) {
				stars += '<div class="fullStarTable"></div>';
			}
		}
		var ellipsis = (comment.text.length > 100) ? '...' : '';
		var comRating = $('<tr class="_' + count + ' ' + comment.author + '" id="tr_' + comment.id + '">').append(
					        $('<td class="commentText">').append(
					        	comment.text.substring(0, 100) + ellipsis)).append(
					    			$('<td>').append(
					        			comment.author)).append(
					        				$('<td>').append(
					        					stars));
		// If the comment hasn't been previously rated, add it to the leaderboard
		if (ratedComments.indexOf(comment.id) == -1) {
			ratedComments.push(comment.id);
			$('#ratings').append(comRating);
		}
		// If the comment has already been rated, replace its previous leaderboard entry
		else {
			var temp = '#tr_' + comment.id;
			$(temp).replaceWith(comRating);;
		}
		// Re-sort the leaderboard by descending rating count
		sort(starsDescending);
	});
});
