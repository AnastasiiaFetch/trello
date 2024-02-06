import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import useSidebarStore from '../store/sidebarState';
import { useMainColor } from '../composable/useMainColor';

const WorkSpaceLayout = () => {
  const isSidebarOpen = useSidebarStore(state => state.isOpen);
  const { bodyColor, darkColor } = useMainColor();
  return (
    <Box display="flex" width="100%" h="calc(100% - 4rem)" position="relative">
      <Sidebar />
      <Box
        as="section"
        flex="1"
        width={isSidebarOpen ? 'calc(100% - 20rem)' : 'calc(100% - 2rem)'}
        maxW={isSidebarOpen ? 'calc(100% - 20rem)' : 'calc(100% - 2rem)'}
      >
        <Box py="0" px="0" bg={bodyColor} width="100%" color={darkColor} h="100%">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default WorkSpaceLayout;
