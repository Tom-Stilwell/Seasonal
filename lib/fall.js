import Orb from "./orb";

export default class Fall {
  constructor(ctx, W, H, stickman) {
    this.ctx = ctx;
    this.W = W;
    this.H = H;
    this.stickman = stickman;

    document.getElementById("canvases").style.background = "#6b6b47";

    this.maxDrops = 500;
    this.drops = new Array(this.maxDrops);

    for (let i = 0; i < this.maxDrops; i++) {
      this.drops[i] = {
        x: Math.random() * this.W,
        y: Math.random() * this.H,
        length: Math.random(),
        driftX: Math.random() * 4 - 2,
        driftY: Math.random() * 10 + 10
      };
    }
  }

  drawRain() {
    this.ctx.save();
    this.ctx.strokeStyle = "rgba(174,194,224,0.7)";
    this.ctx.lineWidth = 1;
    this.ctx.lineCap = "round";
    let drop;
    for (let i = 0; i < this.maxDrops; i++) {
      drop = this.drops[i];
      this.ctx.beginPath();
      this.ctx.moveTo(drop.x, drop.y);
      this.ctx.lineTo(
        drop.x + drop.length * drop.driftX,
        drop.y + drop.length * drop.driftY
      );
      this.ctx.stroke();
      this.ctx.closePath();
    }

    this.update();
  }

  update() {
    let drop;
    for (let i = 0; i < this.maxDrops; i++) {
      drop = this.drops[i];
      drop.x += drop.driftX;
      drop.y += drop.driftY;

      if (drop.x > this.W || drop.y > this.H) {
        drop.x = Math.random() * this.W;
        drop.y = -30;
      }
    }
  }

  draw() {
    this.drawRain();
    if (this.stickman.wraps > 1) {
      this.orb =
        this.orb ||
        new Orb(this.ctx, [this.W - 100, this.H - 100], "lightblue");
      this.orb.draw();
    }
  }
}
