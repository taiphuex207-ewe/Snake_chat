const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20; // kích thước mỗi ô vuông
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = "RIGHT";
let food = {
  x: Math.floor(Math.random() * 19) * box,
  y: Math.floor(Math.random() * 19) * box
};
let score = 0;

// Bắt phím điều khiển
document.addEventListener("keydown", directionControl);

function directionControl(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

// Vẽ game
function drawGame() {
  ctx.fillStyle = "#f1f8e9";
  ctx.fillRect(0, 0, 400, 400);

  // Vẽ rắn
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#388e3c" : "#81c784";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "#ffffff";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // Vẽ thức ăn
  ctx.fillStyle = "#d32f2f";
  ctx.fillRect(food.x, food.y, box, box);

  // Vị trí đầu rắn hiện tại
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Hướng di chuyển
  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // Ăn mồi
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    document.getElementById("score").textContent = "Điểm: " + score;
    food = {
      x: Math.floor(Math.random() * 19) * box,
      y: Math.floor(Math.random() * 19) * box
    };
  } else {
    snake.pop(); // bỏ đuôi nếu không ăn
  }

  // Tạo đầu mới
  const newHead = { x: snakeX, y: snakeY };

  // Kiểm tra thua
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= 400 ||
    snakeY >= 400 ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert("Trò chơi kết thúc! Điểm của bạn: " + score);
  }

  snake.unshift(newHead);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

let game = setInterval(drawGame, 100);

document.getElementById("restart-btn").addEventListener("click", () => {
  location.reload();
});
