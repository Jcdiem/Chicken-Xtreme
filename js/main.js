$(document).ready(function () {
    console.debug('Running main');


    //Page setup
    $('#main-screen').tabs();


    //Set up the ENUM for command modes
    $('#term-inputHeader').text('[/]$')
    const cliModes = {
        TERM: 0,
        BATTLE: 1,
        STORY: 2,
        EXPLORE: 3,
    }
    let cliMode = cliModes.STORY; //TODO: Move cliMode to be handled by buttons/cur screen
    if (!cliMode) { //Error checking to make sure the Enum works correctly
        throw new Error('cliModes ENUM is borked')
    }

    //THE HANDLER OF ALL THAT IS SACRED
    //Contains the whole current game state, exploration data, player data, battles, stats etc.
    //Basically a game database
    const gameState = (!getVisited() || getSaveGame() === null) ?
        new gameManager() : //If there is no save, then make new game manager
        getSaveGame();      //If there is a save, use it

    //Run the intro for those who haven't played
    if (gameState.newSave) {
        startIntro();
        gameState.noLongerNew();
        saveGameData(gameState);
    }
    updateStats(gameState.playerChar);

    //Handle the commands input
    $('#term-inputBox').keydown(function (e) {
        if (e.key === 'Enter') { //Only run commands after enter has been pressed
            console.debug('Terminal used in climode ' + cliMode);
            updateStats(gameState.playerChar);

            switch (cliMode) {
                case cliModes.TERM:
                    // noinspection JSJQueryEfficiency
                    termCommand($('#term-inputBox').val());
                    break;
                case cliModes.STORY:
                    storyTerm($('#term-inputBox').val());
                    break;
                case cliModes.BATTLE:
                    //Make sure there is a current battle
                    if(curBattle){
                        curBattle.curBattleCommand($('#term-inputBox').val());
                    }
                    else throw new Error('ERROR: no battle, but in battle mode');
                    break;
                case cliModes.EXPLORE:
                    exploreCommand($('#term-inputBox').val())
                    break;
                default:
                    console.error('value set out of bounds of enum')
                    break;
            }
            // noinspection JSJQueryEfficiency
            $('#term-inputBox').val(''); //Clear the input box
        }
    });

    //Debug
    $('#dbgBattleBtn').click(function (){
       cliMode = cliModes.BATTLE;
    });
    $('#dbgStoryBtn').click(function (){
        cliMode = cliModes.STORY;
    });
    $('#dbgTermBtn').click(function (){
        cliMode = cliModes.TERM;
    });
    $('#dbgLvl1BattleBtn').click(function (){
        //TODO: Force start a battle
    });
    $('#dbgForceSave').click(function (){
        saveGameData(playerChar);
    });
    $('#dbgDeleteSave').click(function (){
       restartSave();
    });
});

