import { Grid, Text } from '@chakra-ui/react';
import { useMainColor } from '../../composable/useMainColor';

const MainPage = () => {
  const { darkColor } = useMainColor();
  return (
    <Grid color={darkColor} w="50%" alignSelf="center">
      dddd
    </Grid>
  );
};

export default MainPage;
