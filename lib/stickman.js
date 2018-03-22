export default class Stickman {
  constructor(W, H) {
    this.W = W;
    this.H = H;
    const canvasEl = document.getElementById("stickman-canvas");
    canvasEl.width = W;
    canvasEl.height = H;
    this.ctx = canvasEl.getContext("2d");

    this.player = new Image();
    this.player.src = "./playerRunRight.png";

    this.playerX = W / 2;
    this.playerY = H - 64;
    this.playerOffset = 0;
    this.playerOffset2 = 0;
    this.started = false;

    this.draw = this.draw.bind(this);
  }

  bindMovements() {
    key("left", () => {
      this.playerX -= 10;
      this.playerOffset += 64;
      this.playerOffset2 = this.playerOffset % 320;
      this.player.src = "./playerRunLeft.png";
    });

    key("right", () => {
      this.playerX += 10;
      this.playerOffset += 64;
      this.playerOffset2 = this.playerOffset % 320;
      this.playerOffset2 = 256 - this.playerOffset2;

      this.player.src = "./playerRunRight.png";
    });

    document.addEventListener("keydown", event => {
      switch (event.key) {
        case "ArrowUp":
          if (!this.started) this.playerOffset = 0;
          this.playerOffset += 64;
          this.playerOffset2 = this.playerOffset % 704;
          if (this.player.src.indexOf("Left") > -1)
            this.player.src = "./jumpLeft.png";
          if (this.player.src.indexOf("Right") > -1)
            this.player.src = "./jumpRight.png";
          this.started = true;

          if (this.playerOffset2 >= 256 && this.playerOffset2 < 384) {
            this.playerY -= 50;
          } else if (this.playerOffset2 >= 384 && this.playerOffset2 < 512) {
            this.playerY += 50;
          } else if (this.playerOffset2 === 640) this.started = false;

          if (this.player.src.indexOf("Right") > -1)
            this.playerOffset2 = 640 - this.playerOffset2;
      }
    });

    document.addEventListener("keyup", e => {
      this.playerY = this.H - 60;
      this.playerOffset = 0;
      this.playerOffset2 = 0;
      if (this.player.src.indexOf("jump") > -1) this.playerOffset2 = 64;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.W, this.H);
    this.ctx.drawImage(
      this.player,
      this.playerOffset2,
      0,
      64,
      64,
      this.playerX,
      this.playerY,
      64,
      64
    );
  }
}
