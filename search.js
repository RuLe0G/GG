let selectedAppId = 4;
let hltb = require('howlongtobeat');
let hltbService = new hltb.HowLongToBeatService();


const xhr = new XMLHttpRequest();
xhr.open('GET', '/steam_data.json', true);
xhr.onload = function() {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    const suggestions = data.applist.apps;

    const searchInput = document.getElementById('search-input');
    const suggestionsList = document.getElementById('suggestions-list');

    searchInput.addEventListener('input', () => {
      const userInput = searchInput.value.toLowerCase();
      const filteredSuggestions = suggestions.filter(suggestion => suggestion.name.toLowerCase().startsWith(userInput));

      suggestionsList.innerHTML = '';

      const limitedSuggestions = filteredSuggestions.slice(0, 10);

      limitedSuggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion.name;
        li.addEventListener('click', () => {
          searchInput.value = suggestion.name;
          selectedAppId = suggestion.appid;
          suggestionsList.innerHTML = '';
          hltbService.detail(selectedAppId).then(result => console.log(result)).catch(e => console.error(e));
        });
        suggestionsList.appendChild(li);
      });
    });
  }
};
xhr.send();