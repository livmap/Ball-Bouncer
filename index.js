const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

// Ball properties
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  dx: 0,
  dy: 0,
  speed: 4,
  color: '#61dafb'
};

// Draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

// Update ball position
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();

  // Prevent ball from leaving canvas
  ball.x = Math.min(Math.max(ball.x + ball.dx, ball.radius), canvas.width - ball.radius);
  ball.y = Math.min(Math.max(ball.y + ball.dy, ball.radius), canvas.height - ball.radius);

  requestAnimationFrame(update);
}

// Gamepad handling
function handleGamepadInput() {
  const gamepads = navigator.getGamepads();
  if (gamepads[0]) {
    const gp = gamepads[0];
    const xAxis = gp.axes[0]; // Left joystick horizontal axis
    const yAxis = gp.axes[1]; // Left joystick vertical axis

    // Use joystick input to set ball velocity
    ball.dx = xAxis * ball.speed;
    ball.dy = yAxis * ball.speed;
  }

  // Poll gamepad input at a regular interval
  requestAnimationFrame(handleGamepadInput);
}

// Initialize
update();
handleGamepadInput();
