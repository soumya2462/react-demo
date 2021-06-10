enum Color {
  White = 'rgb(255, 255, 255)',
  Black = 'rgb(0, 0, 0)',
  DarkBlue = 'rgb(13, 37, 58)',
  LightBlue = 'rgb(6, 170, 187)',
  LightGray = 'rgb(237, 242, 249)',
  Gray = 'rgb(95, 122, 142)',
}

export const addAlpha = (color: Color, alpha: number) => `rgba(${color.slice(4, color.length-1)}, ${alpha})`;

export default Color;