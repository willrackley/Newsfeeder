$(document).ready(function(){
    var commentDivSelector;

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
        var summary = $('<div>');
        summary.text(articles.summary);
        var commentBtn = $('<button class="btn btn-secondary comment mt-3" id="' + articles._id + '">');
        commentBtn.text('comment');
        var inputDiv = $('<div class="commentDiv" id="input' + articles._id + '">');
        var input = $('<textarea class="form-control mt-4" id="inputComment'+ articles._id+ '" >');
        var submitInput = $('<button class="btn btn-secondary submitComment mt-2" key="'+articles._id+ '" >');
        submitInput.text('Submit');
        headerLink.appendTo(cardHeader);
        categoryTitle.appendTo(cardHeader);
        cardHeader.appendTo(card);
        summary.appendTo(cardBody);
        input.appendTo(inputDiv);
        submitInput.appendTo(inputDiv);
        inputDiv.appendTo(cardBody);
        commentBtn.appendTo(cardBody);
        cardBody.appendTo(card);
        $('#articles').append(card);
        $('.commentDiv').hide();
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

    $(document).on('click', '#allBtn', function(){
        $('#articlesHeader').text('All Articles')
        $('#articles').empty()
        $.get('/app/articles', function(data){
            var articles = data;
            initializeRows(articles);
        });
    });

    $(document).on('click', '#sportsBtn', function(){
        $('#articlesHeader').text('Sports News')
        $('#articles').empty()
        $.get('/app/articles', function(data){
            var sportsArticles = data;
            for(var i=0; i < sportsArticles.length; i++){
                if(sportsArticles[i].category === "sports"){
                    createNewRow(sportsArticles[i]);
                }
            }
        });
    });

    $(document).on('click', '#entBtn', function(){
        $('#articlesHeader').text('Entertainment News')
        $('#articles').empty()
        $.get('/app/articles', function(data){
            var entArticles = data;
            for(var i=0; i < entArticles.length; i++){
                if(entArticles[i].category === "entertainment"){
                    createNewRow(entArticles[i]);
                }
            }
        });
    });

    $(document).on('click', '#politicsBtn', function(){
        $('#articlesHeader').text('Political News')
        $('#articles').empty()
        $.get('/app/articles', function(data){
            var polArticles = data;
            for(var i=0; i < polArticles.length; i++){
                if(polArticles[i].category === "politics"){
                    createNewRow(polArticles[i]);
                }
            }
        });
    });

    $(document).on('click', '.comment', function(){
        commentDivSelector = '#input' + this.id;
        $(commentDivSelector).show();
    });

    $(document).on('click', '.submitComment', function(){
        
        var inputSelector = '#inputComment' + $(this).attr("key");
        commentDivSelector = '#input' + $(this).attr("key");
        var newComment = { body: $(inputSelector).val(), article_id: $(this).attr("key")}
        
        $.post("/app/comments/submit", newComment, function(data) {
            $(inputSelector).val('');
            $(commentDivSelector).hide();
        });
        
    });


});
