import Winter from "./winter";
import Spring from "./spring";
import Summer from "./summer";
import Fall from "./fall";
import Stickman from "./stickman";
import Ghosts from "./ghosts";

export default class Game {
  constructor(ctx, W, H) {
    this.ctx = ctx;
    this.W = W;
    this.H = H - 84;

    this.height = this.H;

    this.levels = ["winter", "spring", "summer", "fall"];

    this.levelType = "winter";
    this.stickman = new Stickman(this.ctx, this.W, this.H - 2);
    this.ghosts = new Ghosts(this.ctx, this.W, this.H - 6, this.levelType);
    this.level = new Winter(this.ctx, this.W, this.H, this.levelType);

    this.ground = new Image();
    this.ground.src = "./blocks.png";
    this.ground.onload = () => {
      this.drawGround();
    };
  }

  resetLevel() {
    this.stickman.posX = 20;
    this.loadLevel();
  }

  run() {
    this.ctx.clearRect(
      0,
      0,
      this.W,
      (this.height = this.levelType === "winter" ? this.height - 0.01 : this.H)
    );
    this.level.draw();
    if (this.ghosts && this.ghosts.ghosts) {
      this.ghosts.draw();
    }
    this.stickman.draw(this.height);
    this.isStickmanColliding();
    if (this.isTouchingOrb()) {
      this.drawGround();
      this.levelType = this.levels[
        (this.levels.indexOf(this.levelType) + 1) % this.levels.length
      ];
      this.loadLevel();
      this.ghosts = new Ghosts(this.ctx, this.W, this.height, this.levelType);
      this.orb = this.level.orb;
    }
  }

  loadLevel() {
    this.height = this.H;
    switch (this.levelType) {
      case "winter":
        this.level = new Winter(this.ctx, this.W, this.H, this.levelType);
        break;
      case "spring":
        this.level = new Spring(this.ctx, this.W, this.H);
        break;
      case "summer":
        this.level = new Summer(this.ctx, this.W, this.H, this.stickman);
        this.ghosts = false;
        break;
      case "fall":
        this.level = new Fall(this.ctx, this.W, this.H, this.stickman);
        break;
    }
  }

  drawGround() {
    this.ctx.clearRect(0, 0, this.W, this.H);
    for (let i = 0; i < this.W; i += 100) {
      this.ctx.drawImage(this.ground, i, this.H - 6, 100, 100);
    }
  }

  isStickmanColliding() {
    let overlapY, overlapX;
    this.stickman.hit = false;
    if (!this.ghosts || !this.ghosts.ghosts) return false;
    this.ghosts.ghosts.some(ghost => {
      [overlapX, overlapY] = [false, false];
      if (
        this.stickman.posX >= ghost.x &&
        this.stickman.posX <= ghost.x + ghost.w
      ) {
        [this.stickman.leftHit, overlapX] = [true, true];
      }
      if (
        this.stickman.posX + this.stickman.width >= ghost.x &&
        this.stickman.posX + this.stickman.width <= ghost.x + ghost.w
      ) {
        [this.stickman.rightHit, overlapX] = [true, true];
      }
      if (
        this.stickman.posY >= ghost.y &&
        this.stickman.posY <= ghost.y + ghost.h
      ) {
        [this.stickman.topHit, overlapY] = [true, true];
      }
      if (
        this.stickman.posY + this.stickman.height >= ghost.y &&
        this.stickman.posY + this.stickman.height <= ghost.y + ghost.h
      ) {
        [this.stickman.bottomHit, overlapY] = [true, true];
      }
      if (overlapX && overlapY) {
        this.stickman.hit = true;
        return true;
      } else {
        this.stickman.rightHit = false;
        this.stickman.leftHit = false;
        this.stickman.topHit = false;
        this.stickman.bottomHit = false;
      }
    });

    return this.stickman.hit;
  }

  isTouchingOrb() {
    if (!this.level.orb) {
      return false;
    }
    const orb = this.level.orb;
    const stickman = this.stickman;

    const centersDistance = Math.sqrt(
      Math.pow(orb.posX - stickman.posX, 2) +
        Math.pow(orb.posY - stickman.posY, 2)
    );

    return centersDistance < orb.radius + (stickman.width - 30) / 2;
  }
}
