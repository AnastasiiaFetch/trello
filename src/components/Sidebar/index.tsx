import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import useSidebarStore from '../../store/sidebarState';
import ChevronRight from '../../elements/icons/ChevronRight';
import X from '../../elements/icons/X';
import IconButton from '../../elements/button/IconButton';
import { useMainColor } from '../../composable/useMainColor';
import Avatar from '../../elements/avatar/Avatar';
import useWorkspacesStore from '../../store/workspacesState';
import { useParams } from 'react-router-dom';
import BasicSelectItem from '../../elements/custom-select/BasicSelectItem';
import TrelloLogo from '../../elements/icons/TrelloLogo';
import User from '../../elements/icons/User';
import useBoardsStore from '../../store/boardsState';
import BoardSelectItem from '../../elements/custom-select/BoardSelectItem';

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

const sidebarMenuItems = [
  { id: 'boards', leftIcon: TrelloLogo, contentTitle: 'Дошки', onClick: () => {} },
  { id: 'members', leftIcon: User, contentTitle: 'Учасники', onClick: () => {} },
];

const Sidebar = () => {
  const { isOpen: isSidebarOpen, setSidebarOpen: setSidebarOpen } = useSidebarStore.getState();
  const { textColor, sideBarColor, borderColor } = useMainColor();
  const { getWorkspace } = useWorkspacesStore();
  const { getBoards } = useBoardsStore();
  const { workspaceId } = useParams();

  const workSpace = workspaceId ? getWorkspace(workspaceId) : null;
  const boards = workspaceId ? getBoards(workspaceId) : null;

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
              style={{ height: '100%', marginTop: '1rem' }}
            >
              <VStack maxW="100%" w="100%" height="100%">
                <HStack w="100%" px={4}>
                  <Avatar size="md" borderRadius="md" name={`${workSpace?.name} ` || ''} />
                  <Text
                    fontSize="text-sm"
                    fontWeight="semibold"
                    pr="2rem"
                    wordBreak="break-word"
                    color={textColor}
                  >
                    {workSpace?.name}
                  </Text>
                </HStack>
                <Box border="1px solid transparent" borderTopColor={borderColor} w="100%" my={2} />
                <VStack w="100%" gap={1} mb={4}>
                  {sidebarMenuItems.map(({ id, leftIcon, contentTitle, onClick }) => {
                    const Icon = leftIcon;
                    return (
                      <BasicSelectItem
                        borderRadius="none"
                        px="1rem"
                        py="0.5rem"
                        fontSize="text-sm"
                        color={textColor}
                        key={id}
                        leftIcon={<Icon />}
                        contentTitle={contentTitle}
                        onClick={onClick}
                      />
                    );
                  })}
                </VStack>
                <HStack w="100%" px={4}>
                  <Text color={textColor} fontSize="text-sm" fontWeight="semibold">
                    Ваші дошки
                  </Text>
                </HStack>
                <VStack w="100%" gap={1}>
                  {boards?.map((board, index) => {
                    return (
                      <BoardSelectItem
                        key={`${board.id}-${index}`}
                        mode="sidebar"
                        px="1rem"
                        py="0.5rem"
                        color={textColor}
                        leftIcon={board.color}
                        contentTitle={board.name}
                        isSelected={board.isSelected}
                        onClick={() => {}}
                      />
                    );
                  })}
                </VStack>
              </VStack>
            </motion.div>
          </AnimatePresence>
        </Box>
      </AnimatePresence>
    </Box>
  );
};

export default Sidebar;
