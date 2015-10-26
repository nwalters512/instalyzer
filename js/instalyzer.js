var CLIENT_ID = "f9cbf4d718434684a482f1ca5b862579";

$(document).ready(function() {
  // Wire up click listener for submit button
  $('#submit').click(function() {
    fetchPostsForTag($('#tag-input').val());
  });

  $(document).on('click', '.post-user-details', function() {
    $("#user-details").modal('show');
    fetchUserDetails($(this).data("user-id"));
  });
});

function generateApiUrlForTagQuery(tag) {
  return "https://api.instagram.com/v1/tags/" + tag + "/media/recent?client_id=" + CLIENT_ID;
}

function generateApiUrlForUserQuery(userId) {
  return "https://api.instagram.com/v1/users/" + userId + "/?client_id=" + CLIENT_ID;
}

function fetchPostsForTag(tag) {
  $.ajax({
    url: generateApiUrlForTagQuery(tag),
    dataType: 'jsonp',
    success: function(result) {
      handlePosts(result.data);
    },
    error: function() {
      console.log("Error!");
    }
  });

  // Show loading indicator, hide the recents list
  $('#recent-posts-loading').removeClass('hidden');
  $('#recent-posts-content').addClass('hidden');
}

function handlePosts(posts) {
  console.log(posts);

  // Clear any existing content from the recent posts list
  $('#recent-posts-list').empty();
  // Hide loading indicator, show the list
  $('#recent-posts-loading').addClass('hidden');
  $('#recent-posts-content').removeClass('hidden');

  // Create templates to be filled with content from instagram
  var postTemplate = Handlebars.compile($('#template-post').html());

  // Iterate over the response data and generate html for each post
  for (var i = 0; i < posts.length && i < 20; i++) {
    var post = posts[i];

    // Generate tokens from the caption to analyze their sentiment
    var tokens = post.caption.text.replace(/[^a-zA-Z- ]+/g, '').replace('/ {2,}/', ' ').toLowerCase().split(' ');
    // Add tags as tokens to have their sentiment analyzed
    tokens.push.apply(tokens, post.tags);

    // Compute sentiment using the AFINN list
    var score = 0;
    var len = tokens.length;
    while (len--) {
      var token = tokens[len];
      if (!AFINN.hasOwnProperty(token)) continue;
      score += AFINN[token];
    }
    var sentiment;
    if (score <= -4) {
      sentiment = "very negative sentiment";
    } else if (score <= -2) {
      sentiment = "negative sentiment";
    } else if (score < 2) {
      sentiment = "neutral sentiment";
    } else if (score <= 3) {
      sentiment = "positive sentiment";
    } else {
      sentiment = "very positive sentiment";
    }
    sentiment += (" (" + score + ")");

    // Add sentiment to post object
    post.sentiment = sentiment;

    // Generate relative date and add to post object
    post.relative_created_time = moment.unix(post.created_time).fromNow();

    // Bind post details into the template
    var html = postTemplate(post);
    // Append the bound template to the list
    $('#recent-posts-list').append(html);
  }
}

function fetchUserDetails(userId) {
  $.ajax({
    url: generateApiUrlForUserQuery(userId),
    dataType: 'jsonp',
    success: function(result) {
      handleUserDetails(result.data);
    },
    error: function() {
      console.log("Error!");
    }
  });

  // Show loading indicator, hide the user details
  $('#user-details-loading').removeClass('hidden');
  $('#user-details-content').addClass('hidden');
}

function handleUserDetails(user) {
  console.log(user);

  // Clear any existing content from the recent posts list
  $('#user-details-content').empty();
  // Hide loading indicator, show the list
  $('#user-details-loading').addClass('hidden');
  $('#user-details-content').removeClass('hidden');

  // Create templates to be filled with content from instagram
  var userTemplate = Handlebars.compile($('#template-user-details').html());

  // Bind info into the template
  var html = userTemplate(user);
  // Append the bound template to the list
  $('#user-details-content').append(html);
}
