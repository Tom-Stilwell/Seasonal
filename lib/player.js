function player() {
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
}
