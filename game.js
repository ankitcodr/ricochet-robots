var boardSize = 8;
var colors = {
    RED: 0,
    BLUE: 1,
    SILVER: 2,
    GREEN: 3,
    YELLOW: 4,
    DEFAULT: 5,
    NUMCOLORS: 6
}
var colorNames = ["crimson", "steelblue", "silver", "green", "yellowgreen"];
var timerVar;

// Load the updateText on first load for now
window.onload = function () {
    // newSeed();
    newGame8();
};

function helpButton() {
    var txt = "1. Dots are Robots.\n2. Chip with G is Goal.\n3. Robots can go horizontal or vertical and can't jump over walls or players.\n4. Robots can also not change direction until they hit a wall or another Robot.\n5. Goal: Take same-colored Robot to Goal in less steps than other players.\n6. Check Result by clicking \"Show Solution\"";
    confirm(txt);
};

function newGame8() {
    boardSize = 8;
    generateGame();
}

function newGame10() {
    boardSize = 10;
    generateGame();
}

function newGame12() {
    boardSize = 12;
    generateGame();
}

function loadGame() {

}

function generateGame() {
    startTimer();
    drawBoard();
}

function startTimer() {
    // Output the result in an element with id="demo"
    var timerDuration = 180;
    clearInterval(timerVar);
    timerVar = setInterval(function () {
        timerDuration -= 1;
        var minutes = Math.floor(timerDuration / 60);
        var seconds = Math.floor(timerDuration % 60);
        if (seconds < 10) {
            var stylish = "<span>";
            if (timerDuration < 10) {
                stylish = "<span style=\"background-color: red\">"
            }
            document.getElementById("Timer").innerHTML = stylish + minutes + ":0" + seconds + "</span>";
        } else {
            document.getElementById("Timer").innerHTML = minutes + ":" + seconds;
        }

        // If the count down is over, write some text 
        if (timerDuration < 0) {
            clearInterval(timerVar);
            document.getElementById("Timer").innerHTML = "EXPIRED!!";
        }
    }, 1000);
}

function drawBoard() {
    var rows = boardSize;
    var cols = rows;

    // var top_walls = placeWalls();
    var players = placePlayers();
    var chipLocation = chipLocationF();
    var chipColor = chipColorF();

    var tbl = document.getElementById('GameTable'), tr;
    tbl.innerHTML = "";
    tbl.classList.add("grid");

    for (var i = 0; i < rows; ++i) {
        tr = tbl.insertRow();
        for (var j = 0; j < cols; ++j) {
            var td = tr.insertCell();
            td.classList.add("cell");
            // Define Center
            if (i == rows / 2 - 1) {
                if (j == cols / 2 - 1) {
                    td.classList.add("cell-top-border");
                    td.classList.add("cell-left-border");
                    td.classList.add("cell-center");
                }
                if (j == cols / 2) {
                    td.classList.add("cell-top-border");
                    td.classList.add("cell-right-border");
                    td.classList.add("cell-center");
                }
            }

            if (i == rows / 2) {
                if (j == cols / 2 - 1) {
                    td.classList.add("cell-bottom-border");
                    td.classList.add("cell-left-border");
                    td.classList.add("cell-center");
                }
                if (j == cols / 2) {
                    td.classList.add("cell-bottom-border");
                    td.classList.add("cell-right-border");
                    td.classList.add("cell-center");
                }
            }

            // Place Walls
            // Default Walls
            if (i == 0 && j == cols / 2) {
                td.classList.add("cell-left-border");
            }
            if (i == rows / 2 && (j == 0 || j == cols - 1)) {
                td.classList.add("cell-top-border");
            }

            if (i == rows - 1 && j == cols / 2) {
                td.classList.add("cell-left-border");
            }

            // Place walls

            // Place Players
            var player = "<span>";
            if (players["RED"] === i * cols + j) {
                player = "<span class = \"red-player\">";
            }
            if (players["BLUE"] === i * cols + j) {
                player = "<span class = \"blue-player\">";
            }
            if (players["GREEN"] === i * cols + j) {
                player = "<span class = \"green-player\">";
            }
            if (players["SILVER"] === i * cols + j) {
                player = "<span class = \"silver-player\">";
            }
            if (players["YELLOW"] === i * cols + j) {
                player = "<span class = \"yellow-player\">";
            }

            // Place Chip
            if (i * cols + j === chipLocation) {
                player = "<span class = \"cell-chip\" style = \"background-color: ";
                player += colorNames[chipColor];
                player += "\">G";
            }

            player += "</span>";

            td.innerHTML = player;
        }
    }
}

function placeWalls() {

}

function placePlayers() {
    var players = {
        "RED": 4,
        "BLUE": 32,
        "GREEN": 21,
        "SILVER": 52,
        "YELLOW": 57
    };
    return players;
}

function chipColorF() {
    return colors.RED;
}

function chipLocationF() {
    return 37;
}