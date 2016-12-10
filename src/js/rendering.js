function get2dContext() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  return ctx;
}

function drawRotated(ctx, x, y, rot, image) {
  ctx.save();
  ctx.translate(x + image.width / 2, y + image.height / 2);
  ctx.rotate(rot);
  ctx.drawImage(image, -image.width / 2, -image.height / 2)
  ctx.restore();
}

function renderRoomBackground(ctx) {
  ctx.clearRect(0, 0, 640, 480);
  ctx.drawImage(roomImg, 0, 0);
}

function renderRoomForeground(ctx) {
  ctx.drawImage(bedImg, 512, 288);
}

function renderRoomba(ctx, x, y, rot) {
  drawRotated(ctx, x, y, rot, roombaImg);
}

function renderBilly(ctx, x, y, rot, frame, state) {
  drawRotated(ctx, x, y, rot, billyImg);
}
