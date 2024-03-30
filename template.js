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