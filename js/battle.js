console.debug('Battle scripts loading');

//Battle handling

class BattleManager { //One created for each battle run
    enemyList = [];
    difficulty = -1;
    gameState;

    constructor(difficulty=-1, gameState,
                specialValues={
                    combatants: 1, //Default 1 combatant
                    monsterSpecials: {}, //No special values for monsters on default
                }){
        //Error handling
        if(difficulty < 0) throw new Error('No difficulty provided to BattleManager')

        //Nab the gameState reference
        this.gameState = gameState;

        //Add an enemy for number of combatants
        for(let i = 1; i <= specialValues.combatants; i++){
            this.addEnemy(new Monster(difficulty,specialValues.monsterSpecials));
        }

        this.difficulty = difficulty;
    }

    //Used in case a minion is summoned, or some other event might want to add a fighter mid-fight
    addEnemy(enemy){
        this.enemyList.push({enemy: enemy, id: this.enemyList.length});
        termOutput('A level ' + enemy.statBlock.level + ' ' + enemy.name + ' has joined the battle!');
    }


    //Battle input handler
    curBattleCommand(cmd, args){


        switch (cmd){
            case 'help':
                termOutput('Please replaces all instances of [ ] with just what it describes')
                termOutput('Example: \'Attack [enemy]\' is just \'Attack 1\'');
                termOutput('Currently Available commands are: ');
                termOutput('Clear / Cls: Clear the screen')
                termOutput('Status: The stats of everyone in the fight, with opponent numbers');
                termOutput('Atk [enemy] / Attack [enemy]: Will attack numbered opponent');
                termOutput('Inv: List all of the items in your inventory');
                termOutput('Use [item]: use a numbered item from your inventory (IN PROGRESS)');
                termOutput('Skills: List the skills you have equipped, for reference');
                termOutput('Skill [skill] [enemy]: Use a skill (In progress)');
                termOutput('Fort / Fortify: Use your turn to increase def until next turn');
                //Each new command is a separate output
                break;

            case 'cls':
            case 'clear':
                $('#term-output').empty();
                termOutput(input);
                break;

            case 'stat':
            case 'status':
                this.battleStats();
                break;

            case 'atk':
            case 'attack':
                break;

            case 'inv':
            case 'inventory':
                break;

            case 'use':
                break;

            case 'skills':
                break;

            case 'skill':
                break;

            case 'fort':
            case 'fortify':
                break;

            default:
                termOutput('Unrecognized battle command, try \'help\' if you\'re stuck.');
                break;
        }
    }


    //Command functions
    battleStats(){
        for(let i = 0; i < this.enemyList.length; i++){
            //Craft a human readable string of name, and basic stats
            let out = '';
            out += this.enemyList[i].id + ' - '; //Add the id
            out += 'Lvl ' + this.enemyList[i].enemy.statBlock.level + ' '; //Add the level
            out += this.enemyList[i].enemy.name + ': '; // Add the Name
            out += this.enemyList[i].enemy.statBlock.health + ' hp | '; //Health
            out += this.enemyList[i].enemy.statBlock.atk + ' atk | '; //Attack
            out += this.enemyList[i].enemy.statBlock.def + ' def | '; //Defence
            termOutput(out);
        }
    }

    //Debug methods
    //
    // test(){
    //     console.debug(this.enemyTest);
    // }

}