export default class Ghosts {
  constructor(ctx, W, H, season) {
    this.ctx = ctx;

    this.W = W;
    this.H = H;

    this.season = season || "winter";
  }

  createGhosts() {
    switch (this.season) {
      case "winter":
        this.ghosts = [
          { x: this.W / 3, y: this.H - 100, w: 100, h: 100 },
          { x: this.W / 3 - 100, y: this.H - 200, w: 100, h: 100 },
          { x: this.W / 3 + 100, y: this.H - 300, w: 100, h: 100 }
        ];
    }
  }

  draw() {
    this.ghosts.forEach(ghost => {
      this.ctx.beginPath();
      this.ctx.rect(ghost.x, ghost.y, ghost.w, (ghost.h -= 0.01));
      this.ctx.lineWidth = "4";
      this.ctx.strokeStyle = "rgba(230, 0, 0, .01)";
      this.ctx.stroke();
    });
  }
}
