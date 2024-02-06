import { Box, Flex, GridItem, Text, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import TrelloLogo from '../../elements/icons/TrelloLogo';
import useWorkspacesStore from '../../store/workspacesState';
import useBoardsStore from '../../store/boardsState';
import Avatar from '../../elements/avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '../../elements/custom-select/CustomSelect';
import CreateBoardModal from '../common/modals/CreateBoardModal';
import CreateWorkspaceModal from '../common/modals/CreateWorkspaceModal';
import useUserStore from '../../store/userState';
import TrelloHeaderNavItemFactory from './TrelloHeaderNavItemFactory';
import TrelloMobileHeaderNav from './TrelloMobileHeaderNav';
import { useHeaderSelects } from '../../composable/useHeaderSelects';
import { BasicPopover } from '../../elements/popover/BasicPopover';
import UserModal from '../common/modals/UserModal';
import { useRef } from 'react';

const TrelloHeader = () => {
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  const { workspaces: userWorkspaces } = useWorkspacesStore();
  const { boards: userBoards } = useBoardsStore();

  const boardModal = useDisclosure();
  const workspaceModal = useDisclosure();

  const [isLargerThanSm] = useMediaQuery('(min-width: 30em)');

  const headerSelects = useHeaderSelects(
    userWorkspaces,
    userBoards,
    navigate,
    boardModal,
    workspaceModal
  );

  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <nav style={{ width: '100%' }}>
      <Flex alignItems="center" justify="space-between" gap={4} w="100%">
        <Flex gap={8} alignItems="center">
          <Flex
            align="center"
            justify="center"
            gap={1}
            cursor="pointer"
            onClick={() => navigate('/auth/main')}
          >
            <TrelloLogo size={isLargerThanSm ? 35 : 30} />
            <Text fontSize={isLargerThanSm ? 'display-sm' : 'text-xl'} fontWeight="bold">
              Trello
            </Text>
          </Flex>
          {isLargerThanSm ? (
            <>
              {headerSelects.map(({ title, type, elements }, index) => (
                <CustomSelect key={`${title}-${index}`} title={title}>
                  <>
                    {elements.length > 0 ? (
                      elements.map((element, elementIndex) => (
                        <GridItem
                          key={`${title}-item-${elementIndex}`}
                          maxW="100%"
                          overflowX="hidden"
                        >
                          <TrelloHeaderNavItemFactory type={type} element={element} />
                        </GridItem>
                      ))
                    ) : (
                      <Box p={4}>
                        <Text textAlign="center">Цей список поки порожній...</Text>
                      </Box>
                    )}
                  </>
                </CustomSelect>
              ))}
            </>
          ) : (
            <TrelloMobileHeaderNav items={headerSelects} />
          )}
        </Flex>
        <Flex px={4} position={'relative'}>
          <BasicPopover
            ref={triggerRef}
            trigger={
              <Avatar
                size={isLargerThanSm ? 'sm' : 'xs'}
                name={`${currentUser?.firstName} ${currentUser?.lastName}` || ''}
              />
            }
          >
            <UserModal />
          </BasicPopover>
        </Flex>
      </Flex>

      <CreateBoardModal isOpen={boardModal.isOpen} onClose={boardModal.onClose} />
      <CreateWorkspaceModal isOpen={workspaceModal.isOpen} onClose={workspaceModal.onClose} />
    </nav>
  );
};

export default TrelloHeader;
