class gameManager{
    newSave;
    playerChar;
    constructor() {


        //Default to being a new save
        this.newSave = true;

        //Default to the basic player char
        this.playerChar = { //TODO: Implement leveling properly
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
    }

    //Will disable the 'new' status of this account
    noLongerNew(){
        this.newSave = false;
    }
}