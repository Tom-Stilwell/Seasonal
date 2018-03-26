export default class Ghosts {
  constructor(ctx, W, H, season) {
    this.ctx = ctx;

    this.W = W;
    this.H = H;

    this.season = season;

    this.createGhosts();
  }

  createGhosts() {
    switch (this.season) {
      case "winter":
        this.ghosts = [
          { x: this.W / 3, y: this.H - 100, w: 100, h: 100 },
          { x: this.W / 3 - 150, y: this.H - 200, w: 100, h: 100 },
          { x: this.W / 3 + 50, y: this.H - 300, w: 100, h: 100 },
          { x: this.W / 3 + 150, y: this.H - 300, w: 100, h: 100 },
          { x: this.W / 3 + 250, y: this.H - 300, w: 100, h: 100 }
        ];
        break;
      case "spring":
        this.ghosts = [
          { x: this.W - 100, y: this.H - 100, w: 100, h: 100 },
          { x: this.W - 300, y: this.H - 200, w: 100, h: 100 },
          { x: this.W / 3 + 100, y: this.H - 300, w: 100, h: 100 },
          { x: this.W / 3 + 200, y: this.H - 300, w: 100, h: 100 },
          { x: this.W / 3 + 300, y: this.H - 300, w: 100, h: 100 },
          { x: this.W / 3 + 100, y: this.H - 200, w: 100, h: 100 },
          { x: this.W / 3 + 100, y: this.H - 100, w: 100, h: 100 }
        ];
        break;
      case "summer":
        this.ghosts = [
          { x: 300, y: this.H - 300, w: 100, h: 100 },
          { x: 300, y: this.H - 200, w: 100, h: 100 },
          { x: 300, y: this.H - 100, w: 100, h: 100 }
        ];
        break;
      case "fall":
        this.ghosts = [];
        break;
    }
  }

  draw() {
    if (this.season === "fall") {
      this.ctx.beginPath();
      this.ctx.moveTo(400, 200);
      this.ctx.lineTo(600, 300);
      this.ctx.lineTo(400, 400);
      this.ctx.lineWidth = 15;
      this.ctx.strokeStyle = "rgba(230, 0, 0, .01)";
      this.ctx.stroke();
      return;
    }
    this.ghosts.forEach(ghost => {
      this.ctx.beginPath();
      this.ctx.rect(ghost.x, (ghost.y -= 0.01), ghost.w, ghost.h);
      this.ctx.lineWidth = "4";
      this.ctx.strokeStyle = "rgba(230, 0, 0, .01)";
      this.ctx.stroke();
    });
  }
}
