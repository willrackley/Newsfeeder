$(document).ready(function(){
    var commentDivSelector;
    
    $('#spinner').hide();

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
    $.get('/app/scrape/sports', function(data){
        $('#spinner').hide();
        getAllStories();   
    });
    }

    function initialDisplay() {
        $.get('/app/articles', function(data){
            var articles = data;
            if(data.length === 0){
                $('#articles').append("<h2>No articles yet, click 'Get Articles' to start browsing.</h2>");
            } else {
                getAllStories();
            }
        });
    }
    
    function getAllStories(){
        $('#articlesHeader').text('All Articles')
        $('#articles').empty();
        $.get('/app/articles', function(data){
            var articles = data;
            initializeRows(articles);
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
        var card = $('<div class="card mb-5">');
        var cardHeader = $('<div class="card-header w-100">');
        var headerLink = $('<a href="' + articles.link + '" class="font-weight-bold h4" target="_blank">')
        headerLink.text(articles.title);
        var categoryTitle = $('<div class="mt-1 font-weight-bold">');
        categoryTitle.text(articles.category);
        var cardBody = $('<div class="card-body text-left ">');
        var summary = $('<div class="text-left">');
        summary.text(articles.summary);
        var commentBtn = $('<button class="btn text-white comment mt-5" id="' + articles._id + '">');
        commentBtn.text('comment');
        var inputDiv = $('<div class="commentDiv" id="input' + articles._id + '">');
        var input = $('<textarea class="form-control mt-4" id="inputComment'+ articles._id+ '" >');
        var submitInput = $('<button class="btn btn-secondary submitComment mt-2" key="'+articles._id+ '" user="'+ articles.user + '" >');
        submitInput.text('Submit');
        var divPostedCom = $('<div class="border-top pt-3 mt-4" id="postComment' + articles._id + '" >');
    
        $.get('/app/comments/', function(data){
            for(var i=0; i < data.length; i++){
                for(var j=0; j < articles.comments.length; j++){
                    if(data[i]._id === articles.comments[j]){
                        divPostedCom.append($('<div class="border mt-2 p-3 w-75 commentborder addedComments" id="deleteBox'+data[i]._id+'"><div class="text-right"><button class="btn deleteBtn text-white" id="'+data[i]._id+'">x</button></div>'+data[i].user+':<br>'+ data[i].body +'</div>'));
                    }
                }
            }
        })
       
        headerLink.appendTo(cardHeader);
        categoryTitle.appendTo(cardHeader);
        cardHeader.appendTo(card);
        summary.appendTo(cardBody);
        input.appendTo(inputDiv);
        submitInput.appendTo(inputDiv);
        inputDiv.appendTo(cardBody);
        commentBtn.appendTo(cardBody);
        divPostedCom.appendTo(cardBody);
        cardBody.appendTo(card);
        $('#articles').append(card);
        $('.commentDiv').hide();
    }

   initialDisplay()

    $(document).on('click', '#getBtn', function(){
        $('#spinner').show();
        scrapeAllNews()
    });

    $(document).on('click', '#allBtn', function(){
        
        getAllStories();
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
        var selector = '#' + $(this).attr('id');
        $(commentDivSelector).show();
        $(selector).hide();
    });

    //click event to submit a comment to an article
    $(document).on('click', '.submitComment', function(){
        
        var inputSelector = '#inputComment' + $(this).attr("key");
        commentDivSelector = '#input' + $(this).attr("key");
        var commentBtnSelector = '#' + $(this).attr("key");
        var user = $(this).attr("user");
        var newComment = { body: $(inputSelector).val(), article_id: $(this).attr("key")};
        var postDivSelector = '#postComment' +  $(this).attr("key");

        $(commentBtnSelector).show();

        $.post("/app/comments/submit", newComment, function(data) {
            $(inputSelector).val('');
            $(commentDivSelector).hide();
        });

        $.get('/app/comments/my-comments', function(comments){
            //grab the latest comment to display right away in the DOM
            var index = comments.length - 1;
            $(postDivSelector).append($('<div class="border mt-2 p-3 w-75 commentborder addedComments" id="deleteBox'+ comments[index]._id +'"><div class="text-right"><button class="btn deleteBtn text-white" id="'+ comments[index]._id +'">x</button></div>'+ comments[index].user +':<br>'+ comments[index].body +'</div>'));
        })
    });

    $(document).on('click', '.deleteBtn', function(){
        var deleteSelector = $(this).attr('id');
        var deleteCommentBox = '#deleteBox' + $(this).attr('id');
        console.log(deleteCommentBox)
        
        $.ajax({
            type: "DELETE",
            url: "/app/comments/delete/" + deleteSelector
        });

        $(deleteCommentBox).remove();
    });

    //to add fav section, make a new model 'fav' with the same properties as article
    //make a route to find article by an id
    //make a fav button with the aricle id as the id
    // on click get the articl by button id and then post to fav route 
    //voila

});
