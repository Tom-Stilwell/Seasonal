import snowfall from "./snowfall";

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");

  const ctx = canvasEl.getContext("2d");

  let W = window.innerWidth;
  let H = window.innerHeight;

  canvasEl.width = W;
  canvasEl.height = H;

  snowfall(canvasEl, ctx, W, H);
});
