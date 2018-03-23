import Snowfall from "./snowfall";
import Screenshot from "./screenshot";
import Stickman from "./stickman";
import Ghosts from "./ghosts";
import Game from "./game";

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

  const game = new Game(ctx, W, H);
  const screenshot = new Screenshot(
    game.level,
    game.stickman,
    game.ghosts,
    W,
    H
  );
  screenshot.bindEvents();

  function run() {
    game.run();
    requestAnimationFrame(run);
  }

  requestAnimationFrame(run);
});
