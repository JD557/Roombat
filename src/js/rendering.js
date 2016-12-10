function get2dContext() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  return ctx;
}

function renderRoom(ctx) {
  ctx.clearRect(0, 0, 640, 480);
  ctx.drawImage(roomImg, 0, 0);
}
