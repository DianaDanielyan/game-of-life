let LivingCreature= require("./class.js")

module.exports = class Dogs extends LivingCreature {
    constructor(x, y) {
        super(x,y)
        this.energy = 8;
    }

    chooseCell(ch) {
        this.getNewCoordinates()
        return super.chooseCell(ch)
    }




}