let LivingCreature = require("./class.js")

module.exports = class Mushrooms extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 5;
    }

    chooseCell(ch) {
        this.getNewCoordinates()
        return super.chooseCell(ch)
    }




}