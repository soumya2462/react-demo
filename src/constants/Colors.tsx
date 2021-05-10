enum Color {
  White = 'rgb(255, 255, 255)',
  Black = 'rgb(0, 0, 0)',
  DarkBlue = 'rgb(13, 37, 58)',
}

export const addAlpha = (color: Color, alpha: number) => `rgba(${color.slice(4, color.length-1)}, ${alpha})`;

export default Color;