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