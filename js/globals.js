console.debug('Globals loaded');

//Aesthetic Handling

function toggleAesthetic(){
    console.info('Game theme has been changed');
    //TODO: Add if statement checking for current state to allow for toggling back to dark mode
    //TODO: Make light-mode look cool too (steal from solarized-light)
    const lightStyle = {
        'background-color': 'white',
        'color': 'black',

    }
    $('html').css(lightStyle);
    $('.intro-card').css(lightStyle);
}


//Cookie Handling

function getVisited(){
    const dCookie = decodeURIComponent(document.cookie);
    const ca = dCookie.split(';');

    if(ca[0] === 'visited=true'){
        return true;
    }
    else return false;
}

//Save game handling

function saveGameData(playerObject){//Data saved with stringify
    console.debug('saving game');
    window.localStorage.setItem('chickenXSave', JSON.stringify(playerObject));
}

function getSaveGame(){
    return JSON.parse(window.localStorage.getItem('chickenXSave'));
}

function restartSave(defaultPlayer){
    console.debug('deleting save');
    window.localStorage.removeItem('chickenXSave');
    location.reload(true);
}

const Difficulty = {
    EASY: 0,
    MEDIUM: 1,
    HARD: 2,
    AVIAN: 3,
}

function updateStats(info={
    name: 'John Doe',
    money: 0,
    statBlock: {
        level: 0,
        exp: 0,
        health: 10,
        atk: 1,
        def: 1,
    }

}){
    $('#statBar-plyExp').text('XP: ' + info.statBlock.exp + '%');
    $('#statBar-plyHP').text('HP: ' + info.statBlock.health);
    $('#statBar-plyName').text(info.name);
    $('#statBar-plyLvl').text('Lvl: ' + info.statBlock.level);
    $('#statBar-plyMoney').text('Cxn: ' + info.money);

}