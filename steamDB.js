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
