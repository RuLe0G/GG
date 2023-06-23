const xhr = new XMLHttpRequest();
let selectedAppId = 4;
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
        });
        suggestionsList.appendChild(li);
      });
    });
  }
};
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
  const infoBlock = document.querySelector('.info-blocks .info-block');
  const appDetailsUrl = `https://steamspy.com/api.php?request=appdetails&appid=${selectedAppId}`;

  // Выполнение AJAX-запроса к URL appDetailsUrl
  const appDetailsXhr = new XMLHttpRequest();
  appDetailsXhr.open('GET', appDetailsUrl, true);
  appDetailsXhr.onload = function() {
    if (appDetailsXhr.status === 200) {
      const appDetails = JSON.parse(appDetailsXhr.responseText);
      infoBlock.textContent = JSON.stringify(appDetails);
    }
  };
  appDetailsXhr.send();
});
xhr.send();

