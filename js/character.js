class Character{
    //SEPARATE THAN A MONSTER,
    //CHARACTERS CAN LEVEL AND ARE UNIQUE

    //TODO: Implement leveling properly
    name;
    money;
    statBlock = {
        level: -1,
        exp: -1,
        health: -1,
        atk: -1,
        def: -1,
        acc: -1,
        critChance: 0,
    }
    skillPoints = 0;

    constructor(name = 'NO NAME', statBlock = this.statBlock, money = 0) {
        this.name = name;
        this.money = money;
        this.statBlock = statBlock;
    }

    checkForLevelUp(){
        //Level up if exp is above 100 * level
        if(this.statBlock.exp / (this.statBlock.level * 100) > 0){
            return true;
        } else return false;
    }
    doLevelUp(){
        if(this.checkForLevelUp()) this.skillPoints += 3;
    }
}