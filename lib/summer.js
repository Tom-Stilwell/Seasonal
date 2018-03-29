import Orb from "./orb";

export default class Summer {
  constructor(ctx, W, H, stickman) {
    this.ctx = ctx;
    this.W = W;
    this.H = H;
    this.stickman = stickman;

    document.getElementById("canvases").style.background = "#ff8566";

    this.orb = new Orb(this.ctx, [this.W / 2, 300], "brown");

    this.maxSuns = 5;
    this.suns = new Array(this.maxSuns);

    for (let i = 0; i < this.maxSuns; i++) {
      this.suns[i] = {
        x: (i + 1) * this.W / (this.maxSuns + 1),
        y: 100 + 100 * (i % 2)
      };
    }

    this.smoke = new Image();
    this.smoke.src = "./smoke.png";

    this.smokes = [];
    this.smoking = true;
  }

  drawSuns() {
    this.suns.forEach(sun => {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(sun.x, sun.y, 50, 0, Math.PI * 2);
      let gradient = this.ctx.createRadialGradient(
        sun.x,
        sun.y,
        5,
        sun.x,
        sun.y,
        50
      );
      gradient.addColorStop(0, "orange");
      gradient.addColorStop(1, "yellow");
      this.ctx.shadowBlur = 100;
      this.ctx.shadowColor = "yellow";
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
      this.ctx.restore();
    });
  }

  drawSmoke() {
    if (this.smoking) {
      this.smokes.push({
        x: this.stickman.posX + 22,
        y: this.stickman.posY - 36,
        times: 0
      });
      this.smoking = false;
    } else {
      this.smoking = true;
    }
    this.smokes.forEach(smoke => {
      if (smoke.times <= 5) {
        this.ctx.filter = `opacity(${1 / (smoke.times + 1)})`;
        this.ctx.drawImage(
          this.smoke,
          650,
          450,
          200,
          450,
          smoke.x,
          smoke.y,
          20,
          36
        );
        this.ctx.filter = "none";
      } else {
        this.smokes.shift();
      }

      smoke.y -= 10;
      if (this.smoking) smoke.times++;
    });
  }

  draw() {
    this.drawSuns();
    this.drawSmoke();
    this.orb.draw();
  }
}
