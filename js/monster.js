console.debug('Monster library loading');

class Monster {
    difficulty;
    name = '';
    statBlock = {
            level: -1,
            health: -1,
            atk: -1,
            def: -1,
        };
    style = -1;
    nameList = {
        //Oh yeah, it's alliteration time
        easy: ['Slow Socket', 'Mundane Metadata', 'Truncated Text', 'Dilapidated Deltas'],
        medium: ['Competent Clock', 'Considerate Cronjob', 'Technical Text', 'Serious Script'],
        avian: ['Gadget Goose', 'Techno Duck', 'Bass Boss: Bawk'], //Not a chicken
    }
    styleList = {
        RANDOM: 0,
        TANK: 1,
        GCANNON: 2, //Glass cannon
        CAUTIOUS: 3,
        SUPPORT: 4,
    }



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


        //Level is 1 for each difficulty (starting at easy) give or take 5
        this.statBlock.level = ((this.difficulty + 1) + Math.round((Math.random() * 10) % 6));
        //Atk and Def = level * ( a random number between 5 and 1)
        this.statBlock.atk = Math.round(this.statBlock.level * (((Math.random() * 10) % 5) + 1));
        this.statBlock.def = Math.round(this.statBlock.level * (((Math.random() * 10) % 5) + 1));
        //Generate HP based upon having base 10 per level and give random up to 14.
        this.statBlock.health = ((this.statBlock.level * 10) + Math.round(((Math.random() * 100) % 15)));

        //NAME: Generate a random number between 0 and length to get name
        //STYLE: If easy, will always be 'random', otherwise will choose intent based on --
        // what its good at (Def or atk etc.)
        this.name = 'error';
        this.style = this.styleList.RANDOM;
        switch (this.difficulty) { //TODO: Make a naming function so that upper bound (10) is dynamic
            case Difficulty.EASY:
                this.name = this.nameList.easy[Math.trunc((Math.random() * 10) % this.nameList.easy.length)];
                break;
            case Difficulty.MEDIUM:
                this.name = this.nameList.medium[Math.trunc((Math.random() * 10) % this.nameList.medium.length)];
                this.style = this.decideStyle();
                break;
            case Difficulty.AVIAN:
                this.name = this.nameList.avian[Math.trunc((Math.random() * 10) % this.nameList.avian.length)];
                this.style = this.decideStyle();
                break;
        }
        if (this.name === 'error') {
            throw new Error('Random enemy name was not generated');
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