import Snowfall from "./snowfall";
import Spring from "./spring";
import Stickman from "./stickman";
import Ghosts from "./ghosts";

export default class Game {
  constructor(ctx, W, H) {
    this.ctx = ctx;
    this.W = W;
    this.H = H - 84;

    this.levelType = "spring";
    this.stickman = new Stickman(this.ctx, this.W, this.H - 2);
    this.ghosts = new Ghosts(this.ctx, this.W, this.H - 6);
    // this.level = new Snowfall(this.ctx, this.W, this.H);
    this.level = new Spring(this.ctx, this.W, this.H);

    this.orb = this.level.orb;
  }

  run() {
    this.ctx.clearRect(
      0,
      0,
      this.W,
      (this.H = this.levelType === "winter" ? this.H - 0.01 : this.H)
    );
    this.level.draw();
    this.ghosts.draw();
    this.stickman.draw(this.H);
    this.isStickmanColliding();
    // this.isTouchingOrb();
  }

  isStickmanColliding() {
    let overlapY, overlapX;
    this.stickman.hit = false;

    this.ghosts.ghosts.some(ghost => {
      [overlapX, overlapY] = [false, false];
      if (
        this.stickman.posX >= ghost.x &&
        this.stickman.posX <= ghost.x + ghost.w
      ) {
        [this.stickman.leftHit, overlapX] = [true, true];
        // console.log("left!");
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
        // console.log("top!");
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
      }
    });

    return this.stickman.hit;
  }

  isTouchingOrb() {
    const orb = this.orb;
    const stickman = this.stickman;

    const centersDistance = Math.sqrt(
      Math.pow(orb.posX - stickman.posX, 2) +
        Math.pow(orb.posY - stickman.posY, 2)
    );

    if (centersDistance < orb.radius + stickman.width / 2) {
      console.log("touch!");
    }

    return centersDistance < orb.radius + stickman.width / 2;
  }
}
