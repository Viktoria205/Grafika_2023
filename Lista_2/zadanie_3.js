const c = document.getElementById("KolkoKrzyzyk");
const ctx = c.getContext("2d");

const cell_size = 150;
const table = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let game_over = false;
let current_player = 'X';
let highlightCell = null;

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    for (let i = 1; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cell_size, 0);
        ctx.lineTo(i * cell_size, c.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * cell_size);
        ctx.lineTo(c.width, i * cell_size);
        ctx.stroke();
    }

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cellValue = table[row][col];
            if (cellValue !== '') {
                ctx.font = '50px Arial';
                ctx.fillStyle = cellValue === 'X' ? 'red' : 'green';
                ctx.fillText(cellValue, col * cell_size + 50, row * cell_size + 90);
            }
        }
    }
    if (highlightCell !== null) {
        const row = Math.floor(highlightCell / 3);
        const col = highlightCell % 3;
        ctx.fillStyle = "rgba(255, 204, 255, 0.3)";
        ctx.fillRect(col * cell_size, row * cell_size, cell_size, cell_size);
    }
}

function mouse_move(event) {
    if (!game_over) {
        const rect = c.getBoundingClientRect();
        const mouse_x = event.clientX - rect.left;
        const mouse_y = event.clientY - rect.top;

        const col = Math.floor(mouse_x / cell_size);
        const row = Math.floor(mouse_y / cell_size);

        highlightCell = row * 3 + col;
        draw();
    }
}

function mouse_out() {
    highlightCell = null;
    draw();
}

c.addEventListener("click", handle_click);
c.addEventListener("mousemove", mouse_move);
c.addEventListener("mouseout", mouse_out);

function handle_click(event) {
    if (game_over) {
        alert("The game is over. Press TRY AGAIN to start a new game.");
        return
    }
    const rect = c.getBoundingClientRect();
    const mouse_x = event.clientX - rect.left;
    const mouse_y = event.clientY - rect.top;

    const col = Math.floor(mouse_x / cell_size);
    const row = Math.floor(mouse_y / cell_size);

    if (table[row][col] === "") {
        table[row][col] = current_player;
        current_player = current_player === "X" ? "O" : "X";
        draw();
        check_win();
        update_player();
    } else {
        alert("Cell is occupied!");
        }
}


function check_win() {
    for (let i = 0; i < 3; i++) {
        const row = table[i].join("");
        const col = table.map(row => row[i]).join("");
        if (row === "XXX" || col === "XXX") {
            document.getElementById("win").innerHTML = "Player X wins";
            game_over = true;

        } else if (row === "OOO" || col === "OOO") {
            document.getElementById("win").innerHTML = "Player O wins";
            game_over = true;

        }
    }
    if (
        table[0][0] === table[1][1] && table[1][1] === table[2][2] && table[0][0] !== '' ||
        table[0][2] === table[1][1] && table[1][1] === table[2][0] && table[0][2] !== ''
    ) {
        document.getElementById("win").innerHTML = "Player " + `${table[1][1]}` + " wins";
        game_over = true;
    }
    if (table.flat().every(cell => cell !== '')) {
        document.getElementById("win").innerHTML = "Nobody wins";
        game_over = true;
    }
}

function update_player() {
    document.getElementById("curPlyr").innerText = current_player;
}

c.addEventListener("click", handle_click);
draw();