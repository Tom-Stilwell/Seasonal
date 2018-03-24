import Screenshot from "./screenshot";
import Stickman from "./stickman";
import Ghosts from "./ghosts";
import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");
  const ctx = canvasEl.getContext("2d");
  let W = 1200;
  let H = 600;
  canvasEl.width = W;
  canvasEl.height = H;

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
