import color from 'color';
import useColorStore from '../store/colorState';

// Кольорова схема
const DARK_COLOR: string = '#172b4d';
const LIGHT_COLOR: string = '#FAFAFA';
const GRAY_COLOR: string = '#A0AEC0';

interface MainColor {
  bodyColor: string;
  darkColor: string;
  sideBarColor: string;
  textColor: string;
  colorWithNoOpacity: string;
  oppositeTextColor: string;
  lightBg: string;
  darkBg: string;
  borderColor: string;
}

export const useMainColor = (): MainColor => {
  const { color: bodyColor } = useColorStore();

  // Колір без прозорості
  const colorWithNoOpacity: string = color(bodyColor).darken(0.2).alpha(1).rgb().string();

  // Колір бічної панелі
  const sideBarColor: string = color(bodyColor).darken(0.2).alpha(0.6).rgb().string();

  // Кольори
  const grayColor: string = color(GRAY_COLOR).lightness(70).alpha(0.8).rgb().string();
  const darkColor: string = color(DARK_COLOR).lightness(10).alpha(0.8).rgb().string();
  const lightColor: string = color(LIGHT_COLOR).lightness(100).alpha(0.8).rgb().string();

  // Текстовий колір
  const textColor: string = color(sideBarColor).luminosity() > 0.4 ? darkColor : lightColor;
  const oppositeTextColor: string = color(sideBarColor).luminosity() > 0.4 ? lightColor : darkColor;

  // Колір при наведенні
  const lightBg: string = color(LIGHT_COLOR).lightness(100).alpha(0.2).rgb().string();
  const darkBg: string = color('#171923').lightness(80).alpha(0.2).rgb().string();

  // Колір бордерів
  const borderColor: string = color(sideBarColor).luminosity() > 0.4 ? grayColor : lightColor;

  return {
    bodyColor,
    colorWithNoOpacity,
    darkColor,
    sideBarColor,
    textColor,
    oppositeTextColor,
    lightBg,
    darkBg,
    borderColor,
  };
};
