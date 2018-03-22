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
    this.runOffset = 0;
    this.runOffset2 = 0;

    this.jumpOffset = 0;
    this.jumpOffset2 = 0;
    this.started = false;

    this.draw = this.draw.bind(this);
    this.keys = { left: false, right: false, up: false, down: false };

    this.jumps = 0;
  }

  bindMovements() {
    document.addEventListener("keydown", event => {
      switch (event.key) {
        case "ArrowUp":
          this.keys.up = true;
          break;
        case "ArrowLeft":
          this.keys.left = true;
          break;
        case "ArrowRight":
          this.keys.right = true;
          break;
        case "ArrowDown":
          this.keys.down = true;
          break;
        default:
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.key) {
        case "ArrowUp":
          this.keys.up = false;
          break;
        case "ArrowLeft":
          this.keys.left = false;
          break;
        case "ArrowRight":
          this.keys.right = false;
          break;
        case "ArrowDown":
          this.keys.down = false;
          break;
        default:
          break;
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.W, this.H);
    this.update();

    let spriteOffset = this.keys.up ? this.jumpOffset2 : this.runOffset2;
    if (this.playerY > this.H - 100) this.playerY = this.H - 100;
    this.ctx.drawImage(
      this.player,
      spriteOffset,
      0,
      64,
      64,
      this.playerX,
      this.playerY,
      100,
      100
    );
  }

  update() {
    if (this.keys.up) {
      if (this.jumps % 5 === 0) {
        if (!this.started) this.jumpOffset = 0;
        this.jumpOffset += 64;
        this.jumpOffset = this.jumpOffset % 704;
        if (this.keys.left || this.player.src.indexOf("Left") > -1)
          this.player.src = "./jumpLeft.png";
        if (this.keys.right || this.player.src.indexOf("Right") > -1)
          this.player.src = "./jumpRight.png";
        this.started = true;
      }
      if (this.jumpOffset >= 256 && this.jumpOffset < 384) {
        this.playerY -= 30;
      } else if (this.jumpOffset >= 384 && this.jumpOffset < 512) {
        this.playerY += 30;
      } else if (this.jumpOffset === 640) {
        this.started = false;
      }

      if (this.player.src.indexOf("Right") > -1) {
        this.jumpOffset2 = 640 - this.jumpOffset;
      } else {
        this.jumpOffset2 = this.jumpOffset;
      }

      this.jumps++;
    } else {
      if (this.playerY < this.H - 100) this.playerY += 30;
      this.started = false;
      this.jumpOffset = 64;
      this.jumpOffset2 = 64;
    }

    if (this.keys.left) {
      this.playerX -= 10;
      if (!this.keys.up) {
        this.runOffset += 64;
        this.runOffset2 = this.runOffset % 320;
        this.player.src = "./playerRunLeft.png";
      } else if (this.jumpOffset < 256) {
        this.playerX += 10;
      }
    }

    if (this.keys.right) {
      this.playerX += 10;
      if (!this.keys.up) {
        this.runOffset += 64;
        this.runOffset2 = this.runOffset % 320;
        this.runOffset2 = 256 - this.runOffset2;

        this.player.src = "./playerRunRight.png";
      } else if (this.jumpOffset < 256) {
        this.playerX -= 10;
      }
    }
  }
}
