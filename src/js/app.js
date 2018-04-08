let tl = new TimelineMax
let resultsDiv = document.querySelector('#results');

function noResults(){
  let noResultsMessage = `
  <h1>Nothing found</h1>
  <h3>try again</h3>`;
  resultsDiv.innerHTML = noResultsMessage;
}

// send req
$('#search').submit(function(event){
  let $searchText = document.querySelector('#searchField').value;
  event.preventDefault();
  let formData = {
    action: 'query',
    origin: '*', // get round cross origin request being blocked
    list: 'search',
    srsearch: $searchText,
    format: 'json',
  }
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php",
    data: formData,
    dataFormat: 'json',
    success: function(data){
      let results = data.query.search;
      if (data.query.searchinfo.totalhits == 0) noResults();
      else {
        let resultFigures = [];
        for (let i = 0; i < results.length; i++){
          let fullSnippet;
          if (results[i].snippet[0] !== results[i].snippet[0].toUpperCase() ) {
            fullSnippet = '....' + results[i].snippet;
          }
          else fullSnippet = results[i].snippet;
          resultFigures.push(`
            <figure class="result">
              <div class="frame">
                <img src="moose.jpg">
                <h3>${results[i].title}</h3>
              </div>
              <figcaption>
                <p>${fullSnippet}</p>
                <a target="_blank" href="https://en.wikipedia.org/wiki/${results[i].title}">Full Article</a>
              </figcaption>
            </figure>`);
        };

        // build string
        let allFigures = '';
        for (let i = 1; i < resultFigures.length; i++) {
          allFigures += resultFigures[i];
        };
        // write to DOM
        resultsDiv.innerHTML = allFigures;

        // fade in one by one
        let resultsArray = Array.from(document.querySelectorAll('.result'));
        tl.staggerTo(resultsArray, 0.2, { // 0.05 = length of each animation event
          opacity: 1,
          x: 0,
        }, 0.05);
      }
    } // end success
  }); // end AJAX
}); // end form submit
