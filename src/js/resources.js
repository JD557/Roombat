function loadImage(path) {
  var img = new Image();
  img.src = path;
  return img;
}

var roomImg = loadImage('res/room.png');
var roombaImg = loadImage('res/roomba.png');
var billyImg = loadImage('res/billy.png');
var bedImg = loadImage('res/bed.png');
var marbleImg = loadImage('res/marble.png');
var menuImg = loadImage('res/title.png');
var snackImgs = [loadImage('res/snack1.png'), loadImage('res/snack2.png')];
