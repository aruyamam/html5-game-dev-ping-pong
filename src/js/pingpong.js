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
    y: 50,
    width: 20,
    height: 70,
  },

  playground: {
    offsetTop: $('#playground').offset().top,
  },

  isPaused: true
};

// view rendering
function renderPaddles() {
  $('#paddle-left').css('top', pingpong.paddleLeft.y);
  $('#paddle-right').css('top', pingpong.paddleRight.y);
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
  renderPaddles();
  window.requestAnimationFrame(render);
}

// starting point of entire game
function init() {
  // view rendering
  window.requestAnimationFrame(render);

  // inputs
  handleMouseInputs()
}

// Excuting the starting point
init();
