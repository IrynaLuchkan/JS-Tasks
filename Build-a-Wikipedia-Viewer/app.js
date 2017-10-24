window.onload = function () {

    document.getElementById('wiki-search').addEventListener("click", runSearch);
    var infoFromWiki=document.getElementById("info-from-wiki");

    function runSearch() {
        var searchTerm = document.getElementById('search-term').value;

        var searchUrl="https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json";

        return fetch(searchUrl, {
            method: 'GET',
            type: 'cors',
            dataType: "json",
            headers: {
             'Accept': 'application/json',
             'content-type': 'application/json',
             'Content-Desposition': 'filename="api-result.js"',
             'Access-Control-Allow-Origin':'*',
             "cache-control": "no-cache",
             "postman-token": "dc9d5055-ce4c-50df-50a3-1de2b260ea34"
            },
        })
        .then(response => {            
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1) {                      
               return response.json()
            } else {
               throw new TypeError()
           }
        })
        .then (wikiInfo => {
            var i, amount=wikiInfo[1].length;            
            infoFromWiki.innerHTML='';
            for (i=0; i<amount; i++) {
                infoFromWiki.innerHTML+=`<li><a href=${wikiInfo[3][i]}>${wikiInfo[1][i]}</a><br>${wikiInfo[2][i]}</li>`;
            }
        })
        .catch((error) => {
            console.dir(error);
        })
    }
};
