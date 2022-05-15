$(document).ready(function() {
    var requestConf = {
    method: 'GET',
    url: 'http://api.tvmaze.com/shows'
};

$(document).on('click', '.shows-id', function(event){
    event.preventDefault();
    $('#showList').hide();
    $('#show').empty();

    let presentlink = $(this);
    let presentUrl = presentlink.context.href;
    //console.log(presentUrl, 'presentUrl')
    

    var requestConf = {
        method: 'GET',
        url : presentUrl
    }

    $.ajax(requestConf).then(function (resText){
       console.log(resText, 'resText')
        let h1=`<h1>${resText.name}</h1>`;
        $('#show').append(h1);
        
        let imgTest;
        if(resText.image)
        imgTest=`<img src="${resText.image.medium}" alt="${resText.name}"/>`;
        else
        imgTest=`<img src="public/img/no_image.jpeg" alt="${resText.name}"/>`;
        $('#show').append(imgTest);
        let dl = '<dl id="show-details"> </dl>';
        $('#show').append(dl);
        
        let lang ="<dt>Language</dt>";
        $('#show-details').append(lang);
        let langValue;
        if(resText.language)
        langValue=`<dd>${resText.language}</dd>`;
        else
        langValue='<dd>N/A</dd>';
        $('#show-details').append(langValue);

        //Test genre
        genre="<dt>Genres</dt>";
        $('#show-details').append(genre);
        let listofGenre;
        if(resText.genres.length!=0)
        {
            genreValue='<dd><ul id="genre-id"></ul></dd>';
            $('#show-details').append(genreValue);
            for(let arr of resText.genres){
                
                listofGenre=`<li>${arr}</li>`;
                $('#genre-id').append(listofGenre);
            }

        }
        else{
            genreValue='<dd>N/A</dd>';
            $('#show-details').append(genreValue);
        }
        
        rating = '<dt>Average Rating</dt>';
        $('#show-details').append(rating);
        if(resText.rating.average)
            ratingVal=`<dd>${resText.rating.average}</dd>`;
        else
            ratingVal='<dd>N/A</dd>';
        $('#show-details').append(ratingVal);
        
        network="<dt>Network</dt>";
        $('#show-details').append(network);
        if(resText.network)
        networkVal=`<dd>${resText.network.name}</dd>`;
        else
        networkVal='<dd>N/A</dd>';
        $('#show-details').append(networkVal);
        
        summary="<dt>Summary</dt>";
        $('#show-details').append(summary);
        if(resText.summary){
            resText.summary=resText.summary.replace(/(&nbsp;|<([^>]+)>)/ig,"");    
            summaryText=`<dd>${resText.summary}</dd>`;
        }
        else
        summaryText='<dd>N/A</dd>';
        $('#show-details').append(summaryText);
        $('#show').show();
        $('#homeLink').show();
        
    });
});



$.ajax(requestConf).then(function (responseMessage){
    let li;
    //console.log(responseMessage, 'responseMessage')
    // if(!responseMessage){
    //     let p="<p>No search term has been provided</p>";
    //     $('#showList').append(p);
    // $('#showList').val('');
    // }
    for(let arr of responseMessage){
        //console.log(arr, 'arr')
        li=`<li> <a class="shows-id" href="${arr._links.self.href}"> ${arr.name} </a></li>`;
         $("#showList").append(li);    
    }
    //console.log(showList, 'showList')
    $("#showList").show();
});

})

$('#searchForm').submit(function(event){
    event.preventDefault();
    $('p').empty();
    $('#show').hide();
    $('#showList').hide();
    $('#homeLink').show();
    $('#showList').empty();
    let searchTerm=$('#search_term').val();
    if(!searchTerm.trim()){
    let p="<p>No search term has been provided</p>";
    $('#searchForm').append(p);
    $('#search_term').val('');
    }
    if(searchTerm.length == 0){
    let p="<p>Blank spaces provided in Search term, please provide the Show name again</p>";
    $('#searchForm').append(p);
    $('#search_term').val('');
    }
    else{
        let requestConf = {
            method: 'GET',
            url: "http://api.tvmaze.com/search/shows?q="+searchTerm
        };
    

    $.ajax(requestConf).then(function (result){
        let li;
        let count = 0
        //console.log(result, "result")
        for(let arr of result){
            li=`<li> <a class="shows-id" href="${arr.show._links.self.href}"> ${arr.show.name} </a></li>`;
            $("#showList").append(li);    
            count = 1
        }
        if(count == 0)
        {
            let p="<p>Show searched does not match any in the list</p>";
            $('#showList').append(p);
            $('#showList').val('');
            
        }
        $('#showList').show();
        $('#search_term').val('');
    });
}
});