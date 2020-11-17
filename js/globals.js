console.debug('Globals loaded');

function toggleAesthetic(){
    console.info('Game theme has been changed');
    //TODO: Add if statement checking for current state to allow for toggling back to dark mode
    //TODO: Make light-mode look cool too (steal from solarized-light)
    $('html').css("background-color", "white");
    $('html').css("color", "black");
    $('.intro-card').css("background-color", "white");
    // $('html').css("background-color", "white");
}