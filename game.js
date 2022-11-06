var board = []
var mineCount = 10
var rows = 9
var cols = 9
var gameOver = false
var time = 0

$(document).ready(() => {

    //set timer
    let timestamp =
        setInterval(() => {
            $(".time").text(`Time: ${time++}`)
        }, 1000)

    //create game-board on 9x9 grid and 
    //initialize cells and mines
    //also create 9x9 2d array and store in 'board' 
    for (var r = 0; r < rows; r++) {
        let row = []
        for (var c = 0; c < cols; c++) {
            var cell = document.createElement('a');
            cell.id = `${r}-${c}`

            row.push({ mine: false, hint: 0 })
            $(".board").append(cell);
        }
        board.push(row)
    }

    //populate random mines on board
    while (mineCount > 0) {
        var r = Math.floor(Math.random() * rows)
        var c = Math.floor(Math.random() * cols)

        if (board[r][c].mine) {
            continue
        }

        board[r][c].mine = true;

        setHint(r, c)

        mineCount--;
    }

    //event binding on each cell 
    $('a').on("click", function () {
        if (!gameOver) {

            let coords = this.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            if (isMine(r, c)) {

                $(this).css({ "background-image": "url('./asset/bomb-solid.svg')", "border": "2px solid red", "box-shadow": "none" });
                $('.refresh').css("background-image", "url('./asset/face-frown-solid.svg')");
                showMines();

                gameOver = true;

                clearInterval(timestamp);
                $("h2").text("You Lose!")

            }

            $(this).css({ "box-shadow": "none", "background-color": "rgb(175, 175, 175)" })
            $(this).html(`<span> ${board[r][c].hint} </span>`);

        }
    });

    //to reload the page when the refresh btn was pressed 
    $(".refresh").click(function (e) {
        e.preventDefault();
        location.reload();
    });
})

function setHint(r, c) {
    for (var i = 0; i < rows; i++) {
        board[i][c].hint += 1
    }
    for (var j = 0; j < cols; j++) {
        board[r][j].hint += 1;
    }
}

function isMine(r, c) {
    return board[r][c].mine ? true : false;
}

function showMines() {
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            if (board[r][c].mine) {
                $('a').eq(r * 9 + c).css({ "background-image": "url('./asset/bomb-solid.svg')", "box-shadow": "none" });
            }
        }
    }
}