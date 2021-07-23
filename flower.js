let LivingCreature= require("./class.js")

module.exports = class Flower extends LivingCreature {

    chooseCell(ch) {
        this.getNewCoordinates()
        return super.chooseCell(ch)
    }

  
}    






