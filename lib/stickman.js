export default class Stickman {
  constructor(ctx, W, H) {
    this.ctx = ctx;
    this.W = W;
    this.H = H;

    this.width = 64;
    this.height = 64;
    this.posX = W / 2;
    this.posY = H - 64;
    this.hit = false;
    this.rightHit = false;
    this.leftHit = false;
    this.topHit = false;
    this.bottomHit = false;

    this.imageSources = [
      "./playerRunRight.png",
      "./playerRunLeft.png",
      "./jumpRight.png",
      "./jumpLeft.png"
    ];

    this.images = new Array(4);
    this.preloadImages();

    this.bindMovements();

    this.player = this.images[0];

    this.runOffset = 0;
    this.runOffset2 = 0;

    this.jumpOffset = 0;
    this.jumpOffset2 = 0;
    this.startedJumping = false;

    this.draw = this.draw.bind(this);
    this.keys = { left: false, right: false, up: false, down: false };

    this.jumps = 0;
    this.wraps = 0;
  }

  preloadImages() {
    let image;
    for (let i = 0; i < this.imageSources.length; i++) {
      image = new Image();
      image.src = this.imageSources[i];
      this.images[i] = image;
    }
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

  draw(newHeight) {
    // this.ctx.clearRect(0, 0, this.W, (this.H = this.H - 0.01));
    this.H = newHeight;

    let spriteOffset = this.keys.up ? this.jumpOffset2 : this.runOffset2;
    if (this.posY > this.H - 64) this.posY = this.H - 64;
    if (this.posY < this.H - 64 && !this.bottomHit) this.posY += 10;
    this.ctx.filter = "brightness(50%)";
    this.ctx.drawImage(
      this.player,
      spriteOffset,
      0,
      64,
      64,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    this.ctx.filter = "none";
    this.update();
  }

  parseCollisions() {
    // console.log(this.hit);
    if (!this.hit) {
      this.rightHit = false;
      this.leftHit = false;
      this.topHit = false;
      this.bottomHit = false;
    } else {
      if (this.bottomHit) {
        this.rightHit = false;
        this.leftHit = false;
      }
      if (this.rightHit && !this.bottomHit) this.posX -= 2;
      if (this.leftHit && !this.bottomHit) this.posX += 2;
      if (this.topHit) this.posY += 10;
    }
  }

  checkJump() {
    if (this.keys.up) {
      if (this.jumps % 5 === 0) {
        if (!this.startedJumping) this.jumpOffset = 0;
        this.jumpOffset += 64;
        this.jumpOffset = this.jumpOffset % 704;
        if (this.keys.left || this.player.src.indexOf("Left") > -1)
          this.player = this.images[3];
        if (this.keys.right || this.player.src.indexOf("Right") > -1)
          this.player = this.images[2];
        this.startedJumping = true;
      }
      if (this.jumpOffset >= 256 && this.jumpOffset < 384) {
        this.posY -= 20;
      } else if (
        this.jumpOffset >= 384 &&
        this.jumpOffset < 512 &&
        !this.bottomHit
      ) {
        this.posY += 10;
      } else if (this.jumpOffset === 640) {
        this.startedJumping = false;
      }

      if (this.player.src.indexOf("Right") > -1) {
        this.player = this.images[2];
        this.jumpOffset2 = 640 - this.jumpOffset;
      } else {
        this.jumpOffset2 = this.jumpOffset;
      }

      this.jumps++;
    } else {
      if (this.posY < this.H - 64 && !this.bottomHit) this.posY += 20;
      this.startedJumping = false;
      this.jumpOffset = 64;
      this.jumpOffset2 = 64;
    }
  }

  checkWalk() {
    if (this.keys.left && !this.leftHit) {
      this.posX -= 10;
      if (!this.keys.up) {
        this.runOffset += 64;
        this.runOffset2 = this.runOffset % 320;
        this.player = this.images[1];
      } else if (this.jumpOffset < 256) {
        this.posX += 10;
      }
    }

    if (this.keys.right && !this.rightHit) {
      this.posX += 10;
      if (!this.keys.up) {
        this.runOffset += 64;
        this.runOffset2 = this.runOffset % 320;
        this.runOffset2 = 256 - this.runOffset2;

        this.player = this.images[0];
      } else if (this.jumpOffset < 256) {
        this.posX -= 10;
      }
    }
  }

  wrap() {
    if (this.posX > this.W) {
      this.posX = -this.width / 2;
      this.wraps++;
    }
    if (this.posX + this.width / 2 < 0) {
      this.posX = this.W;
      this.wraps--;
    }
  }

  update() {
    this.parseCollisions();
    this.checkJump();
    this.checkWalk();
    this.wrap();
  }
}
