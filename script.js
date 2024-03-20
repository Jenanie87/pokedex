let currentPokemon; // Damit von überall/allen Funktionen auf die Variable zugegriffen werden kann
let selectionPokemon;

// async function loadPokemon() {
//     let url = `https://pokeapi.co/api/v2/pokemon/25`;
//     let response = await fetch(url);
//     currentPokemon = await response.json();
//     renderPokemonInfo();
//     testLoadPokemon();
// }


async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon';
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    selectionPokemon = responseAsJSON.results;
/*     let currentUrl = selectionPokemon[0].url; */
    renderPokemonInfo();
}


async function renderPokemonInfo() {
    let content = document.querySelector('#content');

    for (let i = 0; i < selectionPokemon.length; i++) {
        const pokemon = selectionPokemon[i];
        let url = pokemon.url;
        let response = await fetch(url);
        currentPokemon = await response.json();
        console.log(currentPokemon);

        content.innerHTML += generatePokemonInfoInnerHTML(i);
        renderPokemonElements(i);
        changeBackgroundColor(i);
    }
}


function generatePokemonInfoInnerHTML(i) {
    return /* HTML */ `
        <div class="pokemon_card">
              <div id="top_card${i}" class="top_card pad_section">
            <h2 class="name">${currentPokemon['name']}</h2>
            <div class="id">#${currentPokemon['id']}</div>
            <div id="pokemon_element${i}" class="pokemon_element">
            </div>
          </div>
          <div id="pokemon_image${i}" class="pokemon_image">
            <img class="img_pokemon" src="${currentPokemon.sprites.other.dream_world.front_default}" alt="pokemon" />
          </div>
<!--           <div class="general_information pad_section"></div> -->
        </div>`;
}


function renderPokemonElements(j) {
    let pokemonElement = document.querySelector(`#pokemon_element${j}`);

    for (let i = 0; i < currentPokemon['types'].length; i++) {
        const element = currentPokemon['types'][i];
        pokemonElement.innerHTML += generatePokemonElementsInnerHTML(j, element); 
    }
}


function generatePokemonElementsInnerHTML(j, element) {
    return /* HTML */ `
        <p id="text_element${j}" class="text_element">${element.type.name}</p>`;
}
// get elements : currentPokemon.types[0].type.name


function changeBackgroundColor(i) {
    addClassColor(i);
}


function addClassColor(i) {
    document.querySelector(`#top_card${i}`).classList.add(`bg_${currentPokemon.types[0].type.name}Pokemon`);
    document.querySelector(`#pokemon_image${i}`).classList.add(`bg_${currentPokemon.types[0].type.name}Pokemon`);
    document.querySelectorAll(`#text_element${i}`).forEach((textElement) => {
        textElement.classList.add(`bgText_${currentPokemon.types[0].type.name}Pokemon`);
    });
}