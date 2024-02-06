import { Box, HStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { useMainColor } from '../composable/useMainColor';
import TrelloHeader from '../components/header/TrelloHeader';

const RootLayout = () => {
  const { textColor, sideBarColor, borderColor, bodyColor } = useMainColor();

  return (
    <Box h="100vh" maxH="100vh" overflow="hidden" bgColor={bodyColor}>
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
