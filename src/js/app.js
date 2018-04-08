let tl = new TimelineMax();

// event listener for form
$('#search').submit(function(event){
  let $searchText = document.querySelector('#searchField').value;
  event.preventDefault();
  let $formData = {
    action: 'query',
    // get round cross origin request being blocked
    origin: '*',
    list: 'search',
    srsearch: $searchText,
    format: 'json',
  }
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php",
    data: $formData,
    dataFormat: 'json',
    success: function(data){
      let results = data.query.search;
      let keys = Object.keys(results);
      let resultFigures = [];
      for (let i = 0; i < keys.length; i++){
        resultFigures.push(`
          <figure class="result">
            <h3>${results[i].title}</h3>
            <figcaption>
              <p>${results[i].snippet}</p>
              <a target="_blank" href="https://en.wikipedia.org/wiki/${results[i].title}">Full Article</a>
            </figcaption>
          </figure>`);
      };

      let target = document.querySelector('#results');

      let allFigures = '';
      for (let i = 0; i < resultFigures.length; i++) {
        allFigures += resultFigures[i];
      };
      // insert into DOM
      target.innerHTML = allFigures;

      // fade in one by one
      let resultsArray = Array.from(document.querySelector('#results').querySelectorAll('.result'));
      console.log(document.querySelector('#results').querySelectorAll('.result'));
      console.log(resultsArray);
      tl.staggerTo(resultsArray, 0.2, { // 0.05 = length of each animation event
        opacity: 1,
        x: 0,
      }, 0.05);

    } // end success
  }); // end AJAX
}); // end form submit
