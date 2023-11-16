import color from 'color';

export const useMainColor = () => {
  const getSidebarColors = (bodyColor: string) => {
    const backgroundColor = color(bodyColor).darken(0.2).alpha(0.6).rgb().string();
    const textColor =
      color(backgroundColor).luminosity() > 0.5
        ? color('#172b4d').lightness(10).alpha(0.8).rgb().string()
        : color('#FAFAFA').lightness(100).alpha(0.8).rgb().string();

    return { backgroundColor, textColor };
  };

  return getSidebarColors;
};
