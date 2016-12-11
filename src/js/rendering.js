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
  ctx.drawImage(bedImg, 512, 256);
  ctx.drawImage(deskImg, 96, 384);
  ctx.drawImage(gametableImg, 160, 192);
  ctx.drawImage(wardrobeImg, 544, 96);
}

function renderRoomba(ctx, x, y, rot) {
  drawRotated(ctx, x, y, rot, roombaImg);
}

function renderBilly(ctx, x, y, rot, moving, anim) {
  let extraRot = moving ? Math.cos(anim / 100.0) * 0.2 : 0;
  drawRotated(ctx, x, y, rot + extraRot, billyImg);
}

function renderMarble(ctx, x, y) {
  ctx.drawImage(marbleImg, x, y);
}

function renderSnack(ctx, x, y, sprite, anim) {
  let wave = Math.cos(anim / 500.0) * 4;
  ctx.drawImage(snackImgs[sprite], x, y + wave);
}

function renderScore(ctx, dirtyness, remainingRoombas) {
  ctx.fillStyle = 'white';
  ctx.font = '8px PressStart2P';

  ctx.fillText('Dirtyness: ' + Math.ceil(dirtyness), 8, 16);
  ctx.fillText('Roombas: ' + remainingRoombas, 8, 32);
}


function renderTitle(ctx) {
  ctx.fillStyle = 'red';
  ctx.font = '16px PressStart2P';

  ctx.drawImage(menuImg, 0, 0);
  ctx.fillText('Press Z to Start!', 320 - 130, 250);

  ctx.font = '8px PressStart2P';

  ctx.fillText('You are Billy, a young boy who ', 64, 300);
  ctx.fillText('loves to play in his room, but ', 64, 310);
  ctx.fillText('hates to clean it.             ', 64, 320);
  ctx.fillText('After months of harsh          ', 64, 340);
  ctx.fillText('negotiations the evil tyrant   ', 64, 350);
  ctx.fillText('(mom) has lost her patience and', 64, 360);
  ctx.fillText('decided to unleash an army of  ', 64, 370);
  ctx.fillText('Roombas upon you.              ', 64, 380);
  ctx.fillText('Do you have what it takes to   ', 64, 400);
  ctx.fillText('fight off the invaders and keep', 64, 410);
  ctx.fillText('your room dirty?               ', 64, 420);

  ctx.fillText('How to play:              ', 360, 300);
  ctx.fillText('Arrow keys: Move Billy    ', 360, 320);
  ctx.fillText('Z: Shoot marble           ', 360, 330);
  ctx.fillText('Eat snacks to keep your   ', 360, 350);
  ctx.fillText('room dirty.               ', 360, 360);
  ctx.fillText('If your dirtyness reaches ', 360, 380);
  ctx.fillText('0, you lose.              ', 360, 390);
}
