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
    console.log(pokemon.stats);
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
                <div class="speaker_icon">
                    <img class="bigPokemon_speaker" src="img/speaker_icon.svg" alt="speaker"/>
                </div>
                <div class="information_content">stats</div>
            </div>
        </div>`;
}