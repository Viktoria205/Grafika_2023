const c = document.getElementById("memoryGame");
const ctx = c.getContext("2d");

const images = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.png",
    "10.png",
];

const duplic_images = [...images, ...images];

function shuffle_array(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle_array(duplic_images);

const cell_size = 80;
const grid_size = { rows: 5, cols: 4 };
const board = [];

for (let i = 0; i < grid_size.rows; i++) {
    const row = [];
    for (let j = 0; j < grid_size.cols; j++) {
        row.push({
            image: duplic_images[i * grid_size.cols + j],
            flipped: false,
        });
    }
    board.push(row);
}

let current_player = 1;
let player1_counter = 0;
let player2_counter = 0;


c.addEventListener("click", handleClick);

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);

    let loadedImagesCount = 0;

    for (let i = 0; i < grid_size.rows; i++) {
        for (let j = 0; j < grid_size.cols; j++) {
            const cell = board[i][j];
            const x = j * (cell_size + 10);
            const y = i * (cell_size + 10);

            ctx.fillStyle = "#ddd";
            ctx.fillRect(x, y, cell_size, cell_size);

            if (cell.flipped) {
                const img = new Image();
                img.onload = function () {
                    ctx.drawImage(img, x, y, cell_size, cell_size);
                    loadedImagesCount++;

                    if (loadedImagesCount === grid_size.rows * grid_size.cols) {
                        loadedImagesCount = 0; 
                        if (isGameOver()) {
                            displayWinner();
                        }
                    }
                };
                img.src = cell.image;
            }
        }
    }
    document.getElementById("player1Counter").innerText = `Player 1: ${player1_counter}`;
    document.getElementById("player2Counter").innerText = `Player 2: ${player2_counter}`;

    document.getElementById("currentPlayer").innerText = `Current Player: ${current_player}`;
}

function isGameOver() {
    return board.flat().every((cell) => cell.matched);
}

function displayWinner() {
    let winner;
    if (player1_counter > player2_counter) {
        winner = "Player 1";
    } else if (player2_counter > player1_counter) {
        winner = "Player 2";
    } else {
        winner = "It's a tie!";
    }

    document.getElementById("winnerMessage").innerText = `Game Over! ${winner} wins!`;
}

draw();

let is_delay_active = false;

function handleClick(event) {
    const rect = c.getBoundingClientRect();
    const mouse_x = event.clientX - rect.left;
    const mouse_y = event.clientY - rect.top;

    const clicked_row = Math.floor(mouse_y / (cell_size + 10));
    const clicked_col = Math.floor(mouse_x / (cell_size + 10));

    if (!board[clicked_row][clicked_col].flipped) {
        board[clicked_row][clicked_col].flipped = true;
        draw();

        setTimeout(() => {
            const flipped_cells = board
                .flat()
                .filter((cell) => cell.flipped && !cell.matched);

            if (flipped_cells.length === 2) {
                const [first_cell, second_cell] = flipped_cells;

                if (first_cell.image === second_cell.image) {
                    first_cell.matched = true;
                    second_cell.matched = true;
                    if (current_player === 1) {
                        player1_counter++;
                    } else {
                        player2_counter++;
                    }
                    
                } else {
                    first_cell.flipped = false;
                    second_cell.flipped = false;
                    current_player = current_player === 1 ? 2 : 1;
                }

                draw();
            } is_delay_active = false;
        }, 1500);
        is_delay_active = true;
    }
}

const tryAgainButton = document.getElementById("tryAgainButton");
tryAgainButton.addEventListener("click", try_again);

function try_again() {
    for (let i = 0; i < grid_size.rows; i++) {
        for (let j = 0; j < grid_size.cols; j++) {
            board[i][j].flipped = false;
            board[i][j].matched = false;
        }
    }
    player1_counter = 0;
    player2_counter = 0;
    shuffle_array(duplic_images);
    draw();
}