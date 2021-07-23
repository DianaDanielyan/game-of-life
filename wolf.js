let LivingCreature = require("./class.js")

module.exports = class Wolf extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 10;
    }

    chooseCell(ch) {
        this.getNewCoordinates()
        return super.chooseCell(ch)
    }

    /////////////////////////////////////////////////////////////
    move() {
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }

    eat() {

        var emptyCells1 = this.chooseCell(4)
        var emptyCells2 = this.chooseCell(6)
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]
        var newCell2 = emptyCells2[Math.floor(Math.random() * emptyCells2.length)]
        

        if (newCell1) {
            var newX = newCell1[0]
            var newY = newCell1[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

            for (var i in dogsArr) {
                if (newX == dogsArr[i].x && newY == dogsArr[i].y) {
                    dogsArr.splice(i, 1)
                    break
                }
            }
        }
        else if(newCell2){
            var newX = newCell2[0]
            var newY = newCell2[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

            for (var i in mushroomsArr) {
                if (newX == mushroomsArr[i].x && newY == mushroomsArr[i].y) {
                    mushroomsArr.splice(i, 1)
                    this.die()
                    break
                }
            }
        }
        else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in wolfArr) {
            if (this.x == wolfArr[i].x && this.y == wolfArr[i].y) {
                wolfArr.splice(i, 1);
                break;
            }
        }
    }
}














// class Wolf {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.energy = 10;
//         this.multiply = 0
//         this.directions = [];
//     }

//     getNewCoordinates() {
//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1]
//         ];
//     }

//     chooseCell(character) {
//         this.getNewCoordinates()
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

//                 if (matrix[y][x] == character) {
//                     found.push(this.directions[i]);
//                 }
//             }
//         }
//         return found;
//     }


//     move() {
//         var emptyCells = this.chooseCell(0)
//         var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

//         if (newCell) {
//             var newX = newCell[0]
//             var newY = newCell[1]
//             matrix[newY][newX] = matrix[this.y][this.x]
//             matrix[this.y][this.x] = 0
//             this.x = newX
//             this.y = newY
//         }
//     }

//     eat() {

//         var emptyCells1 = this.chooseCell(4)
//         var newCell = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]
//         if (newCell) {
//             var newX = newCell[0]
//             var newY = newCell[1]

//             matrix[newY][newX] = matrix[this.y][this.x]
//             matrix[this.y][this.x] = 0
//             this.x = newX
//             this.y = newY
//             for (var i in dogsArr) {
//                 if (newX == dogsArr[i].x && newY == dogsArr[i].y) {
//                     dogsArr.splice(i, 1)
//                     break
//                 }
//             }
//         }
//         else {
//             this.move()
//         }
//     }
// }