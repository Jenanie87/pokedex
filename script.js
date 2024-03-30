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


async function renderPokemonInfo(amount = selectionPokemon.length) { // amount = selectionPokemon.length -> Wenn kein Argument übergeben wird, wird der Default Parameter gewählt (hier selectionPokemon.length), ansonsten wird der Parameter (hier: selectionPokemon.length) überschrieben und eine andere Länge ausgewählt
    let content = document.querySelector('#content');
    let mainContainer = document.querySelector('#main_container');

    for (let i = 0; i < amount; i++) {
        const pokemon = selectionPokemon[i];
        let url = pokemon.url;
        let response = await fetch(url);
        currentPokemon = await response.json();
        fetchedPokemon.push(currentPokemon);
        saveInArray(currentPokemon); // Damit die Daten in About schneller geladen werden
        content.innerHTML += generatePokemonCardsInnerHTML(i+countRender);
        showImage(i + countRender);
        renderPokemonElements(currentPokemon, i+countRender);
        changeBackgroundColor(currentPokemon, i+countRender);

    }
    if(buttonIsNotFound()) { // Prüft ob der Button noch nicht vorhanden ist und falls dieser noch nicht vorhanden ist wird die nächste Zeile ausgeführt und der Button generiert, ansonsten nicht
        mainContainer.innerHTML += generateButtonNextPokemon();
    }
}


function showImage(index) {
    let pokemonImage = document.querySelector(`#pokemon_image${index}`);

        if (preferredImageIsFound(currentPokemon)) {
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


function changeBackgroundColor(array, i) {
    addClassColor(array, i);
}


function addClassColor(array, i) {
    document.querySelector(`#top_card${i}`).classList.add(`bg_${array.types[0].type.name}Pokemon`);
    document.querySelector(`#pokemon_image${i}`).classList.add(`bg_${array.types[0].type.name}Pokemon`);
    if (speakerElementIsTrue(i)) {
        document.querySelector(`#speaker_iconDiv${i}`).classList.add(`bgText_${array.types[0].type.name}Pokemon`);
    }
    if (arrowElementsAreTrue(i)) {
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
    console.log(pokemon);
    let bg_container = document.querySelector('.bg_container');
    bg_container.innerHTML = generatePokemonInfosInnerHTML(pokemon, i);
    showBigImage(i, pokemon);   
    renderPokemonElements(pokemon, i);
    changeBackgroundColor(pokemon, i);
}


function showBigImage(index, pokemon) {
    let pokemonImage = document.querySelector(`#pokemon_image${index}`);

        if (preferredImageIsFound(pokemon)) {
            pokemonImage.innerHTML += `<img class="bigPokemon_image" src="${pokemon.sprites.other.dream_world.front_default}" alt="pokemon"/>`;
        } else {
            pokemonImage.innerHTML = `<img class="bigPokemon_image" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="pokemon"/>`;
        } 
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
        hideScrollbar();
    }
}


function hideScrollbar() {
    let body = document.querySelector('body');
    body.classList.toggle('hide_scrollbar');
}


function doNotClose(event) {
    event.stopPropagation();
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
    showHabitat();
    showGenusEN();
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


function renderStatChart() {
    let contentStats = document.querySelector('.content_slide');
    contentStats.innerHTML = generateStatsInnerHTML();
    addClassActiveSlide('#headline_stats');
    removeClassActiveSlide('#headline_about');
    showStatChart();
}


function addClassActiveSlide(id) {
    document.querySelector(id).classList.add('headline_style');
}


function removeClassActiveSlide(id) {
    document.querySelector(id).classList.remove('headline_style');
}


function switchRight(index) {
    document.querySelector('.bg_container').classList.add('makeSwipeable'); // Z114-118 - Ich füge hier beim Klick auf den Pfeil eine Pseudoklasse hinzu, die in der Funktion changeBigCard() geprüft wird und nur getoggelt wird wenn die Klasse nicht vorhanden ist, damit beim Klick auf den Pfeil die BigCard nicht geschlossen wird
    index++;
    if(endOfArrayIsReached(index)) {
        index = 0;
    }
    openBigCard(index);
    document.querySelector('.bg_container').classList.remove('makeSwipeable'); // Damit wieder die Klasse d_none getoggelt werden kann, wird die Pseudoklasse nach dem Ausführen der Funktion openBigCard() wieder entfernt
}


function switchLeft(index) {
    document.querySelector('.bg_container').classList.add('makeSwipeable');
    index--;
    if(startOfArrayIsReached(index)) {
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
    if(InputIsBigEnough(search)) {
        search = search.toLowerCase();
        renderSearchPokemon(search);
        document.querySelector('.input_searchPokemon').value = "";
        document.querySelector('.btn_pokemon').classList.add('d_none'); // versteckt den button bei den searchPokemon
        document.querySelector('.btn_reset').classList.remove('d_none');
    } 
}


function resetPokemnon() {
    resetContainer()
    resetArrays()
    document.querySelector('.btn_pokemon').classList.remove('d_none');
    loadPokemon();
    document.querySelector('.btn_reset').classList.add('d_none');
}


async function renderSearchPokemon(search) {
    resetArrays()
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    selectionPokemon = responseAsJSON.results;
    resetContainer()
    for (let i = 0; i < selectionPokemon.length; i++) {
        const searchPokemon = selectionPokemon[i]['name'];
        if(searchedNameIsAvailable(searchPokemon, search)) {
            let searchPokemonIndex = selectionPokemon.findIndex(pokemon => pokemon.name == searchPokemon);
            searchPokemons.push(selectionPokemon[searchPokemonIndex]);
        }
    }
    selectionPokemon = searchPokemons;
    renderPokemonInfo(10); // Hier werden nur 10 Pokemon angezeigt. Somit wird der Default Parameter in der renderPokemonInfo() (-> selectionPokemon.length)
    searchPokemons = [];
}


function resetArrays() {
    fetchedPokemon = [];
    pokemonSpecies = [];
    countRender = 0;
}


function resetContainer() {
    let content = document.querySelector('#content');
    content.innerHTML = '';
}


function showHabitat() {
    let pokemonHabitat = document.querySelector('.table_habitat');
    if(habitatIsTrue()) {
        pokemonHabitat.innerHTML += generateHabitatInnerHTML();
    } 
}


function showGenusEN() {
    let pokemonGenus = document.querySelector('.table_genus')
    for (let i = 0; i < currentPokemonSpecies.genera.length; i++) {
            if(rightLanguageIsFound(i)) {
                pokemonGenus.innerHTML += generateGenusInnerHTML(i);
            } 
    }
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
            labels: [pokemon.stats[0].stat.name, pokemon.stats[1].stat.name, pokemon.stats[2].stat.name, ['Special-', 'Attack'], ['Special-', 'Defense'], pokemon.stats[5].stat.name],
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
            maintainAspectRatio: false
        },
    });
}

