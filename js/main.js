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
    }
    let cliMode = cliModes.STORY; //TODO: Move cliMode to be handled by buttons/cur screen
    if (!cliMode) { //Error checking to make sure the Enum works correctly
        throw new Error('cliModes ENUM is borked')
    }

    //Player setup
    const basePlayer ={ //TODO: Implement leveling properly
        name: 'John Doe',
        money: 0,
        statBlock: {
            level: 0,
            exp: 0,
            health: 10,
            atk: 1,
            def: 1,
        },
        locationsAllowed: {
            terminal: true,
            debug: true, //TODO: implement a place that only shows up after searching
        },
        otherValues: {
            isDev: true, //Debug value or cheating mode TODO: CATCH_ALL: SET DEV VALUES FALSE
        },

    };


    let playerChar = getSaveGame();
    //Run the intro for those who haven't played
    if (!getVisited() || playerChar === null) {
        startIntro();
        playerChar = basePlayer;
        saveGameData(playerChar);
    }
    updateStats(playerChar);

    //Handle the commands input
    $('#term-inputBox').keydown(function (e) {
        if (e.key === 'Enter') { //Only run commands after enter has been pressed
            console.debug('Terminal used in climode ' + cliMode);
            updateStats(playerChar);

            switch (cliMode) {
                case cliModes.TERM:
                    // noinspection JSJQueryEfficiency
                    termCommand($('#term-inputBox').val());
                    break;
                case cliModes.STORY:
                    storyTerm($('#term-inputBox').val());
                    break;
                case cliModes.BATTLE:
                    battleCommand($('#term-inputBox').val());
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

