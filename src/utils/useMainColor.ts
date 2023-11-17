import color from 'color';

// Кольорова схема
const DARK_TEXT_COLOR: string = '#172b4d';
const LIGHT_TEXT_COLOR: string = '#FAFAFA';

interface MainColor {
  sideBarColor: string;
  textColor: string;
  colorWithNoOpacity: string;
  oppositeTextColor: string;
  lightBg: string;
  darkBg: string;
}

export const useMainColor = (bodyColor: string): MainColor => {
  // Колір без прозорості
  const colorWithNoOpacity: string = color(bodyColor).darken(0.2).alpha(1).rgb().string();

  // Колір бічної панелі
  const sideBarColor: string = color(bodyColor).darken(0.2).alpha(0.6).rgb().string();

  // Текстовий колір
  const darkTextColor: string = color(DARK_TEXT_COLOR).lightness(10).alpha(0.8).rgb().string();
  const lightTextColor: string = color(LIGHT_TEXT_COLOR).lightness(100).alpha(0.8).rgb().string();
  const textColor: string = color(sideBarColor).luminosity() > 0.5 ? darkTextColor : lightTextColor;
  const oppositeTextColor: string =
    color(sideBarColor).luminosity() > 0.5 ? lightTextColor : darkTextColor;

  // Колір при наведенні
  const lightBg: string = color(LIGHT_TEXT_COLOR).lightness(100).alpha(0.2).rgb().string();
  const darkBg: string = color('#171923').lightness(80).alpha(0.2).rgb().string();

  return { sideBarColor, textColor, colorWithNoOpacity, oppositeTextColor, lightBg, darkBg };
};
