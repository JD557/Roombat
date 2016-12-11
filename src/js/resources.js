function loadImage(path) {
  let img = new Image();
  img.src = path;
  return img;
}

const roomImg = loadImage('res/room.png');
const roombaImg = loadImage('res/roomba.png');
const billyImg = loadImage('res/billy.png');
const bedImg = loadImage('res/bed.png');
const deskImg = loadImage('res/desk.png');
const wardrobeImg = loadImage('res/wardrobe.png');
const gametableImg = loadImage('res/gametable.png');
const marbleImg = loadImage('res/marble.png');
const menuImg = loadImage('res/title.png');
const snackImgs = [loadImage('res/snack1.png'), loadImage('res/snack2.png')];

let introSnd = new Audio('res/intro.mp3');
introSnd.loop = true;
