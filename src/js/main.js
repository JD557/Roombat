const ctx = get2dContext();

var frameStart = null;

var rot = 0;
var x = 128;
var y = 128;

function main(gameState) {
  return function(timestamp) {
    if (!timestamp) timestamp = 0;
    if (!frameStart) frameStart = timestamp;
    const delta = (timestamp - frameStart) / 1000.0;
    frameStart = timestamp;
    renderRoom(ctx);
    rot += delta;
    renderRoomba(ctx, 32, 32, rot);
    if (upPressed) {
      y -= 1
    }
    if (downPressed) {
      y += 1
    }
    if (leftPressed) {
      x -= 1
    }
    if (rightPressed) {
      x += 1
    }
    renderBilly(ctx, x, y, rot);
    requestAnimationFrame(main(gameState));
  };
};

main(0)();
