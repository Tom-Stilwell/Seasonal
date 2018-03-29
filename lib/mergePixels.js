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

export default mergePixels;
