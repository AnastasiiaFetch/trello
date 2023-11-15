import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import useSidebarStore from '../store/sidebarState';
import useMainColorStore from '../store/mainColorState';

const WorkSpaceLayout = () => {
  const isSidebarOpen = useSidebarStore(state => state.isOpen);
  const mainColor = useMainColorStore(state => state.color);
  return (
    <Box display="flex" width="100%" minHeight="100vh">
      <Sidebar />
      <Box
        flex="1"
        width={{ base: '100%', md: isSidebarOpen ? 'calc(100% - 20rem)' : 'calc(100% - 2rem)' }}
        maxW={{ base: '100%', md: isSidebarOpen ? 'calc(100% - 20rem)' : 'calc(100% - 2rem)' }}
        marginLeft={{ base: 'none', md: isSidebarOpen ? '20rem' : '2rem' }}
      >
        <Box py="4" px="5" bg={mainColor} minHeight="100vh" width="100%">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default WorkSpaceLayout;
