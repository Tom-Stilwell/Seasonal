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
  const audio = document.getElementById("audio");
  audio.volume = 0.2;
  muter.addEventListener("click", () => {
    audio.muted = true;
    muter.style.display = "none";
    unmuter.style.display = "block";
  });

  unmuter.addEventListener("click", () => {
    audio.muted = false;
    muter.style.display = "block";
    unmuter.style.display = "none";
  });

  const instructions = document.getElementById("instructions");
  const closer = document.getElementById("close-x");
  const question = document.getElementById("question");
  const starter = document.getElementById("start");

  closer.addEventListener("click", () => {
    instructions.style.display = "none";
    question.style.display = "block";
  });

  starter.addEventListener(
    "click",
    () => {
      starter.style.display = "none";
      instructions.style.display = "none";
      question.style.display = "block";
      closer.style.display = "block";
      run();
    },
    { once: true }
  );
  question.addEventListener("click", () => {
    instructions.style.display = "block";
    question.style.display = "none";
  });

  const stuck = document.getElementById("stuck");
  stuck.addEventListener("click", () => {
    stuck.blur();
    game.resetLevel();
  });

  function run() {
    game.run();
    requestAnimationFrame(run);
  }
});
