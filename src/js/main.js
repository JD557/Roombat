const ctx = get2dContext();

const billySpeed = 128; // pixels per second
const roombaSpeed = 128; // pixels per second
const marbleSpeed = 256; // pixels per second
const invalidGrids = [
  [16, 9], [17, 9], [18, 9], [16, 10], [17, 10], [18, 10] // bed
];
function inGrid(x, y) {
  return [Math.floor(x/32), Math.floor(y/32)];
}
function clamp(x, min, max) {
  return Math.min(Math.max(x, min), max);
}

class Player {
  constructor(x, y, dirX, dirY, moving) {
    this.x = clamp(x, 32, 640-64);
    this.y = clamp(y, 64+32, 480-64);
    this.dirX = dirX;
    this.dirY = dirY;
    this.moving = moving;
    this.grids = [
      inGrid(this.x, this.y),
      inGrid(this.x + 31, this.y),
      inGrid(this.x, this.y + 31),
      inGrid(this.x + 31, this.y + 31)
    ];
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
      const nextPlayer = new Player(this.x + deltaX, this.y + deltaY, this.dirX, this.dirY, this.moving);
      if (nextPlayer.grids.some(g1 => invalidGrids.some(g2 => g1[0] == g2[0] && g1[1] == g2[1]))) {
        return this;
      }
      else {
        return nextPlayer;
      }
    }
  }
}


class Marble {
  constructor(x, y, dirX, dirY) {
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;
  }
  move(delta) {
    const vecSize = Math.sqrt(this.dirX * this.dirX + this.dirY * this.dirY);
    if (vecSize == 0) return this;
    else {
      const deltaX = this.dirX / vecSize * delta * marbleSpeed;
      const deltaY = this.dirY / vecSize * delta * marbleSpeed;
      return new Marble(this.x + deltaX, this.y + deltaY, this.dirX, this.dirY);
    }
  }
}

class Roomba {
  constructor(x, y, dirX, dirY, moving) {
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;
    this.moving = moving;
  }
  updateDirection() {
    const viewX = this.x + Math.sign(this.dirX) * 32;
    const viewY = this.y + Math.sign(this.dirY) * 32;
    let newDirX = this.dirX;
    let newDirY = this.dirY;
    if (viewX < 0 || (viewX + 32) > 640) {
      newDirX = Math.random() * (-1 * Math.sign(this.dirX));
    }
    if (viewY < 64 || (viewY + 32) > 480) {
      newDirY = Math.random() * (-1 * Math.sign(this.dirY));
    }
    return new Roomba(this.x, this.y, newDirX, newDirY, true)
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
      const deltaX = this.dirX / vecSize * delta * roombaSpeed;
      const deltaY = this.dirY / vecSize * delta * roombaSpeed;
      return new Roomba(this.x + deltaX, this.y + deltaY, this.dirX, this.dirY, this.moving);
    }
  }
}

class GameState {
  constructor(billy, roombas, marbles) {
    this.billy = billy;
    this.roombas = roombas;
    this.marbles = marbles;
  }
  spawnRoombas(n) {
    const newRoombas = Array(n).fill(0).map(_ => new Roomba(16, 256, 1, Math.random() - 0.5, true));
    return new GameState(this.billy, newRoombas, this.marbles);
  }
  nextTick(delta) {
    if (this.roombas.length == 0) {
      return (this.spawnRoombas(3).nextTick(delta));
    }
    else {
      const newBilly = this.billy.updateDirection().move(delta);
      const newRoombas = this.roombas.map(r => r.updateDirection().move(delta));
      var newMarbles = this.marbles.map(m => m.move(delta));
      if (shootMarble == true) {
        shootMarble = false;
        marbleTimeout = 2;
        newMarbles.push(new Marble(this.billy.x, this.billy.y, this.billy.dirX, this.billy.dirY));
      }
      marbleTimeout -= delta;
      return new GameState(newBilly, newRoombas, newMarbles);
    }
  }
}

var frameStart = null;

const initialState = new GameState(
  new Player(128, 128, 0, 0, false),
  [],
  []
);

function main(gameState) {
  return function(timestamp) {
    if (!timestamp) timestamp = 0;
    if (!frameStart) frameStart = timestamp;
    const delta = (timestamp - frameStart) / 1000.0;
    frameStart = timestamp;
    renderRoomBackground(ctx);
    gameState.roombas.forEach(r => renderRoomba(ctx, r.x, r.y, r.getRot()));
    renderRoomForeground(ctx);
    gameState.marbles.forEach(m => renderMarble(ctx, m.x, m.y));
    renderBilly(ctx, gameState.billy.x, gameState.billy.y, gameState.billy.getRot());
    requestAnimationFrame(main(gameState.nextTick(delta)));
  };
};

main(initialState)();
