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


function generateBaseInfoInnerHTML(pokemon, currentPokemonSpecies) {
    return /* HTML */ `
        <table>
            <tbody>
                <tr class="table_genus">
                        <!-- render in function showGenus() -->
                </tr>
                <tr>
                    <td class="first">Height:</td>
                    <td class="second">${convertNumber(pokemon.height)} m</td>
                </tr>
                <tr>
                    <td class="first">Weight:</td>
                    <td class="second">${convertNumber(pokemon.weight)} kg</td>
                </tr>
                <tr class="table_habitat">
                        <!-- render in function showHabitat() -->
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


function generateHabitatInnerHTML() {
    return `
        <td class="first">Habitat:</td>
        <td class="second">${currentPokemonSpecies.habitat.name}</td>`;
}


function generateGenusInnerHTML(i) {
    return `
        <td class="first">Species:</td>
        <td class="second">${currentPokemonSpecies.genera[i].genus}</td>`;
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


function generateStatsInnerHTML() {
    return /* HTML */`
        <canvas id="barStats"></canvas>`;
}


function generateErrorMessageInnerHTML() {
    return /*HTML */ `
        <div class="error_message_content">
            <h2 class=error_text>Searched Pokèmon was not found</h2>
            <div class="image_link">
                <img class="img_hidingPokemon" src="img/pokemon_meme_pikachu.gif" alt="hiding pokèmon meme">
                <a href="https://cheezburger.com/8549387776/pokemon-memes-pikachu-gif">link to the gif</a>
            </div>
        </div>`;
}


//helpfunctions


function convertNumber(number) {
    return number / 10;
}


function buttonIsNotFound() {
    return !document.querySelector('.btn_pokemon');
}


function preferredImageIsFound(id) {
    return id.sprites.other.dream_world.front_default;
}


function speakerElementIsTrue(i) {
    return document.querySelector(`#speaker_iconDiv${i}`)
}


function arrowElementsAreTrue(i) {
    return document.querySelector(`.arrow_iconDiv${i}`);
}


function certainClassIsNotPresent() {
    return !document.querySelector('.bg_container').classList.contains('makeSwipeable');
}


function endOfArrayIsReached(index) {
    return index >= selectionPokemon.length + countRender;
}


function searchedNameIsAvailable(searchPokemon, search) {
    return searchPokemon.toLowerCase().includes(search);
}


function rightLanguageIsFound(i) {
    return currentPokemonSpecies.genera[i].language.name == "en";
}


function startOfArrayIsReached(index) {
    return index < 0;
}


function InputIsBigEnough(search) {
    return search.length > 2;
}


function habitatIsTrue() {
    return currentPokemonSpecies.habitat;
}


function checkArrayLength(array, amount) {
    if(array.length  < amount) { 
        amount = array.length;
    }
    return amount;
}


function checkArrayLengthOfSearchPokemon() {
    if(searchPokemons.length > 0) {
        selectionPokemon = searchPokemons;
        renderPokemonInfo(10); // Hier werden nur 10 Pokemon angezeigt. Somit wird der Default Parameter in der renderPokemonInfo() (-> selectionPokemon.length)
        searchPokemons = [];
    } else {
        resetContainer();
        content.innerHTML += generateErrorMessageInnerHTML();
    }
}
