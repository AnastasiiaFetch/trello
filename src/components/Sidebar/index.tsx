import { Box, VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import useSidebarStore from '../../store/sidebarState';
import ChevronRight from '../../elements/icons/ChevronRight';
import X from '../../elements/icons/X';
import IconButton from '../../elements/button/IconButton';
import { useMainColor } from '../../composable/useMainColor';
import useMainColorStore from '../../store/colorState';
import BasicSelectItem from '../../elements/custom-select/BoardSelectItem';

const sidebarVariants = {
  open: {
    opacity: 1,
    display: 'flex',
    transition: { duration: 0.1 },
  },
  closed: { opacity: 0, transitionEnd: { display: 'none' }, transition: { duration: 0.1 } },
};

const sidebarContentVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.15 } },
};

const Sidebar = () => {
  const { isOpen: isSidebarOpen, setSidebarOpen: setSidebarOpen } = useSidebarStore.getState();

  const { textColor, sideBarColor, borderColor } = useMainColor();

  return (
    <Box display="flex" zIndex="9" userSelect="none">
      {!isSidebarOpen && (
        <VStack
          position="relative"
          p="4"
          bg={sideBarColor}
          h="100vh"
          maxW="2rem"
          alignItems="center"
          borderRight="1px solid"
          borderColor={borderColor}
        >
          <IconButton
            aria-label="open-sidebar-btn"
            size="sm"
            variant="primary"
            position="absolute"
            borderColor={borderColor}
            right={-3}
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            icon={<ChevronRight color={textColor} />}
          />
        </VStack>
      )}
      <AnimatePresence>
        <Box
          bg={sideBarColor}
          borderRight="1px solid"
          borderColor={borderColor}
          as={motion.div}
          initial={{ display: 'none' }}
          animate={isSidebarOpen ? sidebarVariants.open : sidebarVariants.closed}
          flexDirection="column"
          justifyContent="space-between"
          w="20rem"
          minHeight="100vh"
          zIndex="9"
          position="relative"
        >
          <IconButton
            size="sm"
            aria-label="close-sidebar-btn"
            variant="secondary"
            position="absolute"
            top={2}
            right={2}
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            icon={<X color={textColor} />}
          />
          <AnimatePresence mode="wait">
            <motion.div
              variants={sidebarContentVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{ height: '100%', marginTop: '4rem' }}
            >
              <VStack maxW="100%" w="100%" height="100%">
                {/* <BasicSelectItem color="red" mode="sidebar" /> */}
              </VStack>
            </motion.div>
          </AnimatePresence>
        </Box>
      </AnimatePresence>
    </Box>
  );
};

export default Sidebar;
