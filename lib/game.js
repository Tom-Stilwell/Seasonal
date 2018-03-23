export default class Game {
  constructor(stickman, ghosts) {
    this.stickman = stickman;
    this.ghosts = ghosts;
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
}
