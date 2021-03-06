var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs")

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);


function generator(matLen, gr, grEat, pr, dogs, wolf, mushrooms, flower) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
        else {
            i--
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
        else {
            i--
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
        else {
            i--
        }
    }
    for (let i = 0; i < dogs; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
        else {
            i--
        }
    }
    for (let i = 0; i < wolf; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
        else {
            i--
        }
    }
    for (let i = 0; i < mushrooms; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 6;
        }
        else {
            i--
        }

    }
    for (let i = 0; i < flower; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 7;
        }
        else {
            i--
        }

    }
    return matrix

}


var Grass = require("./grass.js")
var GrassEater = require("./grassEater.js")
var Wolf = require("./wolf.js")
var Predator = require("./predator.js")
var Dogs = require("./dogs.js")
var Mushrooms = require("./mushrooms.js")
var Flower = require("./flower.js")

matrix = generator(30, 300, 200, 20, 5, 15, 20, 20);

io.sockets.emit("send matrix", matrix)

grassArr = []
grassEaterArr = []
predatorArr = []
dogsArr = []
wolfArr = []
mushroomsArr = []
flowerArr = []


function createObject(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                var grEat = new GrassEater(x, y)
                grassEaterArr.push(grEat)
            }
            else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y)
                predatorArr.push(pr)
            } else if (matrix[y][x] == 4) {
                var dogs = new Dogs(x, y)
                dogsArr.push(dogs)
            }
            else if (matrix[y][x] == 5) {
                var wolf = new Wolf(x, y)
                wolfArr.push(wolf)
            }
            else if (matrix[y][x] == 6) {
                var mushrooms = new Mushrooms(x, y)
                mushroomsArr.push(mushrooms)
            }
            else if (matrix[y][x] == 7) {
                var flower = new Flower(x, y)
                flowerArr.push(flower)
            }
        }
        io.sockets.emit("send matrix", matrix)
    }
}

weath = "summer"

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autmn"
    }
    else if (weath == "autmn") {
        weath = "winter"
    }
    console.log(weath)

    io.sockets.emit("weather", weath)


}
setInterval(weather, 5000)



function game() {
    for (var i in grassArr) {
        grassArr[i].mul();

    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].mul();
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].mul();
        predatorArr[i].eat();
    }

    for (var i in wolfArr) {
        wolfArr[i].eat();
    }
    io.sockets.emit("send matrix", matrix)
}

setInterval(game, 150)

io.on("connection", function (socket) {
    createObject(matrix)

    socket.on("add Grass", function(){
        console.log("???????????????????? ???? ??????")
        socket.emit("send matrix", matrix)
    })
})



var statistics = {}

setInterval(function () {
    statistics.grass = grassArr.length
    statistics.grassEater = grassEaterArr.length
    statistics.predator = predatorArr.length
    statistics.dogs = dogsArr.length
    statistics.wolf = wolfArr.length
    statistics.mushrooms = mushroomsArr.length
    statistics.flower = flowerArr.length

    fs.writeFileSync("statistics.json",
        JSON.stringify(statistics))
}, 1000)


