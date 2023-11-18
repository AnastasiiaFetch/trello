import { Box, HStack, Text } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import useColorStore from '../store/colorState';
import { useMainColor } from '../utils/useMainColor';
import TrelloHeader from '../components/header';

const RootLayout = () => {
  const mainColor = useColorStore(state => state.color);
  const { textColor, sideBarColor, borderColor } = useMainColor(mainColor);
  return (
    <Box h="100vh" maxH="100vh">
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
