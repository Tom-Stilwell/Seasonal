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
  ground.onload = function() {
    for (let i = 0; i < W; i += 100) {
      ctx.drawImage(ground, i, H - 90, 100, 100);
    }
  };

  // const playerSprite = sprite({
  //   context: ctx,
  //   width: 100,
  //   height: 100,
  //   image: player
  // });

  snowfall(canvasEl, ctx, W, H - 90);
});
