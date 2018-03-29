## Overview

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

Seasonal is a game that loops through each season in a year. As the seasons change, the player
comes up against various obstacles, both seen and unseen. The player must use screenshots
that reveal hidden barriers in order to move forward to the next season.

[Live Demo](https://tom-stilwell.github.io/Seasonal/)

## Features

* Small capturable screenshot area and local storage
* Seasonal change
* Ground conditions and interaction
* Environmental movement

### Merge Pixels

A custom algorithm for merging the pixels of overlaid canvases. The canvases can be of variable size
and preference is given to the last argument.

```javascript
function mergePixels(...data) {
  const pixels = new Array(data[0].length);
  const first = data[0];

  for (let i = 0; pixels.length <= first.length; i += 4) {
    let pixelValues = data[data.length - 1].slice(i, i + 4);
    let j = 2;

    while (
      (pixelValues[0] === undefined || pixelValues.every(int => int === 0)) &&
      j < data.length + 1
    ) {
      pixelValues = data[data.length - j].slice(i, i + 4);
      j++;
    }

    if (pixelValues[0]) {
      pixels[i] = pixelValues[0];
      pixels[i + 1] = pixelValues[1];
      pixels[i + 2] = pixelValues[2];
      pixels[i + 3] = pixelValues[3];
    } else {
      [pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]] = [0, 0, 0, 0];
    }
  }

  return pixels;
}
```

### Smoking Head

A function to simulate smoke rising from the stick player's head using a queue.

```javascript
drawSmoke() {
  if (this.smoking) {
    this.smokes.push({
      x: this.stickman.posX + 22,
      y: this.stickman.posY - 36,
      times: 0
    });
    this.smoking = false;
  } else {
    this.smoking = true;
  }
  this.smokes.forEach(smoke => {
    if (smoke.times <= 5) {
      this.ctx.filter = `opacity(${1 / (smoke.times + 1)})`;
      this.ctx.drawImage(
        this.smoke,
        650,
        450,
        200,
        450,
        smoke.x,
        smoke.y,
        20,
        36
      );
      this.ctx.filter = "none";
    } else {
      this.smokes.shift();
    }

    smoke.y -= 10;
    if (this.smoking) smoke.times++;
  });
}
```

## Technologies

* JavaScript
* HTML
* Canvas

## Design

![Seasons](https://github.com/Tom-Stilwell/Seasonal/blob/master/seasons.gif)

The game's design is done entirely with html5 canvas tags. Manipulation of the
DOM is completed via vanilla JavaScript, with no additional libraries used.

## Backend

Possible storage of user's past photos.

Models:

* User
* Photos

## Implementation Timeline

Day 1:

* Build stick player and background for one season
* Explore canvas capabilities

Day 2:

* Complete screenshot capability
* Design other seasons

Day 3:

* Implement ghost blocks
* Add user controls for jumping/traversal
