const xhr = new XMLHttpRequest();
let selectedAppId = 4;
xhr.open('GET', '/clean_steamspy_data.json', true);
xhr.onload = function() {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    const suggestions = data.applist.apps;

    const searchInput = document.getElementById('search-input');
    const suggestionsList = document.getElementById('suggestions-list');
    const infoBlock = document.querySelector('.info-blocks .info-block'); // Выбираем первый info-block

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

    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
      const selectedApp = suggestions.find(suggestion => suggestion.appid === selectedAppId);
      if (selectedApp) {
        // Получаем информацию об элементе с выбранным appid
        const appDetails = data[selectedAppId];

        // Выводим информацию в первый info-block
        infoBlock.textContent = JSON.stringify(appDetails);
      }
    });
  }
};
xhr.send();