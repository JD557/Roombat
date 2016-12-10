function loadImage(path) {
  var img = new Image();
  img.src = path;
  return img;
}

var roomImg = loadImage('res/room.png');
var roombaImg = loadImage('res/roomba.png');
