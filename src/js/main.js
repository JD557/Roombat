const ctx = get2dContext();

var frameStart = null;

function main(gameState) {
  return function(timestamp) {
    if (!timestamp) timestamp = 0;
    if (!frameStart) frameStart = timestamp;
    const delta = (timestamp - frameStart) / 1000.0;
    frameStart = timestamp;
    renderRoom(ctx);
    requestAnimationFrame(main(gameState));
  };
};

main(0)();
