let tl = new TimelineMax();

// event listener for form
$('#search').submit(function(event){
  let $searchText = document.querySelector('#searchField').value;
  console.log($searchText);
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
      console.log(results);
      let keys = Object.keys(results);
      let $resultsElement = document.createElement('section');
      $resultsElement.className = 'results';
      for (let i = 0; i < keys.length; i++){
        // create result container
        let $result = document.createElement('div');
        $result.className = 'result';
        // create result text elements
        let title = document.createElement('h3');
        let snip = document.createElement('p');
        let link = document.createElement('a');
        // add data from response
        title.innerHTML = results[i].title;
        snip.innerHTML = results[i].snippet;
        link.innerHTML = 'Read More';
        link.setAttribute('href', `https://en.wikipedia.org/wiki/${results[i].title}`);
        // append elements
        $result.appendChild(title);
        $result.appendChild(snip);
        $result.appendChild(link);
        $resultsElement.appendChild($result);
      }
      $('#results').html($resultsElement);

      // fade in one by one
      tl.staggerTo(".result", 0.3, { // 0.05 = length of each animation event
        opacity: 1,
        y: 0,
      }, 0.05)

    }

  });
})
