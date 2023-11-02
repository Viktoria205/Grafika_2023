const c = document.getElementById("gra2D");
const ctx = c.getContext("2d");

const playerColor = "#FF5733";
const obstacleColor = "#000000";
const playerSize = 20;
const obstacleSize = 40;
const obstacleCount = 10;
var playerX = 5;
var playerY = c.height - 10;
var destinationX = Math.random() * (c.width - 50) + 25;
var destinationY = 30;
var obstacles = [];

for (let i = 0; i < obstacleCount; i++) {
    let obstacleX, obstacleY;
    do {
        obstacleX = Math.random() * (c.width - obstacleSize) + obstacleSize;
        obstacleY = Math.random() * (c.height - obstacleSize) + obstacleSize;
    } while (
        Math.abs(obstacleX - playerX) < (playerSize + obstacleSize) &&
        Math.abs(obstacleY - playerY) < (playerSize + obstacleSize)
    );
    obstacles.push({ x: obstacleX, y: obstacleY, dx: Math.random() * 2 - 1, dy: Math.random() * 2 - 1 });
}

let seconds = 0;
let intervalId = setInterval(function() {
    seconds++;
    document.getElementById("timer").innerHTML = "Time: " + seconds + " s.";
}, 1000);

function drawPlayer() {
    ctx.fillStyle = playerColor;
    ctx.fillRect(playerX - playerSize / 2, playerY - playerSize / 2, playerSize, playerSize);
}

function drawDestination() {
    ctx.fillStyle = "#006400";
    ctx.beginPath();
    ctx.arc(destinationX, destinationY, playerSize / 2, 0, Math.PI * 2);
    ctx.fill();
}

function drawObstacles() {
    ctx.fillStyle = obstacleColor;
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x - obstacleSize / 2, obstacle.y - obstacleSize / 2, obstacleSize, obstacleSize);
        obstacle.x += obstacle.dx;
        obstacle.y += obstacle.dy;

        if (obstacle.x < obstacleSize / 2 || obstacle.x > c.width - obstacleSize / 2) {
            obstacle.dx = -obstacle.dx;
        }

        if (obstacle.y < obstacleSize / 2 || obstacle.y > c.height - obstacleSize / 2) {
            obstacle.dy = -obstacle.dy;
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    drawPlayer();
    drawDestination();
    drawObstacles();
}

document.addEventListener("keydown", function(event) {
    switch (event.keyCode) {
        case 37:
            if (playerX - playerSize / 2 > 0) { 
                playerX -= 5;
            }
            break;
        case 39:
            if (playerX + playerSize / 2 < c.width) { 
                playerX += 5;
            }
            break;
        case 38:
            if (playerY - playerSize / 2 > 0) { 
                playerY -= 5;
            }
            break;
        case 40:
            if (playerY + playerSize / 2 < c.height) { 
                playerY += 5;
            }
            break;
    }

    for (let i = 0; i < obstacles.length; i++) {
        let obstacle = obstacles[i];
        if (Math.abs(playerX - obstacle.x) < (playerSize + obstacleSize) / 2 && Math.abs(playerY - obstacle.y) < (playerSize + obstacleSize) / 2) {
            clearInterval(intervalId);
            alert("Game over! Try again.");
            resetGame();
        }
    }

    if (Math.abs(playerX - destinationX) < (playerSize + obstacleSize) / 2 && Math.abs(playerY - destinationY) < (playerSize + obstacleSize) / 2) {
        clearInterval(intervalId);
        alert("Congratulations! Your time: " + seconds + " s. ");
        resetGame();
    }
    draw();
});

function resetGame() {
    playerX = c.width / 2;
    playerY = c.height - 50;
    destinationX = Math.random() * (c.width - 50) + 25;
    destinationY = 30;
    obstacles = [];
    for (let i = 0; i < obstacleCount; i++) {
        let obstacleX = Math.random() * (c.width - obstacleSize) + obstacleSize;
        let obstacleY = Math.random() * (c.height - obstacleSize) + obstacleSize;
        obstacles.push({ x: obstacleX, y: obstacleY, dx: Math.random() * 2 - 1, dy: Math.random() * 2 - 1 });
    }
    seconds = 0;
    intervalId = setInterval(function() {
        seconds++;
        document.getElementById("timer").innerHTML = "Time: " + seconds + " s. ";
    }, 1000);
    draw();
}
