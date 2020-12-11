console.debug('Battle scripts loading');

//Battle handling

class BattleManager { //One created for each battle run
    curID = 0;
    goodList = []; //People on the player team
    enemyList = []; //People not on the player team
    difficulty = -1;
    gameState;
    goodDead = 0;
    enemyDead = 0;
    battling = true;

    constructor(difficulty=-1, gameState,
                specialValues={
                    combatants: 1, //Default 1 combatant
                    monsterSpecials: {}, //No special values for monsters on default
                }){
        //Error handling
        if(difficulty < 0) throw new Error('No difficulty provided to BattleManager')

        //Nab the gameState reference
        this.gameState = gameState;

        //Add the player to his team
        //This means player should always be 0
        this.addGood(this.gameState.gameData.playerChar);

        //Add an enemy for number of combatants
        for(let i = 1; i <= specialValues.combatants; i++){
            this.addEnemy(new Monster(difficulty,specialValues.monsterSpecials));
        }



        this.difficulty = difficulty;
    }

    //Used in case a minion is summoned, or some other event might want to add a fighter mid-fight
    addEnemy(enemy){
        this.enemyList.push({enemy: enemy, id: this.curID});
        this.curID++;
        termOutput('A level ' + enemy.statBlock.level + ' ' + enemy.name + ' has joined the battle!');
    }
    addGood(good){
        this.goodList.push({character: good, id: this.curID});
        this.curID++;
    }

    //To be run after every action
    checkBattleStatus(){
        const enemyCount = this.enemyList.length;

        for(let i = 0; i < enemyCount; i++){
            if (this.enemyList[i].statBlock.health <= 0){
                //TODO: Implement a more extravagant death
                this.enemyDead += 1;
                termOutput(this.enemyList[i].name + ' has fallen in combat!');
                this.doWin();
            }
        }
    }

    doWin(){
        //TODO: More to winning
        this.battling = false;
        termOutput('You have won the combat!');
    }

    //Battle input handler
    curBattleCommand(cmd, args){


        if(this.battling){
            switch (cmd) {
                case 'help':
                    termOutput('Please replaces all instances of [ ] with just what it describes')
                    termOutput('    -Example: \'Attack [enemy]\' is just \'Attack 1\'');
                    termOutput('Currently Available commands are: ');
                    termOutput('--Clear / Cls: Clear the screen')
                    termOutput('--Status: The stats of everyone in the fight, with opponent numbers');
                    termOutput('--Atk [enemy] / Attack [enemy]: Will attack numbered opponent');
                    termOutput('--Inv: List all of the items in your inventory');
                    termOutput('--Use [item]: use a numbered item from your inventory (IN PROGRESS)');
                    termOutput('--Skills: List the skills you have equipped, for reference');
                    termOutput('--Skill [skill] [enemy]: Use a skill (In progress)');
                    termOutput('--Fort / Fortify: Use your turn to increase def until next turn');
                    //Each new command is a separate output
                    break;

                case 'cls':
                case 'clear':
                    $('#term-output').empty();
                    termOutput(cmd);
                    break;

                case 'stat':
                case 'status':
                    this.battleStats();
                    break;

                case 'atk':
                case 'attack':
                    this.attack(0, Number(args[0]))
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
        else termOutput('The battle has ended, please refresh the page for another during testing mode.')
    }


    //Command functions
    battleStats(){
        //Print friendlies first
        for(let i = 0; i < this.goodList.length; i++){
            //Craft a human readable string of name, and basic stats
            let out = '';
            out += this.goodList[i].id + ' - '; //Add the id
            out += 'Lvl ' + this.goodList[i].character.statBlock.level + ' '; //Add the level
            out += this.goodList[i].character.name + ': '; // Add the Name
            out += this.goodList[i].character.statBlock.health + ' hp | '; //Health
            out += this.goodList[i].character.statBlock.atk + ' atk | '; //Attack
            out += this.goodList[i].character.statBlock.def + ' def | '; //Defence
            termOutput(out);
        }

        //Print enemies second
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

    attack(caster= -1, target = -1){
        const friendlyCasting = !(this.goodList.findIndex(character => character.id === caster) === -1);
        if(caster === -1 || target === -1) throw new Error('Attack called without caster or target');
        else if(friendlyCasting){//Caster is a friendly

            let targetIndex = this.enemyList.findIndex(enemy => enemy.id === target);
            let casterIndex = this.goodList.findIndex(char => char.id === caster);

            //Check for errors in indices
            //Caster has already been checked in order to get in here
            if(targetIndex === -1){//Invalid target
                console.warn('Target was outside of bounds');
                termOutput('Number '+ target +' does not match an enemy.')
            }
            else{//Start seeing what the outcome is
                //Hit goes through if Accuracy is more than (Random + Enemy Defence)
                if(this.goodList[casterIndex].character.statBlock.acc > (Math.trunc(Math.random() * 10) + this.enemyList[targetIndex].enemy.statBlock.def)) {
                    //If the attack hits
                    let damage = Math.round((this.goodList[casterIndex].character.statBlock.acc / 100) * this.goodList[casterIndex].character.statBlock.atk)
                    this.enemyList[targetIndex].enemy.statBlock.health -= damage;
                    //TODO: Implement critical hits and defence

                    termOutput(this.goodList[casterIndex].character.name + ' hits, doing ' + damage + ' damage, leaving ' + this.enemyList[targetIndex].enemy.name + ' at ' + this.enemyList[targetIndex].enemy.statBlock.health + 'hp!')
                }
                else{
                    termOutput(this.enemyList[casterIndex].character.name + ' goes in for the attack on '+ this.enemyList[targetIndex].enemy.name +', but misses!');
                }


            }
        } else { //The caster is not a player

        }


    }
    //Debug methods
    //
    // test(){
    //     console.debug(this.enemyTest);
    // }

}