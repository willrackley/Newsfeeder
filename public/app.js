$('#passErrorDiv').hide();

$.getJSON("/app/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'> <br />" + '<a href="' + data[i].link + '">' + data[i].title + '</a>' + "</p>");
    }
});

$('#signupBtn').on("click", function(){
    if($('#signUpPasswordInput').val() !== $('#signUpPasswordInput2').val()) {
        $('#passErrorDiv').text("passwords do not match");
        $('#passErrorDiv').show(); 
        return;
    }
});