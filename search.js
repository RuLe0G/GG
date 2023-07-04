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

            const infoBlock1 = document.querySelector('.info-blocks .info-block:nth-of-type(1)');
            const appInfo1 = `
              <h2>INFO</h2>
              <p><strong>App ID:</strong> ${appid}</p>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Developer:</strong> ${developer}</p>
              <p><strong>Publisher:</strong> ${publisher}</p>
              <p><strong>Date:</strong> ${date}</p>
            `;
            infoBlock1.innerHTML = appInfo1;

            const infoBlock2 = document.querySelector('.info-blocks .info-block:nth-of-type(2)');
            const steamReviews = getSteamReviewsText(SteamDBRating);
            const appInfo2 = `
              <h2>Steam Reviews</h2>
              <p><strong>Positive Reviews:</strong> ${positive}</p>
              <p><strong>Negative Reviews:</strong> ${negative}</p>
              <p><strong>SteamDB Rating:</strong> ${SteamDBRating}</p>
              <p><strong>Steam Rating:</strong> ${steamReviews}</p>
            `;
            infoBlock2.innerHTML = appInfo2;

            const infoBlock3 = document.querySelector('.info-blocks .info-block:nth-of-type(3)');
            const appInfo3 = `
              <h2>Metacritic Review</h2>
              <p><strong>Score:</strong> ${score}</p>
              <p><strong>Link:</strong> <a href="${link}" target="_blank">${link}</a></p>
            `;
            infoBlock3.innerHTML = appInfo3;

            const infoBlock4 = document.querySelector('.info-blocks .info-block:nth-of-type(4)');
            const timeToBeatArr = timeToBeat.split('||');
            const timeToBeatText = timeToBeatArr.map(time => `${time.trim()} hours`).join('<br>');
            const appInfo4 = `
              <h2>HowLongToBeat</h2>
              <p>${timeToBeatText}</p>
            `;
            infoBlock4.innerHTML = appInfo4;
          }
        });
        suggestionsList.appendChild(li);
      });
    });
  }
};
xhr.send();

const hoursInput = document.getElementById('hours');
const category1Select = document.getElementById('category1');
const category2Select = document.getElementById('category2');
const resultInput = document.getElementById('result');

function calculateResult() {
  const hours = parseFloat(hoursInput.value);
  const modifier1 = parseFloat(category1Select.value);
  const modifier2 = parseFloat(category2Select.value);

  const result = (hours * 10) * modifier1 * modifier2;
  resultInput.value = result.toFixed(2);
}

hoursInput.addEventListener('input', calculateResult);
category1Select.addEventListener('change', calculateResult);
category2Select.addEventListener('change', calculateResult);


function getSteamReviewsText(rating) {
  const steamRating = parseFloat(rating);
  if (steamRating >= 80) {
    return 'Positive';
  } else if (steamRating >= 70) {
    return 'Mostly Positive';
  } else if (steamRating >= 40) {
    return 'Mixed';
  } else if (steamRating >= 20) {
    return 'Mostly Negative';
  } else {
    return 'Negative';
  }
}

const themeToggle = document.querySelector('#theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});
