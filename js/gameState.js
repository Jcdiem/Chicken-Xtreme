class GameData{
    //Game stats
    newSave = true;
    curBattle = null;
    //Player stuff
    playerChar = new Character(
        'John Doe',
        {
            level: 0,
            exp: 0,
            health: 10,
            atk: 1,
            def: 1,
            acc: 90, //Everyone by default is 90% accurate
            critChance: 5,
        });
    locationsAllowed = {
        terminal: true,
        debug: true, //TODO: implement a place that only shows up after searching
    };
    otherValues = {
        isDev: true, //Debug value or cheating mode TODO: CATCH_ALL: SET DEV VALUES FALSE
    };
    curParty = [];
}





class gameManager{
    gameData;

    constructor() {
        //Check for save
        this.loadGameState();
        if(this.gameData === null){
            this.gameData = new GameData();
        }
    }


    saveGameState(){
        saveGameData(this.gameData);
    }
    loadGameState(){
        this.gameData = getSaveGame();
    }


    //Will disable the 'new' status of this account
    noLongerNew(){
        this.gameData.newSave = false;
    }

    //Update elements that may have changed during an event
    //mostly will be things that could have changed with characters in party
    postEventUpdates() {
        for (let i = 0; i < this.gameData.curParty.length; i++) this.gameData.curParty[i].doLevelUp();
        this.gameData.playerChar.doLevelUp();
    }

    currentlyBattling(){
        return !(this.gameData.curBattle === null);
    }
    startBattle(difficulty,specialValues){
        if(this.currentlyBattling()){
            throw new Error('New battle tried to start while one is going');
        }
        else this.gameData.curBattle = new BattleManager(difficulty, this, specialValues);
    }
}