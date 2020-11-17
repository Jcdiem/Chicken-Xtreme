$(document).ready(function () {
    //Scripts to be added
    // let scriptArray = [];
    //
    // const globalScript = document.createElement('script');
    // globalScript.src = 'js/globals.js';
    // scriptArray.push(globalScript);
    //
    // const termScript = document.createElement('script');
    // termScript.src = 'js/term.js';
    // scriptArray.push(termScript);
    //
    // const introScript = document.createElement('script');
    // introScript.src = 'js/intro.js';
    // scriptArray.push(introScript);
    //
    //
    //
    //
    //
    // scriptArray.forEach(item => document.head.appendChild(item));
    //End scripts to be added
    console.debug('Running main');



    $('#term-inputHeader').text('[/]$')
    const cliModes = {
        TERM: 0,
        BATTLE: 1,
        STORY: 2,
    }
    let newUser = true; //TODO: Have a session cookie to store progress, so it doesn't reset every time
//Setup for initial users



    if (newUser) {
        startIntro();
    }

    let cliMode = cliModes.STORY; //TODO: Move cliMode to be handled by buttons/cur screen
    if (!cliMode) {
        throw new Error('cliModes ENUM is borked')
    }

    $('#term-inputBox').keydown(function (e) {
        if (e.key === 'Enter') {
            switch (cliMode) {
                case cliModes.TERM:
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
            $('#term-inputBox').val('');
        }
    });
});

