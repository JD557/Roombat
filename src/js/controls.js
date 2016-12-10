const up = 38;
const down = 40;
const left = 37;
const right = 39;
const shoot = 90; // Z

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var shootMarble = false;
var marbleTimeout = 0;

function baseKeyHandler(e) {
    if (e.keyCode == up) {
      upPressed = e.type == 'keydown';
    }
    else if (e.keyCode == down) {
      downPressed = e.type == 'keydown';
    }
    else if (e.keyCode == left) {
      leftPressed = e.type == 'keydown';
    }
    else if (e.keyCode == right) {
      rightPressed = e.type == 'keydown';
    }
    else if (e.keyCode == shoot) {
      if (e.type == 'keydown' && marbleTimeout < 0) {
        shootMarble = true;
      }
    }
}

onkeyup = function(e) {
  e = e || event;
  baseKeyHandler(e);
}

onkeydown = function(e) {
  e = e || event;
  baseKeyHandler(e);
}
