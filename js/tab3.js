const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQe2XYbj9llkG2wUoDJDkU1QdWh2S9YStYDyZpi5kUbfdf53b-2A9QyTd6Af2SbBNqBeQ0GSw9AaKAe/pub?output=csv';

async function fetchData() {
    try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error(`Ошибка загрузки данных: ${response.status}`);
        const csvData = await response.text();
        return parseCSV(csvData);
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return null;
    }
}

function parseCSV(data) {
    const rows = data.split('\n').map(row => row.split(','));
    const headers = rows.shift();
    return rows.map(row =>
        Object.fromEntries(row.map((value, index) => [headers[index], value.trim()])));
}

function createAchievementPanels(data) {
    const container = document.getElementById('tab3');
    container.innerHTML = '';

    const groupedData = data.reduce((acc, row) => {
        if (!acc[row.Name]) acc[row.Name] = [];
        acc[row.Name].push(row);
        return acc;
    }, {});

    for (const [name, achievements] of Object.entries(groupedData)) {
        const panel = document.createElement('div');
        panel.className = 'panel';

        const title = document.createElement('h3');
        title.textContent = name;
        title.style.textAlign = 'center';
        panel.appendChild(title);

        const achievementList = document.createElement('div');
        achievementList.className = 'achievement-list';
        panel.appendChild(achievementList);

        achievements.forEach(achievement => {
            const card = document.createElement('div');
            card.className = 'achievement-card';

            const image = document.createElement('img');
            image.src = achievement.Image;
            image.alt = achievement.Title;
            card.appendChild(image);

            const text = document.createElement('p');
            text.textContent = achievement.Title;
            card.appendChild(text);

            if (achievement.Status === '1') {
                card.style.border = '2px solid green';
            } else {
                card.style.border = '2px solid red';
            }

            achievementList.appendChild(card);
        });

        container.appendChild(panel);
    }
}

async function initTab3() {
    const data = await fetchData();
    if (data) {
        createAchievementPanels(data);
    }
}

document.addEventListener('DOMContentLoaded', initTab3);
