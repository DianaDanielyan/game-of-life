var socket = io()

let side = 20;

function setup() {
    frameRate(5);
    createCanvas(30 * side, 30 * side);
    background("#7d7d7d");

}

weath = "summer"

socket.on("weather", function (data) {
    weath = data
})


function nkarel(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            var obj = matrix[y][x]
            if (obj == 1) {
                fill("green");
                if (weath == "summer") {
                    fill("green");
                }
                else if (weath == "autumn") {
                    fill("#bf8f00");
                }
                else if (weath == "winter") {
                    fill("#ffffff")
                }
                else if (weath == "spring") {
                    fill("#008209")
                }

                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 0) {
                fill("#7d7d7d");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("#632e03");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("#000000");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("#dec9b6");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 7) {
                fill("#a054e3");
                rect(x * side, y * side, side, side);
            }

        }
    }

}


setInterval(
    function () {
        socket.on("send matrix", nkarel)
    }, 1000)

function addGrass() {
        socket.emit("add Grass")
    }