function snowfall(canvasEl, ctx, W, H) {
  const mp = 500;
  const particles = [];
  for (let i = 0; i < mp; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 4 + 1,
      d: Math.random() * mp
    });
  }

  const player = new Image();
  player.src = "./playerRunRight.png";
  // player.crossOrigin = "Anonymous";
  let playerX = W / 2;
  let playerY = H - 60;
  let playerOffset = 0;
  let playerOffset2 = 0;
  let started = false;

  key("left", () => {
    playerX -= 10;
    playerOffset += 64;
    playerOffset2 = playerOffset % 320;
    player.src = "./playerRunLeft.png";
  });

  key("right", () => {
    playerX += 10;
    playerOffset += 64;
    playerOffset2 = playerOffset % 320;
    playerOffset2 = 256 - playerOffset2;

    player.src = "./playerRunRight.png";
  });

  document.addEventListener("keydown", event => {
    switch (event.key) {
      case "ArrowUp":
        if (!started) playerOffset = 0;
        playerOffset += 64;
        playerOffset2 = playerOffset % 704;
        if (player.src.indexOf("Left") > -1) player.src = "./jumpLeft.png";
        if (player.src.indexOf("Right") > -1) player.src = "./jumpRight.png";
        started = true;

        if (playerOffset2 >= 256 && playerOffset2 < 384) {
          playerY -= 50;
        } else if (playerOffset2 >= 384 && playerOffset2 < 512) {
          playerY += 50;
        } else if (playerOffset2 === 640) started = false;

        if (player.src.indexOf("Right") > -1)
          playerOffset2 = 640 - playerOffset2;
    }
  });

  document.addEventListener("keyup", e => {
    playerY = H - 60;
    playerOffset = 0;
    playerOffset2 = 0;
    if (player.src.indexOf("jump") > -1) playerOffset2 = 64;
  });

  function draw() {
    ctx.clearRect(0, 0, W, H + 4);

    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    let particle;
    for (let i = 0; i < mp; i++) {
      particle = particles[i];
      ctx.moveTo(particle.x, particle.y);
      ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, true);
    }
    ctx.fill();

    ctx.drawImage(player, playerOffset2, 0, 64, 64, playerX, playerY, 64, 64);

    update();
  }

  let angle = 0;
  function update() {
    angle += 0.005;
    let particle;
    for (let i = 0; i < mp; i++) {
      particle = particles[i];

      particle.y += Math.cos(angle + particle.d) + 1 + particle.r / 2;
      particle.x += Math.sin(angle) * 2;

      if (particle.x > W + 5 || particle.x < -5 || particle.y > H) {
        if (i % 10 > 0) {
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
  setInterval(draw, 26);
}

export default snowfall;
