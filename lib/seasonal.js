import snowfall from "./snowfall";
import sprite from "./sprite";

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");

  const ctx = canvasEl.getContext("2d");

  let W = window.innerWidth;
  let H = window.innerHeight;

  canvasEl.width = W;
  canvasEl.height = H;

  const ground = new Image();
  ground.src = "./blocks.png";
  // ground.crossOrigin = "Anonymous";
  ground.onload = function() {
    for (let i = 0; i < W; i += 100) {
      ctx.drawImage(ground, i, H - 90, 100, 100);
    }
  };

  key("space", () => {
    // const screenshot = canvasEl.toDataURL("image/png");
    // window.location.href = screenshot.replace(
    //   "image/png",
    //   "image/octet-stream"
    // );
    // console.log(screenshot);
    const pixels = ctx.getImageData(0, 0, W, H);
    // const data = pixels.data;
    const screenshotCanvas = document.getElementById("screenshot-canvas");

    const screenshotCtx = screenshotCanvas.getContext("2d");
    screenshotCanvas.width = W;
    screenshotCanvas.height = H;

    screenshotCtx.putImageData(pixels, 0, 0);
  });

  // const playerSprite = sprite({
  //   context: ctx,
  //   width: 100,
  //   height: 100,
  //   image: player
  // });

  snowfall(canvasEl, ctx, W, H - 90);
});
