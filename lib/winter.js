import Orb from "./orb";

export default class Winter {
  constructor(ctx, W, H) {
    this.mp = 500;
    this.particles = new Array(this.mp);
    for (let i = 0; i < this.mp; i++) {
      this.particles[i] = {
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 3 + 1,
        d: Math.random() * this.mp
      };
    }

    this.ctx = ctx;
    this.W = W;
    this.H = H;
    this.angle = 0;

    document.getElementById("canvases").style.background = "#6b92b9";
    this.orb = new Orb(this.ctx, [this.W / 1.3, this.H / 3], "pink");

    this.draw = this.draw.bind(this);
  }

  draw() {
    // this.ctx.clearRect(0, 0, this.W, this.H + 4);
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    this.ctx.beginPath();
    let particle;
    for (let i = 0; i < this.mp; i++) {
      particle = this.particles[i];
      this.ctx.moveTo(particle.x, particle.y);
      this.ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, true);
    }
    this.ctx.fill();
    this.orb.draw();
    this.update();
  }

  update() {
    this.angle += 0.005;
    let particle;
    for (let i = 0; i < this.mp; i++) {
      particle = this.particles[i];

      particle.y += Math.cos(this.angle + particle.d) + 1 + particle.r / 2;
      particle.x += Math.sin(this.angle) * 2;

      if (particle.x > this.W + 5 || particle.x < -5 || particle.y > this.H) {
        if (i % 10 > 0) {
          this.particles[i] = {
            x: Math.random() * this.W,
            y: -10,
            r: particle.r,
            d: particle.d
          };
        } else {
          if (Math.sin(this.angle) > 0) {
            //Enter from the left
            this.particles[i] = {
              x: -5,
              y: Math.random() * this.H,
              r: particle.r,
              d: particle.d
            };
          } else {
            //Enter from the right
            this.particles[i] = {
              x: this.W + 5,
              y: Math.random() * this.H,
              r: particle.r,
              d: particle.d
            };
          }
        }
      }
    }
  }
}
