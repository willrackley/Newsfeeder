$(document).ready(function(){
   

    //submittion of new user into database
    $("#sign-up").submit(function(event) {
        event.preventDefault();

        var newUser = {
            firstname: $("#signUpNameInput").val(),
            email: $("#signUpEmailInput").val(),
            password: $("#signUpPasswordInput").val(),
            password2: $("#signUpPasswordInput2").val(),
    }
        //shows if there are any error messages during sign up
        $.post("/app/users/sign-up", newUser).then(function(data) {
            $('.info-messages').empty();
            for (var i=0; i < data.length; i++) {
                message = '<div class="alert alert-' + data[i].type + ' alert-dismissible fade show" role="alert">';
                message += data[i].msg;
                message += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
                message += '<span aria-hidden="true">&times;</span> </button> </div>';
                $(message).appendTo('.info-messages');
            }
        });
    });

    function scrapeAllNews(){
    //scrape all news categories
    $.get('/app/scrape/entertainment', function(data){});
    $.get('/app/scrape/politics', function(data){});
    $.get('/app/scrape/sports', function(data){});
    
    }

    function getTopStories(){
        $('#articlesHeader').text('Top Stories')
        $.get('/app/articles/top-entertainment', function(data){
            var ent = data;
            createNewRow(ent);
        });
        $.get('/app/articles/top-sports', function(data){
            var sports = data;
            createNewRow(sports);
        });
        $.get('/app/articles/top-politics', function(data){
            var politics = data;
            createNewRow(politics);
        });
    }

    //takes all articles from the database and runs a function to neatly display them 
    function initializeRows(articles) { 
        $('#articles').empty();
        var articlesToAdd = [];
        for (var i = 0; i < articles.length; i++) {
            articlesToAdd.push(createNewRow(articles[i]));
        }
        $('#articles').append(articlesToAdd);
    }

    function createNewRow(articles){
        var card = $('<div class="card mb-1">');
        var cardHeader = $('<div class="card-header w-100">');
        var headerLink = $('<a href="' + articles.link + '" class="font-weight-bold h4" target="_blank">')
        headerLink.text(articles.title);
        var categoryTitle = $('<div class="mt-1 font-weight-bold">');
        categoryTitle.text(articles.category);
        var cardBody = $('<div class="card-body">');
        cardBody.text(articles.summary);
        // var buttonDiv = $('<div>');
        // buttonDiv.addClass("mt-2")
        // var addBtn = $('<button>');
        // addBtn.addClass("addBtn");
        // addBtn.attr("itemName", menuItem.name);
        // console.log("testing id " + menuItem.id)
        // addBtn.attr("key", menuItem.id);
        // addBtn.attr("itemPrice", menuItem.discount_price);
        // var addSymbol = $('<i class="fas fa-plus">');
        // addSymbol.addClass("p-2 text-dark");
        // var input = $('<input type="number" id="itemAmountInput' + menuItem.id +  '"  class="mr-3 text-center" min="1" value="1" max="10">');
        // addBtn.append(addSymbol);
        // buttonDiv.append(input);
        // buttonDiv.append(addBtn);
        // cardBody.append(buttonDiv);
        headerLink.appendTo(cardHeader);
        categoryTitle.appendTo(cardHeader);
        cardHeader.appendTo(card);
        cardBody.appendTo(card);
        $('#articles').append(card);
    }

    //scrape all news as soon as page is opened
    scrapeAllNews()
    getTopStories();
    
    $(document).on('click', '#allBtn', function(){
        $('#articlesHeader').text('All Articles')
        $('#articles').empty()
        $.get('/app/articles', function(data){
            var articles = data;
            initializeRows(articles);
        });
    });
});
