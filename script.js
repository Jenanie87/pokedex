let currentPokemon; // Damit von überall/allen Funktionen auf die Variable zugegriffen werden kann
let selectionPokemon;
let responseAsJSON;
let countRender = 0;
let searchPokemons = [];
let fetchedPokemon = [];
let pokemonSpecies = [];


async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon';
    let response = await fetch(url);
    responseAsJSON = await response.json();
    selectionPokemon = responseAsJSON.results;
    renderPokemonInfo();
}


async function renderPokemonInfo() {
    let content = document.querySelector('#content');
    let mainContainer = document.querySelector('#main_container');
    content.innerHTML = '';

    for (let i = 0; i < selectionPokemon.length; i++) {
        const pokemon = selectionPokemon[i];
        let url = pokemon.url;
        let response = await fetch(url);
        currentPokemon = await response.json();
        fetchedPokemon.push(currentPokemon);
        saveInArray(currentPokemon);
        content.innerHTML += generatePokemonCardsInnerHTML(i+countRender);
        showImage(i);
        renderPokemonElements(currentPokemon, i+countRender);
        changeBackgroundColor(currentPokemon, i+countRender);

    }
    if(!document.querySelector('.btn_pokemon')) { // Prüft ob der Button noch nicht vorhanden ist und falls dieser noch nicht vorhanden ist wird die nächste Zeile ausgeführt und der Button generiert, ansonsten nicht
        mainContainer.innerHTML += generateButtonNextPokemon();
    }

}


function generatePokemonCardsInnerHTML(i) {
    return /* HTML */ `
        <div onclick="openBigCard(${i})" class="pokemon_card">
              <div id="top_card${i}" class="top_card pad_section">
            <h2 class="name">${currentPokemon['name']}</h2>
            <div class="id">#${currentPokemon['id']}</div>
            <div id="pokemon_element${i}" class="pokemon_element">
            </div>
          </div>
          <div id="pokemon_image${i}" class="pokemon_image">
          
          </div>
        </div>`;
}


function showImage(index) {
    let pokemonImage = document.querySelector(`#pokemon_image${index}`);

        if (currentPokemon.sprites.other.dream_world.front_default) {
            pokemonImage.innerHTML += `<img class="img_pokemon" src="${currentPokemon.sprites.other.dream_world.front_default}" alt="pokemon"/>`;
        } else {
            pokemonImage.innerHTML += `<img class="img_pokemon" src="${currentPokemon.sprites.other['official-artwork'].front_default}" alt="pokemon"/>`;
        } 
    }



function renderPokemonElements(array, j) {
    let pokemonElement = document.querySelector(`#pokemon_element${j}`);
    for (let i = 0; i < array['types'].length; i++) {
        const element = array['types'][i];
        pokemonElement.innerHTML += generatePokemonElementsInnerHTML(j, element);
    }
}


function generatePokemonElementsInnerHTML(j, element) {
    return /* HTML */ `
        <p id="text_element${j}" class="text_element">${element.type.name}</p>`;
}


function generateButtonNextPokemon() {
    return /* HTML */`
        <div>
            <button onclick="showNextPokemon()" class="btn_pokemon">Next Pokèmon</button>
        </div>`;
}


function changeBackgroundColor(array, i) {
    addClassColor(array, i);
}


function addClassColor(array, i) {
    document.querySelector(`#top_card${i}`).classList.add(`bg_${array.types[0].type.name}Pokemon`);
    document.querySelector(`#pokemon_image${i}`).classList.add(`bg_${array.types[0].type.name}Pokemon`);
    if (document.querySelector(`#speaker_iconDiv${i}`)) {
        document.querySelector(`#speaker_iconDiv${i}`).classList.add(`bgText_${array.types[0].type.name}Pokemon`);
    }
    if (document.querySelector(`.arrow_iconDiv${i}`)) {
        document.querySelectorAll(`.arrow_iconDiv${i}`).forEach((arrowElement) => {
            arrowElement.classList.add(`bgText_${array.types[0].type.name}Pokemon`);
        });
    }
    document.querySelectorAll(`#text_element${i}`).forEach((textElement) => {
        textElement.classList.add(`bgText_${array.types[0].type.name}Pokemon`);
    });
}


function openBigCard(i) {
    changeBigCard();
    pokemon = fetchedPokemon[i];

    let bg_container = document.querySelector('.bg_container');
    bg_container.innerHTML = generatePokemonInfosInnerHTML(pokemon, i);
    renderPokemonElements(pokemon, i);
    changeBackgroundColor(pokemon, i);
}


async function saveInArray(pokemon) {
    let url = pokemon.species.url;
    let response = await fetch(url);
    let currentPokemonSpecies = await response.json();
    pokemonSpecies.push(currentPokemonSpecies);
}


function changeBigCard() {
    if(!document.querySelector('.bg_container').classList.contains('makeSwipeable')) {
        let bg_container = document.querySelector('.bg_container');
        bg_container.classList.toggle('d_none');
    }
}


function doNotClose(event) {
    event.stopPropagation();
}


function generatePokemonInfosInnerHTML(pokemon, i) {
    let urlAudio = pokemon.cries.latest;

    return /* HTML */ `
        <div class="arrow_iconDiv arrow_iconDiv${i}"><img class="arrow_img" onclick="doNotClose(event); switchLeft(${i})" src="img/arrow_left_icon.svg" alt="arrow left"></div>
        <div onclick="doNotClose(event)" class="pokemon_card_big">
            <div id="top_card${i}" class="top_card pad_section">
                <h2 class="name">${pokemon['name']}</h2>
                <div class="id">#${pokemon['id']}</div>
                <div id="pokemon_element${i}" class="pokemon_element"></div>
            </div>
            <div id="pokemon_image${i}" class="pokemon_image">
                <img class="bigPokemon_image" src="${pokemon.sprites.other.dream_world.front_default}" alt="pokemon"/>
            </div>
            <div class="general_information pad_section">
                <div class="speaker_position">
                <div onclick="playAudio()" id="speaker_iconDiv${i}" class="speaker_iconDiv">
                    <img class="bigPokemon_speaker" src="img/play_icon.png" alt="speaker"/>
                </div>
                <audio id="audioSound">
                    <source src="${urlAudio}" type="audio/ogg">
                </audio>
                </div>
                <div class="information_content">
                    <div class="headlines">
                        <h3 id="headline_about" onclick="renderBaseInfos(${i})" class="pad_section">About</h3>
                        <h3 id="headline_stats" onclick="renderStatChart()" class="pad_section">Base Stats</h3>
                    </div>
                        <div class="content_slide">
                        <!-- Slides -->
                        </div>                     
                </div>              
            </div>
        </div>
        <div class="arrow_iconDiv arrow_iconDiv${i}"><img class="arrow_img" onclick="doNotClose(event); switchRight(${i})" src="img/arrow_right_icon.svg" alt="arrow left"></div>`;
}


function convertNumber(number) {
    return number / 10;
}


function playAudio() {
    let audioSound = document.querySelector('#audioSound');
    audioSound.volume = 0.1;
    audioSound.play();
}

function renderBaseInfos(i) {
    pokemon = fetchedPokemon[i];
    currentPokemonSpecies = pokemonSpecies[i];
    addClassActiveSlide('#headline_about');
    removeClassActiveSlide('#headline_stats');
    let contentStats = document.querySelector('.content_slide');
    contentStats.innerHTML = generateBaseInfoInnerHTML(pokemon, currentPokemonSpecies);
    renderPokemonAbilities(pokemon);
}


function generateBaseInfoInnerHTML(pokemon, currentPokemonSpecies) {
    return /* HTML */ `
        <table>
            <tbody>
                <tr>
                    <td class="first">Species:</td>
                    <td class="second">${currentPokemonSpecies.genera[7].genus}</td>
                </tr>
                <tr>
                    <td class="first">Height:</td>
                    <td class="second">${convertNumber(pokemon.height)} m</td>
                </tr>
                <tr>
                    <td class="first">Weight:</td>
                    <td class="second">${convertNumber(pokemon.weight)} kg</td>
                </tr>
                <tr>
                    <td class="first">Habitat:</td>
                    <td class="second">${currentPokemonSpecies.habitat.name}</td>
                </tr>
                <tr>
                    <td class="first">Growth-Rate:</td>
                    <td class="second">${currentPokemonSpecies.growth_rate.name}</td>
                </tr>
                <tr class="table_abilities">
                        <!-- render first ability -->
                </tr>
                <tbody class="next_abilities">
                        <!-- render next abilities for-Schleife -->
                </tbody>
            </tbody>
        </table>`;
}


function renderPokemonAbilities(pokemon) {
    let tableAbilities = document.querySelector('.table_abilities');
    let nextAbilities = document.querySelector('.next_abilities');
    tableAbilities.innerHTML += generateFirstAbilityInnerHTML(pokemon);

    for (let i = 1; i < pokemon['abilities'].length; i++) {
        const pokemonAbility = pokemon.abilities[i];
        nextAbilities.innerHTML += generateNextAbilityInnerHTML(pokemonAbility);        
    }
}


function generateFirstAbilityInnerHTML(pokemon) {
    return /* HTML */ `
        <td class="first">Abilities:</td>
        <td class="second">${pokemon.abilities[0].ability.name}</td>`;
}


function generateNextAbilityInnerHTML(pokemonAbility) {
    return /* HTML */ `
        <tr>
            <td class="first"></td>
            <td class="second">${pokemonAbility.ability.name}</td>
        </tr>`;
}


function renderStatChart() {
    let contentStats = document.querySelector('.content_slide');
    contentStats.innerHTML = generateStatsInnerHTML();
    addClassActiveSlide('#headline_stats');
    removeClassActiveSlide('#headline_about');
    showStatChart();
}


function generateStatsInnerHTML() {
    return /* HTML */`
        <canvas id="barStats"></canvas>`;
}


function addClassActiveSlide(id) {
    document.querySelector(id).classList.add('headline_style');
}


function removeClassActiveSlide(id) {
    document.querySelector(id).classList.remove('headline_style');
}


// register plugin
Chart.register(ChartDataLabels);


function showStatChart() {
    let ctx = document.getElementById('barStats').getContext('2d');
    Chart.defaults.font.size = 16;
    Chart.defaults.color = '#ffffff';
    Chart.defaults.font.family = "'Sigmar One', sansr-serif";
    Chart.defaults.plugins.legend.display = false;
    Chart.defaults.plugins.tooltip.enabled = false;
    barStats = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [pokemon.stats[0].stat.name, pokemon.stats[1].stat.name, pokemon.stats[2].stat.name, "Special-\nAttack", pokemon.stats[4].stat.name, pokemon.stats[5].stat.name],
            datasets: [{
                axis: 'y',
                data: [pokemon.stats[0].base_stat, pokemon.stats[1].base_stat, pokemon.stats[2].base_stat, pokemon.stats[3].base_stat, pokemon.stats[4].base_stat, pokemon.stats[5].base_stat],
                fill: false,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: [ChartDataLabels],
            maintainAspectRatio: false
        },
    });
}


function switchRight(index) {
    document.querySelector('.bg_container').classList.add('makeSwipeable'); // Z120-123 - Ich füge hier beim Klick auf den Pfeil eine Pseudoklasse hinzu, die in der Funktion changeBigCard() geprüft wird und nur getoggelt wird wenn die Klasse nicht vorhanden ist, damit beim Klick auf den Pfeil die BigCard nicht geschlossen wird
    index++;
    if(index >= selectionPokemon.length + countRender) {
        index = 0;
    }
    openBigCard(index);
    document.querySelector('.bg_container').classList.remove('makeSwipeable'); // Damit wieder die Klasse d_none getoggelt werden kann, wird die Pseudoklasse nach dem Ausführen der Funktion openBigCard() wieder entfernt
}


function switchLeft(index) {
    document.querySelector('.bg_container').classList.add('makeSwipeable');
    index--;
    if(index < 0) {
        index = selectionPokemon.length + countRender -1;
    }
    openBigCard(index);
    document.querySelector('.bg_container').classList.remove('makeSwipeable');
}


async function showNextPokemon() {
    let nextUrl = responseAsJSON.next;
    let response = await fetch(nextUrl);
    let nextResponseAsJson = await response.json();
    selectionPokemon = nextResponseAsJson.results;
    responseAsJSON = nextResponseAsJson;
    countRender+= 20;
    renderPokemonInfo();
}


function filterNames() {
    let search = document.querySelector('.input_searchPokemon').value;
    if(search.length > 0) {
        search = search.toLowerCase();
        renderSearchPokemon(search);
        document.querySelector('.input_searchPokemon').value = "";
    } else {
        loadPokemon();
    }
}


async function renderSearchPokemon(search) {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    selectionPokemon = responseAsJSON.results;
    for (let i = 0; i < selectionPokemon.length; i++) {
        const searchPokemon = selectionPokemon[i]['name'];
        if(searchPokemon.toLowerCase().includes(search)) {
            let searchPokemonIndex = selectionPokemon.findIndex(pokemon => pokemon.name == searchPokemon);
            searchPokemons.push(selectionPokemon[searchPokemonIndex]);
        }
    }
    selectionPokemon = searchPokemons;
    renderPokemonInfo();
    searchPokemons = [];
}