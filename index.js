const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

// Ball properties
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  dx: Math.random() * 10,
  dy: Math.random() * 10,
  speed: 4,
  color: '#61dafb'
};

let platform =  {

    x: canvas.width / 2,
    y: canvas.height - 20,
    w: 100,
    h: 10,
    dx: 0,
    dy: 0,
    speed: 10,
    color: '#2BC0E4',

}

// Draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

function drawPlatform(){
    ctx.beginPath();
    ctx.rect(platform.x, platform.y, platform.w, platform.h);
    ctx.fillStyle = platform.color
    ctx.fill()
    ctx.stroke();
}

// Update ball position
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPlatform()

  // Prevent ball from leaving canvas
  if(platform.x > 0 && platform.x < canvas.width - platform.w){
    platform.x += platform.dx
  } else if(platform.x < 0) {
    platform.x = 0.01
  } else {
    platform.x = canvas.width - platform.w - 0.01
  }

  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx *= -1;
  }
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }

  // Update ball position
  ball.x += ball.dx;
  ball.y += ball.dy;

  if(ball.x > platform.x && ball.x < platform.x + platform.w){
    if(ball.y + ball.radius > platform.y){
        ball.dy *= -1;
    }
  }

  
  //platform.x = Math.min(Math.max(platform.x + platform.dx, platform.w), canvas.width - platform.w);
  

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
    platform.dx = xAxis * platform.speed;
    platform.dy = yAxis * platform.speed;
  }

  // Poll gamepad input at a regular interval
  requestAnimationFrame(handleGamepadInput);
}

// Initialize
update();
handleGamepadInput();
