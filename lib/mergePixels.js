function mergePixels(...data) {
  const pixels = [];
  console.log(data);
  const first = data[0];
  console.log(first.length);
  for (let i = 0; pixels.length <= first.length; i += 4) {
    let pixelValues = data[data.length - 1].slice(i, i + 4);
    let j = 2;
    while (
      (pixelValues[0] === undefined ||
        (pixelValues[0] === 0 &&
          pixelValues[1] === 0 &&
          pixelValues[2] === 0 &&
          pixelValues[3] === 0)) &&
      j < data.length + 1
    ) {
      pixelValues = data[data.length - j].slice(i, i + 4);
      j++;
    }
    if (pixelValues[0]) {
      pixels.push(
        pixelValues[0],
        pixelValues[1],
        pixelValues[2],
        pixelValues[3]
      );
    } else {
      pixels.push(0, 0, 0, 0);
    }
  }

  return pixels;
}

export default mergePixels;
