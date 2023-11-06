const stringToColor = (inputString) => {
  let hash = 0;
  for (let i = 0; i < inputString.length; i++) {
    hash = inputString.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = (hash & 0x00ffffff).toString(16).toUpperCase().padStart(6, "0");
  return `#${color}`;
};

const generateShades = (baseColor) => {
  // Parse the base color as an RGB color
  const parsedColor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    baseColor
  );
  const red = parseInt(parsedColor[1], 16);
  const green = parseInt(parsedColor[2], 16);
  const blue = parseInt(parsedColor[3], 16);

  // Calculate a factor for darkening and lightening
  const shadeFactor = 0.6;

  // Generate darker shade with sufficient contrast
  const darkerRed = Math.max(0, Math.floor(red - red * shadeFactor));
  const darkerGreen = Math.max(0, Math.floor(green - green * shadeFactor));
  const darkerBlue = Math.max(0, Math.floor(blue - blue * shadeFactor));
  const darkShade = `#${darkerRed.toString(16).padStart(2, "0")}${darkerGreen
    .toString(16)
    .padStart(2, "0")}${darkerBlue.toString(16).padStart(2, "0")}`;

  // Generate lighter shade with sufficient contrast
  const lighterRed = Math.min(255, Math.floor(red + (255 - red) * shadeFactor));
  const lighterGreen = Math.min(
    255,
    Math.floor(green + (255 - green) * shadeFactor)
  );
  const lighterBlue = Math.min(
    255,
    Math.floor(blue + (255 - blue) * shadeFactor)
  );
  const lightShade = `#${lighterRed.toString(16).padStart(2, "0")}${lighterGreen
    .toString(16)
    .padStart(2, "0")}${lighterBlue.toString(16).padStart(2, "0")}`;

  return [baseColor, darkShade, lightShade];
};

export const generateColor = (inputString) => {
  const [baseColor, darkShade, lightShade] = generateShades(
    stringToColor(inputString)
  );

  return {
    baseColor,
    darkShade,
    lightShade,
  };
};
