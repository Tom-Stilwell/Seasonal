export default class Orb {
  constructor(ctx, pos, color) {
    this.posX = pos[0];
    this.posY = pos[1];
    this.ctx = ctx;
    this.color = color;
    this.radius = 30;
  }

  draw() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    let gradient = this.ctx.createRadialGradient(
      this.posX,
      this.posY,
      5,
      this.posX,
      this.posY,
      30
    );
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, this.color);
    this.ctx.shadowBlur = 30;
    this.ctx.shadowColor = "white";
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    this.ctx.restore();
  }
}
