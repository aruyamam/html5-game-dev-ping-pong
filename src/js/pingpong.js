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
};

// view rendering
function renderPaddles() {
  $('#paddle-left').css('top', pingpong.paddleLeft.y);
  $('#paddle-right').css('top', pingpong.paddleRight.y);
}

renderPaddles();
