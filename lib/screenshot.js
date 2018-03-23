import mergePixels from "./mergePixels";

export default class Screenshot {
  constructor(weather, stickman, ghosts, W, H) {
    this.weather = weather;
    this.stickman = stickman;
    this.ghosts = ghosts;
    this.W = W;
    this.H = H;

    this.bindEvents = this.bindEvents.bind(this);
  }

  bindEvents() {
    document.addEventListener("keypress", e => {
      if (e.keyCode !== 32) return;
      const data = this.weather.ctx.getImageData(0, 0, this.W, this.H).data;
      // const stickData = this.stickman.ctx.getImageData(0, 0, this.W, this.H)
      //   .data;
      // const ghostsData = this.ghosts.ctx.getImageData(0, 0, this.W, this.H)
      //   .data;

      // console.log(ghostsData);
      // for (let i = 0; i < ghostsData.length; i++) {
      //   if (ghostsData[i] !== 0) {
      //     console.log(ghostsData[i]);
      //   }
      // }
      // console.log(ghostsData);
      // const data = mergePixels(stickData, weatherData, ghostsData);

      for (let i = 0; i < data.length; i += 4) {
        if (
          data[i] === 0 &&
          data[i + 1] === 0 &&
          data[i + 2] === 0 &&
          data[i + 3] === 0
        ) {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
          data[i + 3] = 255;
        } else if (data[i] === 255 && data[i + 3] === 3) {
          data[i + 3] = 255;
        } else {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        }
      }

      const screenshotCanvas = document.getElementById("screenshot-canvas");
      screenshotCanvas.width = this.W;
      screenshotCanvas.height = this.H;
      const screenshotCtx = screenshotCanvas.getContext("2d");

      const newImage = screenshotCtx.createImageData(this.W, this.H);
      for (let i = 0; i < newImage.data.length; i++) {
        newImage.data[i] = data[i];
      }

      screenshotCtx.putImageData(newImage, 0, 0);
      setTimeout(() => {
        screenshotCtx.clearRect(0, 0, this.W, this.H);
      }, 2000);
    });
  }
}
