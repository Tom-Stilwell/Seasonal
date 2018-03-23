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

  const snowfall = new Snowfall(ctx, W, H - 84);
  const stickman = new Stickman(ctx, W, H - 86);
  stickman.bindMovements();
  const ghosts = new Ghosts(ctx, W, H - 90);
  ghosts.createGhosts();
  const screenshot = new Screenshot(snowfall, stickman, ghosts, W, H);
  screenshot.bindEvents();

  const game = new Game(stickman, ghosts);

  function run() {
    stickman.draw();
    snowfall.draw();
    ghosts.draw();
    game.isStickmanColliding();
    requestAnimationFrame(run);
  }

  requestAnimationFrame(run);
});
