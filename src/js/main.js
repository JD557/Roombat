const ctx = get2dContext();

const billySpeed = 64; // pixels per second

class Player {
  constructor(x, y, dirX, dirY, moving) {
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;
    this.moving = moving;
  }
  updateDirection() {
    var newDirX = 0;
    var newDirY = 0;
    if (upPressed) { newDirY -= 1; }
    if (downPressed) { newDirY += 1; }
    if (leftPressed) { newDirX -= 1; }
    if (rightPressed) { newDirX += 1; }
    if (newDirX == 0 && newDirY == 0) {
      return new Player(this.x, this.y, this.dirX, this.dirY, false);
    }
    else {
      return new Player(this.x, this.y, newDirX, newDirY, true);
    }
  }
  getRot() {
    const vecSize = Math.sqrt(this.dirX * this.dirX + this.dirY * this.dirY);
    const sign = Math.sign(this.dirX) == 0 ? 1 : Math.sign(this.dirX);
    if (vecSize == 0) return 0;//undefined;
    else return Math.acos(-1 * this.dirY / vecSize) * sign;
  }
  move(delta) {
    const vecSize = Math.sqrt(this.dirX * this.dirX + this.dirY * this.dirY);
    if (vecSize == 0 || this.moving == false) return this;
    else {
      const deltaX = this.dirX / vecSize * delta * billySpeed;
      const deltaY = this.dirY / vecSize * delta * billySpeed;
      return new Player(this.x + deltaX, this.y + deltaY, this.dirX, this.dirY, this.moving);
    }
  }
}

var frameStart = null;

var rot = 0;
var billy = new Player(128, 128, 0, 0);

function main(gameState) {
  return function(timestamp) {
    if (!timestamp) timestamp = 0;
    if (!frameStart) frameStart = timestamp;
    const delta = (timestamp - frameStart) / 1000.0;
    frameStart = timestamp;
    renderRoom(ctx);
    rot += delta;
    renderRoomba(ctx, 32, 32, rot);
    billy = billy.updateDirection().move(delta);
    renderBilly(ctx, billy.x, billy.y, billy.getRot());
    requestAnimationFrame(main(gameState));
  };
};

main(0)();
