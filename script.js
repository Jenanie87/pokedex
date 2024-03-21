let currentPokemon; // Damit von überall/allen Funktionen auf die Variable zugegriffen werden kann
let selectionPokemon;
let responseAsJSON;
let fetchedPokemon = [];

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

    for (let i = 0; i < selectionPokemon.length; i++) {
        const pokemon = selectionPokemon[i];
        let url = pokemon.url;
        let response = await fetch(url);
        currentPokemon = await response.json();
        fetchedPokemon.push(currentPokemon);

        content.innerHTML += generatePokemonCardsInnerHTML(i);
                             renderPokemonElements(currentPokemon, i);
                             changeBackgroundColor(currentPokemon, i);
    }
    mainContainer.innerHTML += generateButtonNextPokemon();
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
            <img class="img_pokemon" src="${currentPokemon.sprites.other.dream_world.front_default}" alt="pokemon" />
          </div>

        </div>`;
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
            <button onclick="renderNextPokemonInfo(responseAsJSON)" class="btn_pokemon">Next Pokèmon</button>
        </div>`;
}


function changeBackgroundColor(array, i) {
    addClassColor(array, i);
}


function addClassColor(array, i) {
    document.querySelector(`#top_card${i}`).classList.add(`bg_${array.types[0].type.name}Pokemon`);
    document.querySelector(`#pokemon_image${i}`).classList.add(`bg_${array.types[0].type.name}Pokemon`);
    if(document.querySelector(`#speaker_iconDiv${i}`)) {
        document.querySelector(`#speaker_iconDiv${i}`).classList.add(`bgText_${array.types[0].type.name}Pokemon`);
    }
    document.querySelectorAll(`#text_element${i}`).forEach((textElement) => {
        textElement.classList.add(`bgText_${array.types[0].type.name}Pokemon`);
    });
}


function openBigCard(i) {
    changeBigCard();

    let bg_container = document.querySelector('.bg_container');
    bg_container.innerHTML = generatePokemonInfosInnerHTML(i);
                             renderPokemonElements(pokemon, i);
                             changeBackgroundColor(pokemon, i);
}


function changeBigCard() {
    let bg_container = document.querySelector('.bg_container');
    bg_container.classList.toggle('d_none');
}


function doNotClose(event) {
    event.stopPropagation();
}


function generatePokemonInfosInnerHTML(i) {
    pokemon = fetchedPokemon[i];
    let urlAudio = pokemon.cries.latest;
    console.log(pokemon.abilities[0].ability.name);
    return /* HTML */ `
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
                        <h3 id="headline_about" class="pad_section">About</h3>
                        <h3 id="headline_stats" onclick="renderStatChart(pokemon)" class="pad_section">Base Stats</h3>
                    </div>
                        <div class="content_slide pad_section">
                        <!-- Slides -->
                            <table>
                                <tbody>
                                    <tr>
                                        <td class="first">Height:</td>
                                        <td class="second">${convertNumber(pokemon.height)} m</td>
                                    </tr>
                                    <tr>
                                        <td class="first">Weight:</td>
                                        <td class="second">${convertNumber(pokemon.weight)} kg</td>
                                    </tr>
                                    <tr>
                                        <td class="first">Abilities:</td>
                                        <td class="second">Ability 1</td>
                                        <td class="second">Ability 2</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>                     
                </div>              
            </div>
        </div>`;
}


function convertNumber(number) {
    return number / 10;
}


function playAudio() {
    let audioSound = document.querySelector('#audioSound');
    audioSound.play();
}


function renderStatChart(pokemon) {
    let contentStats = document.querySelector('.content_slide');
    contentStats.innerHTML = generateStatsInnerHTML();
    addClassActiveSlide();
    showStatChart(pokemon);
}


function generateStatsInnerHTML() {
    return /* HTML */`
    <canvas id="barStats" width="400" height="400"></canvas>`;
}


function addClassActiveSlide() {
    document.querySelector('#headline_stats').classList.toggle('headline_style');
}


// register plugin
Chart.register(ChartDataLabels);


function showStatChart(pokemon) {
    let ctx = document.getElementById('barStats').getContext('2d');
    Chart.defaults.font.size = 16;
    Chart.defaults.color = '#ffffff';
    Chart.defaults.font.family = "'Sigmar One', sansr-serif";
    Chart.defaults.plugins.legend.display = false;
    Chart.defaults.plugins.tooltip.enabled = false;
    barStats = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [pokemon.stats[0].stat.name, pokemon.stats[1].stat.name, pokemon.stats[2].stat.name, pokemon.stats[3].stat.name, pokemon.stats[4].stat.name, pokemon.stats[5].stat.name],
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
            plugins: [ChartDataLabels]
        }
        
      });
}


