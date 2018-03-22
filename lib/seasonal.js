import Snowfall from "./snowfall";
import Sprite from "./sprite";
import Screenshot from "./screenshot";
import Stickman from "./stickman";
import Ghosts from "./ghosts";

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");
  const ctx = canvasEl.getContext("2d");
  let W = window.innerWidth;
  let H = window.innerHeight;
  canvasEl.width = W;
  canvasEl.height = H;

  const ground = new Image();
  ground.src = "./blocks.png";
  ground.onload = () => {
    for (let i = 0; i < W; i += 100) {
      ctx.drawImage(ground, i, H - 90, 100, 100);
    }
  };

  const snowfall = new Snowfall(ctx, W, H - 88);
  const stickman = new Stickman(W, H - 86);
  stickman.bindMovements();
  const ghosts = new Ghosts(W, H - 90);
  const screenshot = new Screenshot(snowfall, stickman, ghosts, W, H);
  screenshot.bindEvents();

  setInterval(() => {
    stickman.draw();
    snowfall.draw();
    ghosts.draw();
  }, 26);
});
