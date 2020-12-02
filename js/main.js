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
    const gameState = new gameManager();

    //Run the intro for those who haven't played
    if (gameState.gameData.newSave) {
        startIntro();
        gameState.noLongerNew();
        gameState.saveGameState();
    }
    updateStats(gameState.playerChar);

    //Handle the commands input
    $('#term-inputBox').keydown(function (e) {
        if (e.key === 'Enter') { //Only run commands after enter has been pressed
            const input = $('#term-inputBox').val();
            const args = String(input).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();

            //Update character stats every time that they submit a command
            updateStats(gameState.playerChar);

            //Print player command out to terminal for niceness
            termOutput('>'+input);



            switch (cliMode) {
                case cliModes.TERM:
                    termCommand(cmd, args);
                    break;
                case cliModes.STORY:
                    storyTerm(cmd, args);
                    break;
                case cliModes.BATTLE:
                    //Make sure there is a current battle
                    if(gameState.currentlyBattling()){
                        gameState.gameData.curBattle.curBattleCommand(cmd, args);
                    }
                    else throw new Error('ERROR: no battle, but in battle mode');
                    break;
                case cliModes.EXPLORE:
                    exploreCommand(cmd, args)
                    break;
                default:
                    throw new Error('value set out of bounds of enum')
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
        gameState.startBattle(1);
    });
    $('#dbgForceSave').click(function (){
        gameState.saveGameState();
    });
    $('#dbgDeleteSave').click(function (){
       restartSave();
    });
});

