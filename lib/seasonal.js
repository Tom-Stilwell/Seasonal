import Screenshot from "./screenshot";
import Stickman from "./stickman";
import Ghosts from "./ghosts";
import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");
  const ctx = canvasEl.getContext("2d");
  let W = 1000;
  let H = W / 2;
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

  const muter = document.getElementById("mute");
  const unmuter = document.getElementById("unmute");
  muter.addEventListener("click", () => {
    document.getElementById("audio").muted = true;
    muter.style.display = "none";
    unmuter.style.display = "block";
  });

  unmuter.addEventListener("click", () => {
    document.getElementById("audio").muted = false;
    muter.style.display = "block";
    unmuter.style.display = "none";
  });

  function run() {
    game.run();
    requestAnimationFrame(run);
  }

  requestAnimationFrame(run);
});
