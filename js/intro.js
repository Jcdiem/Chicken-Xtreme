function startIntro() {
    //Hide the main screen
    $('main').hide();

    //Create the intro card
    $('body').append('' +
        '<div id="intro-card" title="Intro Card">' +
            '<div id="titleCardContentWrapper">' +
                '<h1 id="gameTitle">Chicken: XTREME</h1>' +
                '<p>' +
                'Welcome to the game of chickens that doesn\'t involve chickens. <br><br>' +
                'The chicken series of games is my series of projects for learning or school ' +
                'related reasons. This one is for an introductory JavaScript course. I may have gotten ' +
                'a little carried away throughout the process.<br><br>' +
                'Regardless: This game is a text-based RPG where you have to type a lot of commands. ' +
                'If that\'s your thing and you plan to stick around, click \'start\' to begin.' +
                '</p>' +
                '<br>' +
                '<button id="startGameButton">Start</button>' +
                '<br>' +
                '<button id="introAestheticToggle">Turn Off Cool Mode</button>' + //TODO: Fix aesthetic formatting
            '</div>' +
        '</div>'
    );

    //Animation stuff//

    //Setup (Get height of card, hide content, and shrink card)
    const introCardHeight = $('#intro-card').css('height');
    $('#intro-card').css('width','0%')
    $('#titleCardContentWrapper').hide();

    $('#intro-card').animate({
        width: '40%',
        height: String(introCardHeight),
        opacity: '100',
    },1500,0,function(){
        $('#titleCardContentWrapper').fadeIn(500);
    });

}

$('#startGameButton').click(function(){ //TODO: fix button not clicking
    console.debug('StartGameButton was clicked');
    $('#titleCardContentWrapper').fadeOut(500);
    $('#titleCardContentWrapper').animate({
        width: '0%',
        height: '0%',
        opacity: '0',
    },500,0,function (){
        $('main').show();
    })
})
// $('#introAestheticToggle').click(toggleAesthetic()); //TODO: Fix aesthetic button