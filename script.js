function loadSites() {
    //var links = JSON.parse(links);
    for (var i = 0; i < Object.keys(links).length+1; i++) {
        for (var column in links[i]) {
            var clmn = document.getElementById("column"+String(i));
            var newEle = '';
            for (var j = 0; j < links[i].length; j++) {
                if (j === 0) {
                    newEle += '<li><h3>' + links[i][j].category + '</h3></li>';
                    //console.log(links[i][j].category);
                }
                else {
                    newEle += '<li><a href="' + links[i][j].url + '">' + links[i][j].title + '</a></li>';
                    //console.log(links[i][j].title, links[i][j].url);
                }
            }
            clmn.innerHTML = newEle;
        }
    }
}

function startTime() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML = h+":"+m+":"+s;
    var t = setTimeout(function(){startTime()},500);
}

function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

// initialize search autocompletion...
$("#search").googleSuggest({secure: true});

// one page scroll...
$(".main").onepage_scroll({
   sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
   easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                    // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
   animationTime: 500,             // AnimationTime let you define how long each section takes to animate
   pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
   updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
   beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
   afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
   loop: true,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
   keyboard: true,                  // You can activate the keyboard controls
   responsiveFallback: 700,        // You can fallback to normal page scroll by defining the width of the browser in which
                                    // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                    // the browser's width is less than 600, the fallback will kick in.
   direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
});

// HN
$.getJSON('https://hacker-news.firebaseio.com/v0/topstories.json', function(json) {
    var requests = [];

    for (var i = 0; i < 30; i++) {
      requests.push($.getJSON('https://hacker-news.firebaseio.com/v0/item/' + json[i] + '.json'));
    }

    $.when.apply($, requests).done(function() {
      var results = [].slice.call(arguments);
      var list = results.map(function(arr) {
        return '<li><a href="' + arr[0].url + '">' + arr[0].title + '</a><a class="comments" href="https://news.ycombinator.com/item?id=' + arr[0].id + '">Comments</a></li>';
      });
      var convoText = '<ol>' + list.join('') + '</ol>';
      $("#HNf").append(convoText);
    });
 });

// Google News
$('#GNf').FeedEk({
    FeedUrl : 'http://news.google.com/news?pz=1&cf=all&ned=no_no&hl=no&output=rss',
    MaxCount : 25,
    ShowDesc : false,
    ShowPubDate:false,
    DescCharacterLimit:100,
    TitleLinkTarget:'_blank'
  });

// CNN
$('#CNNf').FeedEk({
    FeedUrl : 'http://rss.cnn.com/rss/edition.rss',
    MaxCount : 25,
    ShowDesc : false,
    ShowPubDate:false,
    DescCharacterLimit:100,
    TitleLinkTarget:'_blank'
  });

// Reddit
$.getJSON('http://www.reddit.com/r/all/hot.json', function(json){
var listing = json.data.children;
var html = '<ul>\n';

for(var i=0, l=listing.length; i<l; i++) {
    var obj = listing[i].data;

    var title     = obj.title;
    var thumb     = obj.thumbnail;
    var redditurl = "http://www.reddit.com"+obj.permalink;
    var exturl    = obj.url;

    if(obj.thumbnail === 'default' || obj.thumbnail === 'nsfw' || obj.thumbnail === '')
        thumb = 'assets/default-thumb.png';

    html += '<li>';
    //html += '<a href="'+exturl+'"><img src="'+thumb+'" class="thumbimg"</a>\n';
    html += '<a href="'+exturl+'">'+title+'</a>\n';
    html += '<a class="comments" href="'+redditurl+'">Comments</a>';
    html += '</div></li>\n';
} // end for{} loop
html += '</ul>'
$("#REDf").append(html);

}); // end getJSON()

// XKCD
var xhr = new XMLHttpRequest();
xhr.open( 'GET', 'http://xkcd.com/info.0.json', true );

xhr.onload = function () {
    var link = 'http://xkcd.com/' + window.JSON.parse( xhr.responseText ).num;
    var title = window.JSON.parse( xhr.responseText ).title;
    var img = window.JSON.parse( xhr.responseText ).img;
    var alt = window.JSON.parse( xhr.responseText ).alt;
    $("#XKCD").append('<a href="' + link + '"><h3>' + title + '</h3></a><img src="' + img + '" title="' + alt + '"/>');
};

xhr.onerror = function () {
    //process error
};

xhr.send();
