const ctx = get2dContext();

var frameStart = null;

var rot = 0;

function main(gameState) {
  return function(timestamp) {
    if (!timestamp) timestamp = 0;
    if (!frameStart) frameStart = timestamp;
    const delta = (timestamp - frameStart) / 1000.0;
    frameStart = timestamp;
    renderRoom(ctx);
    rot += delta;
    renderRoomba(ctx, 0, 0, rot);
    requestAnimationFrame(main(gameState));
  };
};

main(0)();
