export default class Ghosts {
  constructor(W, H, season) {
    this.W = W;
    this.H = H;

    const canvasEl = document.getElementById("ghosts-canvas");
    canvasEl.width = W;
    canvasEl.height = H;
    this.ctx = canvasEl.getContext("2d");

    this.ghosts = [];

    this.season = season || "winter";
  }

  createGhosts() {}

  draw() {
    this.ctx.clearRect(0, 0, this.W, this.H);
    this.ctx.beginPath();
    this.ctx.rect(this.W / 3, this.H - 100, 100, 100);
    this.ctx.lineWidth = "10";
    this.ctx.strokeStyle = "rgba(230, 0, 0, .01)";
    this.ctx.stroke();
  }
}
