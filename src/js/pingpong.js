import $ from 'jquery';

const pingpong = {
  // data definition
  paddleLeft: {
    x: 50,
    y: 100,
    width: 20,
    height: 70,
  },

  paddleRight: {
    x: 320,
    y: 100,
    width: 20,
    height: 70,
  },

  playground: {
    offsetTop: $('#playground').offset().top,
    height: parseInt($('#playground').height()),
    width: parseInt($('#playground').width()),
  },

  ball: {
    speed: 5,
    x: 150,
    y: 100,
    radius: 20,
    directionX: 1,
    directionY: 1,
  },

  isPaused: true
};

// ball collision logic
function ballHitsTopBottom() {
  var y = pingpong.ball.y + pingpong.ball.speed * pingpong.ball.directionY;
  return y < 0 || y > pingpong.playground.height;
}

function ballHitsRightWall() {
  return pingpong.ball.x + pingpong.ball.speed * pingpong.ball.directionX > pingpong.playground.width;
}

function ballHitsLeftWall() {
  return pingpong.ball.x + pingpong.ball.speed * pingpong.ball.directionX < 0;
}

// ball movement logic
function moveBall() {
  // reference useful variables
  const ball = pingpong.ball;

  // check playground top/bottom boundary
  if (ballHitsTopBottom()) {
    // reverse direction
    ball.directionY *= -1;
  }

  // check right
  if (ballHitsRightWall()) {
    playerLeftWin();
  }
  // check left
  if (ballHitsLeftWall()) {
    playerRightWin();
  }

  // Variables for checking paddles
  let ballX = ball.x + ball.speed * ball.directionX;
  let ballY = ball.y + ball.speed * ball.directionY;

  // check moving paddle here, later
  // check left paddle
  if (ballX >= pingpong.paddleLeft.x && ballX < pingpong.paddleLeft.x + pingpong.paddleLeft.width) {
    if (ballY <= pingpong.paddleLeft.y + pingpong.paddleLeft.height && ballY >= pingpong.paddleLeft.y) {
      ball.directionX = 1;
    }
  }

  // check right paddle
  if (ballX + pingpong.ball.radius >= pingpong.paddleRight.x && ballX < pingpong.paddleRight.x + pingpong.paddleRight.width) {
    if (ballY <= pingpong.paddleRight.y + pingpong.paddleRight.height && ballY >= pingpong.paddleRight.y) {
      ball.directionX = -1;
    }
  }

  // update the ball position data
  ball.x += ball.speed * ball.directionX;
  ball.y += ball.speed * ball.directionY;
}

// winning logic
function playerLeftWin() {
  // reset the ball;
  pingpong.ball.x = 250;
  pingpong.ball.y = 100;

  // update the ball location variables;
  pingpong.ball.directionX = -1;
}

function playerRightWin() {
  // reset the ball
  pingpong.ball.x = 150;
  pingpong.ball.y = 100;

  pingpong.ball.directionX = 1;
}

// view rendering
function renderPaddles() {
  $('#paddle-left').css('top', pingpong.paddleLeft.y);
  $('#paddle-right').css('top', pingpong.paddleRight.y);
}

function renderBall() {
  const ball = pingpong.ball;
  $('#ball').css({
    'left': ball.x + ball.speed * ball.directionX,
    'top': ball.y + ball.speed * ball.directionY,
  });
}

function handleMouseInputs() {
  // run thhe game when mouse moves in the playground.
  $('#playground').mouseenter(function () {
    pingpong.isPaused = false;
  });

  // pause the gme when mouse moves out the playground.
  $('#playground').mouseleave(function () {
    pingpong.isPaused = true;
  });

  // calculate the paddle position by using the mouse position.
  $('#playground').mousemove(function (e) {
    pingpong.paddleRight.y = e.pageY - pingpong.playground.offsetTop;
  });
}

// browser render loop
function render() {
  renderBall();
  renderPaddles();
  window.requestAnimationFrame(render);
}

function gameloop() {
  moveBall();
}

// starting point of entire game
function init() {
  // set intervql to call gameloop logic in 30 FPS
  pingpong.timer = setInterval(gameloop, 1000 / 30);

  // view rendering
  window.requestAnimationFrame(render);

  // inputs
  handleMouseInputs()
}

// Excuting the starting point
init();
