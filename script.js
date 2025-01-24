document.addEventListener("DOMContentLoaded", () => {
    const colors = [
        "Red", "Green", "Blue", "Indigo", "Orange", "Yellow",
        "Violet", "Grey", "Maroon", "Black", "Olive", "Cyan",
        "Pink", "Magenta", "Tan", "Teal"
    ];

    const genres = [
        {
            title: "Action/Adventure Games",
            games: [
                "The Legend of Zelda",
                "God of War",
                "The Last of Us",
                "Grand Theft Auto V",
                "The Witcher"
            ]
        },
        {
            title: "Shooter Games",
            games: [
                "Call of Duty: Modern Warfare",
                "Apex Legends",
                "Overwatch",
                "Valorant"
            ]
        },
        {
            title: "Fighting Games",
            games: [
                "Street Fighter",
                "Mortal Kombat",
                "Tekken",
                "SuperSmashBrosMetroid"
            ]
        },
        {
            title: "Battle Royale Games",
            games: [
                "Fortnite",
                "Apex Legends"
            ]
        },
        {
            title: "Simulation Games",
            games: [
                "The Sims",
                "Animal Crossing",
                "SimCity"
            ]
        },
        {
            title: "Mobile Games",
            games: [
                "Clash of Clans",
                "Among Us"
            ]
        }
    ];

    const randomNameOptions = [
        "Random names", "No names", "English names", "German names", "Irish names", "Scottish names",
        "Celtic names", "French names", "Spanish names", "Latin names", "Hindu names", "Italian names",
        "Australian names"
    ];

    const nameTypes = [
        "No Name Type", "Alliteration", "Vowels as numbers", "Silly numbers", "Silly numbers + vowels as numbers",
        "Epithet/descriptive - 'x the y'"
    ];

    const lengths = [
        "Any length", "Max 12 Characters - Xbox", "Max 15 Characters - Xbox 360", "Max 16 Characters - Playstation"
    ];

    const generateButton = document.getElementById("generateBtn");
    const output = document.getElementById("output");

    generateButton.addEventListener("click", () => {
        generateButton.style.display = "none";
        showGenderSelection();
    });

    function showGenderSelection() {
        output.innerHTML = `
            <div style="display: flex; flex-direction: column;">
                <p>Select a gender:</p>
                <button id="maleBtn">Male</button>
                <button id="femaleBtn">Female</button>
                <button id="noGenderBtn">No Gender</button>
            </div>
        `;
        document.getElementById("maleBtn").addEventListener("click", () => showColorSelection("Male"));
        document.getElementById("femaleBtn").addEventListener("click", () => showColorSelection("Female"));
        document.getElementById("noGenderBtn").addEventListener("click", () => showColorSelection("No Gender"));
    }

    function showColorSelection(gender) {
        output.innerHTML = `
            <div style="display: flex; flex-direction: column;">
                <p>Choose a color for your gamer tag:</p>
                ${colors.map(color => `<button class="colorBtn">${color}</button>`).join(" ")}
            </div>
        `;
        document.querySelectorAll(".colorBtn").forEach(button => {
            button.addEventListener("click", e => showGameGenres(gender, e.target.textContent));
        });
    }

    function showGameGenres(gender, color) {
        output.innerHTML = `
            <div style="display: flex; flex-direction: column;">
                <p>Selected Color: ${color}</p>
                <p>Select a genre:</p>
                ${genres.map((genre, index) => `<button class="genreBtn" data-index="${index}">${genre.title}</button>`).join(" ")}
            </div>
        `;
        document.querySelectorAll(".genreBtn").forEach(button => {
            button.addEventListener("click", e => {
                const genreIndex = e.target.getAttribute("data-index");
                const genre = genres[genreIndex];
                showGameSelection(gender, color, genre);
            });
        });
    }

    function showGameSelection(gender, color, genre) {
        output.innerHTML = `
            <div style="display: flex; flex-direction: column;">
                <p>${genre.title} Selected</p>
                <p>Choose a game:</p>
                ${genre.games.map(game => `<button class="gameBtn">${game}</button>`).join(" ")}
            </div>
        `;
        document.querySelectorAll(".gameBtn").forEach(button => {
            button.addEventListener("click", e => showNameOptions(gender, color, genre.title, e.target.textContent));
        });
    }

    function showNameOptions(gender, color, genre, game) {
        output.innerHTML = `
            <div style="display: flex; flex-direction: column;">
                <p>${game} Selected</p>
                <p>Set your preferences:</p>
                <label>Name Type:</label>
                <select id="nameType">${nameTypes.map(type => `<option>${type}</option>`).join("")}</select>
                <label>Length:</label>
                <select id="nameLength">${lengths.map(length => `<option>${length}</option>`).join("")}</select>
                <label>Random Name Style:</label>
                <select id="randomName">${randomNameOptions.map(option => `<option>${option}</option>`).join("")}</select>
                <label>Must Include:</label>
                <input type="text" id="mustInclude" />
                <button id="generateNames">Generate</button>
            </div>
        `;
        document.getElementById("generateNames").addEventListener("click", () => {
            const nameType = document.getElementById("nameType").value;
            const nameLength = document.getElementById("nameLength").value;
            const randomName = document.getElementById("randomName").value;
            const mustInclude = document.getElementById("mustInclude").value;
            showGeneratedNames(gender, color, genre, game, nameType, nameLength, randomName, mustInclude);
        });
    }

    function showGeneratedNames(gender, color, genre, game, nameType, nameLength, randomName, mustInclude) {
        const generatedNames = generateGamerTags(gender, color, game, mustInclude);
        output.innerHTML = `
            <div style="display: flex; flex-direction: column;">
                <p>${game} Gamer Tags:</p>
                ${generatedNames.map(name => `<p>${name}</p>`).join("")}
                <button id="restart">Start Over</button>
            </div>
        `;
        document.getElementById("restart").addEventListener("click", () => {
            output.innerHTML = '';
            document.getElementById('generateBtn').style.display = 'block';
        });
    }

    function generateGamerTags(gender, color, game, mustInclude) {
        const adjectives = ["Swift", "Silent", "Deadly", "Brave", "Mighty", "Cunning", "Fierce", "Epic"];
        const nouns = ["Warrior", "Hunter", "Savior", "Guardian", "Ranger", "Mage", "Knight", "Assassin"];

        return Array.from(new Set(Array.from({ length: 20 }, () => {
            const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
            const noun = nouns[Math.floor(Math.random() * nouns.length)];
            const randomNum = Math.floor(Math.random() * 9999) + 1;
            return `${color}${adjective}${noun}${randomNum}${mustInclude ? `-${mustInclude}` : ""}`;
        })));
    }
});
