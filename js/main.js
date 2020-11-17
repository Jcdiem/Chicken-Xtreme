$(document).ready(function () {
    console.debug('Running main');


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
    let playerChar = {
        name: 'John Doe',
        money: 0,
        statBlock: {
            level: 0,
            health: 10,
            atk: 1,
            def: 1,
        },
        locationsAllowed: {
            terminal: true,
        },
        otherValues: {
            isDev: true, //Debug value or cheating mode TODO: CATCH_ALL: SET DEV VALUES FALSE
        },

    };

    //Run the intro for those who haven't played
    if (!getVisited()) {
        startIntro();
        saveGameData(playerChar);
    }
    else playerChar = getSaveGame();

    //Handle the commands input
    $('#term-inputBox').keydown(function (e) {
        if (e.key === 'Enter') { //Only run commands after enter has been pressed
            switch (cliMode) {
                case cliModes.TERM:
                    // noinspection JSJQueryEfficiency
                    termCommand($('#term-inputBox').val());
                    break;
                case cliModes.STORY:
                    break;
                case cliModes.BATTLE:
                    break;
                default:
                    console.error('value set out of bounds of enum')
                    break;
            }
            // noinspection JSJQueryEfficiency
            $('#term-inputBox').val(''); //Clear the input box
        }
    });
});

