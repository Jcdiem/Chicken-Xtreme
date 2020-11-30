console.debug('Monster library loading');

class Monster {
    styleList;
    difficulty;
    monster;


    //Create an enemy, given a difficulty and level
    //Will randomly select stat-block and name based upon input
    constructor(difficulty=-1,
                specialValues={
                    //Possible special values
                    //Currently none for monsters
                    //Modifiers for bosses and quest-like stuff will go here
                }) {
        //Error handling
        if(difficulty < 0) throw new Error('No difficulty provided to Monster')
        else this.difficulty = difficulty;

        this.styleList = {
            RANDOM: 0,
            TANK: 1,
            GCANNON: 2, //Glass cannon
            CAUTIOUS: 3,
            SUPPORT: 4,
        }

        const nameList = {
            //Oh yeah, it's alliteration time
            easy: ['Slow Socket', 'Mundane Metadata', 'Truncated Text', 'Dilapidated Deltas'],
            medium: ['Competent Clock', 'Considerate Cronjob', 'Technical Text', 'Serious Script'],
            avian: ['Gadget Goose', 'Techno Duck', 'Bass Boss: Bawk'], //Not a chicken
        }

        //Level is 1 for each difficulty (starting at easy) give or take 5
        const lvl = ((this.difficulty + 1) + Math.round((Math.random() * 10) % 6));
        //Atk and Def = level * ( a random number between 5 and 1)
        const eAtk = Math.round(lvl * (((Math.random() * 10) % 5) + 1));
        const eDef = Math.round(lvl * (((Math.random() * 10) % 5) + 1));
        //Generate HP based upon having base 10 per level and give random up to 14.
        const eHealth = ((lvl * 10) + Math.round(((Math.random() * 100) % 15)));

        //NAME: Generate a random number between 0 and length to get name
        //STYLE: If easy, will always be 'random', otherwise will choose intent based on --
        // what its good at (Def or atk etc.)
        let eName = 'error';
        let style = this.styleList.RANDOM;
        switch (this.difficulty) { //TODO: Make a naming function so that upper bound (10) is dynamic
            case Difficulty.EASY:
                eName = nameList.easy[Math.trunc((Math.random() * 10) % nameList.easy.length)];
                break;
            case Difficulty.MEDIUM:
                eName = nameList.medium[Math.trunc((Math.random() * 10) % nameList.medium.length)];
                style = this.decideStyle({atk: eAtk, def: eDef, hp: eHealth});
                break;
            case Difficulty.AVIAN:
                eName = nameList.avian[Math.trunc((Math.random() * 10) % nameList.avian.length)];
                style = this.decideStyle({atk: eAtk, def: eDef, hp: eHealth});
                break;
        }
        if (eName === 'error') {
            throw new Error('Random enemy name was not generated');
        }


        this.monster = {
            name: eName,
            statBlock: {
                level: lvl,
                health: eHealth,
                atk: eAtk,
                def: eDef,
            },
            style: style,
            // specialValues, Not currently used
        }
    }


    //Takes in a stat block of {atk,def,hp} and determines which it is best at
    //Will return a style based on best attribute
    decideStyle() {
        //TODO: Finish implementing selection
        //LOGIC: Have precedence for an active play-style
        //So, check in order of atk->def->health
        return this.styleList.RANDOM;
    }
}