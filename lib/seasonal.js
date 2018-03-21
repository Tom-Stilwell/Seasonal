document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");

  const ctx = canvasEl.getContext("2d");

  const W = window.innerWidth;
  const H = window.innerHeight;

  canvasEl.width = W;
  canvasEl.height = H;

  const mp = 100;
  const particles = [];
  for (let i = 0; i < mp; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 4 + 1,
      d: Math.random() * mp
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    let particle;
    for (let i = 0; i < mp; i++) {
      particle = particles[i];
      ctx.moveTo(particle.x, particle.y);
      ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    update();
  }

  let angle = 0;
  function update() {
    angle += 0.01;
    let particle;
    for (let i = 0; i < mp; i++) {
      particle = particles[i];

      particle.y += Math.cos(angle + particle.d) + 1 + particle.r / 2;
      particle.x += Math.sin(angle) * 2;

      if (particle.x > W + 5 || particle.x < -5 || particle.y > H) {
        if (i % 3 > 0) {
          particles[i] = {
            x: Math.random() * W,
            y: -10,
            r: particle.r,
            d: particle.d
          };
        } else {
          if (Math.sin(angle) > 0) {
            //Enter from the left
            particles[i] = {
              x: -5,
              y: Math.random() * H,
              r: particle.r,
              d: particle.d
            };
          } else {
            //Enter from the right
            particles[i] = {
              x: W + 5,
              y: Math.random() * H,
              r: particle.r,
              d: particle.d
            };
          }
        }
      }
    }
  }

  //animation loop
  setInterval(draw, 33);
});
