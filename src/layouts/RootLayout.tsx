import { Box, HStack } from '@chakra-ui/react';
import { Outlet, useParams } from 'react-router-dom';
import useColorStore from '../store/colorState';
import { useMainColor } from '../composable/useMainColor';
import TrelloHeader from '../components/header';
import { useEffect } from 'react';
import theme from '../theme';

const RootLayout = () => {
  const { boardId } = useParams();
  const { color: mainColor, setColor } = useColorStore();

  useEffect(() => {
    if (!boardId && mainColor !== theme.colors.basic) {
      setColor(theme.colors.basic);
    }
  }, [boardId]);

  const { textColor, sideBarColor, borderColor } = useMainColor(mainColor);

  return (
    <Box h="100vh" maxH="100vh" overflow="hidden">
      <header>
        <HStack
          h="4rem"
          maxH="4rem"
          p={4}
          color={textColor}
          fontSize="text-lg"
          bgColor={sideBarColor}
          border="1px solid transparent"
          borderBottomColor={borderColor}
        >
          <TrelloHeader />
        </HStack>
      </header>
      <Outlet />
    </Box>
  );
};

export default RootLayout;
