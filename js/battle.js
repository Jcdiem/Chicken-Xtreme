console.debug('Battle scripts loading');

//Battle handling

class BattleManager { //One created for each battle run
    enemyTest;
    difficulty;

    constructor(difficulty=-1,
                specialValues={
                    combatants: 1, //Default 1 combatant
                    monsterSpecials: {}, //No special values for monsters on default
                }){
        //Error handling
        if(difficulty < 0) throw new Error('No difficulty provided to BattleManager')


        this.difficulty = difficulty;

        this.enemyTest = new Monster(difficulty)
    }

    test(){
        console.debug(this.enemyTest)
    }
}

function battleCommand(input){
    const args = String(input).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase();

    switch (cmd){
        default:
            throw new Error('Improper command given to battleCommand');
            termOutput('Unrecognized command, try \'help\' if you\'re stuck.');
            break;
    }
}
