function setupSearch() {
  // Set search engine for submit
  switch (engine.toLowerCase()) {
    case 'duckduckgo':
      var action = 'https://www.'+engine+'.com/';
      break;
    case 'google':
      var action = 'https://www.'+engine+'.com/search';
  }
  document.getElementById('search_form').action = action;
  document.getElementById('search').placeholder = engine;
  document.getElementById('search').focus();

  document.getElementById('search_form').addEventListener("submit", function(event) {
    if (document.getElementById('search').value.startsWith("http://") || document.getElementById('search').value.startsWith("https://") || document.getElementById('search').value.startsWith("www.")) {
      event.preventDefault();
      window.location = document.getElementById('search').value;
    }
  });

  // initialize search autocompletion...
  $("#search").googleSuggest({secure: true});
}

function loadSites() {
    for (var i = 0; i < Object.keys(links).length+1; i++) {
        for (var column in links[i]) {
            var clmn = document.getElementById("column"+String(i));
            var newEle = '';
            for (var j = 0; j < links[i].length; j++) {
                if (j === 0) {
                    newEle += '<h3>' + links[i][j].category + '</h3><ul class="list" id="list1">';
                }
                else {
                    newEle += '<li><a href="' + links[i][j].url + '">' + links[i][j].title + '</a></li>';
                }
            }
            clmn.innerHTML = '</ul>' + newEle;
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
