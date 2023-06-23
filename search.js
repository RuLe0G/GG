let selectedAppId = 4;

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
        });
        suggestionsList.appendChild(li);
      });
    });
  }
};
xhr.send();

const searchButton = document.getElementById('search-button');
const infoBlock = document.querySelector('.info-blocks .info-block');

searchButton.addEventListener('click', () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/clean_steamspy_data.json', true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      const selectedApp = data.find(app => app.appid === selectedAppId);

      if (selectedApp) {
        const appInfo = `
          <p><strong>Name:</strong> ${selectedApp.name}</p>
          <p><strong>Developer:</strong> ${selectedApp.developer}</p>
          <p><strong>Publisher:</strong> ${selectedApp.publisher}</p>
          <p><strong>Positive Reviews:</strong> ${selectedApp.positive}</p>
          <p><strong>Negative Reviews:</strong> ${selectedApp.negative}</p>
        `;
        infoBlock.innerHTML = appInfo;
      } else {
        infoBlock.textContent = 'No data available for the selected app ID.';
      }
    }
  };
  xhr.send();
});