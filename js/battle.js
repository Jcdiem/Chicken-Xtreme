console.debug('Battle scripts loading');

//Battle handling

class BattleManager { //One created for each battle run
    enemyList = [];
    difficulty = -1;

    constructor(difficulty=-1,
                specialValues={
                    combatants: 1, //Default 1 combatant
                    monsterSpecials: {}, //No special values for monsters on default
                }){
        //Error handling
        if(difficulty < 0) throw new Error('No difficulty provided to BattleManager')


        this.difficulty = difficulty;
    }

    addEnemy(enemy){
        this.enemyList.push(enemy);
        termOutput('Enemy ' + enemy.name + ' has joined the battle!');
    }


    //DIRECT COMMAND TO PROPER METHOD
    curBattleCommand(input){
        const args = String(input).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        switch (cmd){
            default:
                termOutput('Unrecognized battle command, try \'help\' if you\'re stuck.');
                break;
        }
    }

    //Debug methods

    test(){
        console.debug(this.enemyTest);
    }

}