import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import useSidebarStore from '../store/sidebarState';
import useMainColorStore from '../store/colorState';
import { useMainColor } from '../composable/useMainColor';

const WorkSpaceLayout = () => {
  const isSidebarOpen = useSidebarStore(state => state.isOpen);
  const mainColor = useMainColorStore(state => state.color);
  const { textColor } = useMainColor(mainColor);
  return (
    <Box display="flex" width="100%" overflow="hidden" h="calc(100% - 4rem)">
      <aside>
        <Sidebar />
      </aside>
      <Box
        as="section"
        flex="1"
        width={isSidebarOpen ? 'calc(100% - 20rem)' : 'calc(100% - 2rem)'}
        maxW={isSidebarOpen ? 'calc(100% - 20rem)' : 'calc(100% - 2rem)'}
        marginLeft={isSidebarOpen ? '20rem' : '2rem'}
      >
        <Box py="4" px="8" bg={mainColor} width="100%" color={textColor} h="100%">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default WorkSpaceLayout;
