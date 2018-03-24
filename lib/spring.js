import Orb from "./orb";

export default class Spring {
  constructor(ctx, W, H) {
    this.ctx = ctx;

    this.colors = [
      "#80ff80",
      "#ff80d5",
      "#ff8533",
      "#ffff4d",
      "#84e1e1",
      "#ff99bb",
      "#ff531a",
      "#4d4dff"
    ];

    document.getElementById("canvases").style.background = "#99ff99";

    this.W = W;
    this.H = H;

    this.orb = new Orb(this.ctx, [100, 400], "yellow");

    this.centers = [];
    this.stems = [];
    this.petals = [];
    this.makeFlowers(20);

    this.centersInc = new Array(this.centers.length);
    for (let i = 0; i < this.centers.length; i++) {
      this.centersInc[i] = this.centers[i];
      this.centersInc[i].radius = 0;
    }

    this.petalsInc = new Array(this.petals.length);

    for (let i = 0; i < this.petals.length; i++) {
      this.petalsInc[i] = {};
      this.petalsInc[i].start = this.petals[i].start.slice();
      this.petalsInc[i].point1 = this.petals[i].start.slice();
      this.petalsInc[i].point2 = this.petals[i].start.slice();
      this.petalsInc[i].point3 = this.petals[i].start.slice();
    }

    this.stemsInc = new Array(this.stems.length);

    for (let i = 0; i < this.stems.length; i++) {
      this.stemsInc[i] = {};
      this.stemsInc[i].x = this.stems[i].x;
      this.stemsInc[i].y = this.stems[i].y;
      this.stemsInc[i].width = this.stems[i].width;
      this.stemsInc[i].height = 0;
    }

    this.draw = this.draw.bind(this);
    this.done = false;
  }

  randomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  makeFlowers(num) {
    let center, stem, petal1, petal2, petal3, petal4;
    for (let i = 0; i < num; i++) {
      center = {
        x: Math.floor(Math.random() * (this.W - 200)) + 100,
        y: Math.floor(Math.random() * 200) + (this.H - 300),
        maxRadius: Math.floor(Math.random() * 10) + 5,
        color: this.randomColor()
      };

      stem = {
        x: center.x - center.maxRadius / 10,
        y: center.y + center.maxRadius / 2,
        width: center.maxRadius / 5,
        maxHeight: this.H - center.y
      };

      petal1 = {
        start: [center.x + center.maxRadius, center.y],
        maxPoint1: [
          center.x + 5 * center.maxRadius,
          center.y + 5 * center.maxRadius
        ],
        maxPoint2: [center.x + 5 * center.maxRadius, center.y],
        maxPoint3: [
          center.x + 5 * center.maxRadius,
          center.y - 5 * center.maxRadius
        ]
      };

      petal2 = {
        start: [center.x, center.y + center.maxRadius],
        maxPoint1: [
          center.x - 5 * center.maxRadius,
          center.y + 5 * center.maxRadius
        ],
        maxPoint2: [center.x, center.y + 5 * center.maxRadius],
        maxPoint3: [
          center.x + 5 * center.maxRadius,
          center.y + 5 * center.maxRadius
        ]
      };

      petal3 = {
        start: [center.x - center.maxRadius, center.y],
        maxPoint1: [
          center.x - 5 * center.maxRadius,
          center.y + 5 * center.maxRadius
        ],
        maxPoint2: [center.x - 5 * center.maxRadius, center.y],
        maxPoint3: [
          center.x - 5 * center.maxRadius,
          center.y - 5 * center.maxRadius
        ]
      };

      petal4 = {
        start: [center.x, center.y - center.maxRadius],
        maxPoint1: [
          center.x - 5 * center.maxRadius,
          center.y - 5 * center.maxRadius
        ],
        maxPoint2: [center.x, center.y - 5 * center.maxRadius],
        maxPoint3: [
          center.x + 5 * center.maxRadius,
          center.y - 5 * center.maxRadius
        ]
      };

      this.centers.push(center);
      this.stems.push(stem);
      this.petals.push(petal1, petal2, petal3, petal4);
    }
  }

  drawStems() {
    this.ctx.save();
    this.ctx.fillStyle = "green";
    const stems = this.stems;
    const stemsInc = this.stemsInc;
    let stem;
    for (let i = 0; i < stemsInc.length; i++) {
      stem = stemsInc[i];

      this.ctx.beginPath();
      this.ctx.fillRect(stem.x, stem.y, stem.width, stem.height);
      this.ctx.closePath();

      if (Math.round(stem.height) !== stems[i].maxHeight) {
        stem.height += (stems[i].maxHeight - stem.height) / 10;
      }
    }
    this.ctx.restore();
  }

  makePetal(petal) {
    const ctx = this.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(petal.start[0], petal.start[1]);
    ctx.quadraticCurveTo(
      petal.point1[0],
      petal.point1[1],
      petal.point2[0],
      petal.point2[1]
    );
    ctx.quadraticCurveTo(
      petal.point3[0],
      petal.point3[1],
      petal.start[0],
      petal.start[1]
    );
    ctx.closePath();
    ctx.fillStyle = petal.color;
    ctx.fill();
    ctx.restore();
  }

  drawPetals() {
    this.ctx.save();
    this.ctx.beginPath();
    const petals = this.petals;
    const petalsInc = this.petalsInc;
    let petalInc;
    let petal;
    for (let i = 0; i < petalsInc.length; i++) {
      petalInc = petalsInc[i];
      petal = petals[i];

      this.makePetal(petalInc);
      if (Math.round(petalInc.point1[0]) !== petals[i].maxPoint1[0]) {
        this.done = true;
        petalInc.color = this.randomColor();
        petalInc.point1[0] += (petal.maxPoint1[0] - petal.start[0]) / 100;
        petalInc.point1[1] += (petal.maxPoint1[1] - petal.start[1]) / 100;
        petalInc.point2[0] += (petal.maxPoint2[0] - petal.start[0]) / 100;
        petalInc.point2[1] += (petal.maxPoint2[1] - petal.start[1]) / 100;
        petalInc.point3[0] += (petal.maxPoint3[0] - petal.start[0]) / 100;
        petalInc.point3[1] += (petal.maxPoint3[1] - petal.start[1]) / 100;
      }
    }
  }

  makeCenter(x, y, radius, color) {
    // console.log(radius);
    const ctx = this.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  drawCenters() {
    const centers = this.centers.slice();
    const centersInc = this.centersInc.slice();

    let center;
    let centerInc;
    for (let i = 0; i < centersInc.length; i++) {
      center = centers[i];
      centerInc = centersInc[i];
      this.makeCenter(
        centerInc.x,
        centerInc.y,
        centerInc.radius,
        centerInc.color
      );
      if (Math.round(centerInc.radius) <= center.maxRadius) {
        centerInc.radius += (center.maxRadius - centerInc.radius) / 10;
      }
    }
  }

  draw() {
    // console.log(this.done);
    this.drawStems();
    this.drawCenters();
    this.drawPetals();
    this.orb.draw();
  }
}
