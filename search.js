var appid = 4;
var name = "Dota 2";
var developer = "Valve";
var publisher = "Valve";
var date = "July 9, 2013";
var positive = 1646531;
var negative = 351922;
var timeToBeat = "Dota 2, 691,77";
var score = "100";
var link = "https://www.metacritic.com/game/pc/dota-2";
var SteamDBRating = "100";


const xhr = new XMLHttpRequest();
xhr.open('GET', 'merged.json', true);
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

          const selectedApp = suggestions.find(app => app.appid === selectedAppId);
          if (selectedApp) {
            var appid = selectedApp.appid;
            var name = selectedApp.name;
            var developer = selectedApp.developer;
            var publisher = selectedApp.publisher;
            var date = selectedApp.date;
            var positive = selectedApp.positive;
            var negative = selectedApp.negative;
            var timeToBeat = selectedApp.timeToBeat;
            var score = selectedApp.score;
            var link = selectedApp.link;
            var SteamDBRating = selectedApp.SteamDBRating;

            // Вывод данных в первый info-block
            const infoBlock = document.querySelector('.info-blocks .info-block');
            const appInfo = `
              <p><strong>App ID:</strong> ${appid}</p>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Developer:</strong> ${developer}</p>
              <p><strong>Publisher:</strong> ${publisher}</p>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Positive Reviews:</strong> ${positive}</p>
              <p><strong>Negative Reviews:</strong> ${negative}</p>
              <p><strong>Time to Beat:</strong> ${timeToBeat}</p>
              <p><strong>Score:</strong> ${score}</p>
              <p><strong>Link:</strong> <a href="${link}" target="_blank">${link}</a></p>
              <p><strong>SteamDB Rating:</strong> ${SteamDBRating}</p>
            `;
            infoBlock.innerHTML = appInfo;
          }
        });
        suggestionsList.appendChild(li);
      });
    });
  }
};
xhr.send();