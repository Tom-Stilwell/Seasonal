export default class Screenshot {
  constructor(ctx, W, H) {
    this.ctx = ctx;
    this.W = W;
    this.H = H;

    this.bindEvents = this.bindEvents.bind(this);
  }

  bindEvents() {
    key("space", () => {
      console.log(this.ctx);
      const pixels = this.ctx.getImageData(0, 0, this.W, this.H);
      // const data = pixels.data;
      const screenshotCanvas = document.getElementById("screenshot-canvas");

      const screenshotCtx = screenshotCanvas.getContext("2d");
      screenshotCanvas.width = this.W;
      screenshotCanvas.height = this.H;

      screenshotCtx.putImageData(pixels, 0, 0);
    });
  }
}
