import { VStack, Text, Box, GridItem, HStack, Flex, useDisclosure } from '@chakra-ui/react';
import WorkspaceWrapper from '../../components/workspace/WorkspaceWrapper';
import { BoardsMenuItem, BoardsMenuWrapper } from '../../components/common/BoardsMenu';
import useBoardsStore from '../../store/boardsState';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import Avatar from '../../elements/avatar/Avatar';
import useWorkspacesStore from '../../store/workspacesState';
import Button from '../../elements/button/Button';
import ToolTip from '../../elements/tooltip';
import Edit from '../../elements/icons/Edit';
import Input from '../../elements/input/Input';
import Search from '../../elements/icons/Search';
import UserPlus from '../../elements/icons/UserPlus';
import CreateBoardModal from '../../components/common/modals/CreateBoardModal';
import { Helmet } from 'react-helmet-async';
import { useMainColor } from '../../composable/useMainColor';
import CreateWorkspaceModal from '../../components/common/modals/CreateWorkspaceModal';
import { Workspace } from '../../types/workspace';

const UserWorkspacePage = () => {
  const { workspaceId } = useParams();
  const { darkColor } = useMainColor();
  const navigate = useNavigate();
  const boardModal = useDisclosure();
  const workspaceModal = useDisclosure();

  const { getBoards } = useBoardsStore();
  const { getWorkspace } = useWorkspacesStore();

  const handleOnBoardClick = (boardId: string, workspaceId: string) =>
    navigate(`/${workspaceId}/b/${boardId}`);

  const boards = useMemo(() => (workspaceId ? getBoards(workspaceId) : null), [workspaceId]);
  const workspace = useMemo(() => (workspaceId ? getWorkspace(workspaceId) : null), [workspaceId]);

  return (
    <>
      <Helmet>
        <title>{`Trello | ${workspace?.name}`}</title>
      </Helmet>

      <WorkspaceWrapper>
        <VStack w="100%" py="2rem" height="100%" align="center" justify="start" gap={4}>
          <HStack gap={2} w="max-content" minW="60%" justify="space-between">
            <Flex gap={4}>
              <Avatar size="md" borderRadius="md" name={`${workspace?.name}` || ''} />
              <Flex align="center" gap={4}>
                <Text fontWeight="bold" fontSize="text-xl" whiteSpace="nowrap">
                  {workspace?.name}
                </Text>
                <Button
                  variant="secondary"
                  w="fit-content"
                  borderRadius="md"
                  size="sm"
                  _hover={{
                    bgColor: 'rgba(0, 0, 0, 0.1)',
                  }}
                  onClick={() => workspaceModal.onOpen()}
                >
                  <ToolTip label="Редагувати робочу область">
                    <Edit size="18" color={darkColor} />
                  </ToolTip>
                </Button>
              </Flex>
            </Flex>
            <Button minW="max-content" maxW="max-content">
              <Flex gap={2} align="center" px={2}>
                <UserPlus size="20" color={darkColor} />
                <Text fontSize="text-sm" whiteSpace={'nowrap'} color={darkColor}>
                  Запросити учасників
                </Text>
              </Flex>
            </Button>
          </HStack>

          <HStack w="60%" maxW="60%" wordBreak="break-word" align="start" textOverflow="ellipsis">
            <Text fontSize="text-sm">{workspace?.description}</Text>
          </HStack>
        </VStack>

        <VStack w="100%" height="100%" align="start" justify="start" px="4rem" py="2rem">
          <HStack w="100%" align="center" justify="space-between">
            <Text fontSize="text-lg" fontWeight="semibold">
              Дошки
            </Text>
            <Box w="30%">
              <Input
                size="xs"
                placeholder="Пошук дощок"
                w="100%"
                rightElement={<Search size="20" />}
              />
            </Box>
          </HStack>
          <Box my="1" border="1px solid transparent" w="100%" borderTopColor="gray.400" />

          <BoardsMenuWrapper templateColumns="repeat(auto-fill, minmax(20vw, 1fr))">
            <GridItem w="100%">
              <BoardsMenuItem isDefault onClick={() => boardModal.onOpen()} />
            </GridItem>
            {boards &&
              boards?.map(board => {
                return (
                  <GridItem key={board.id} w="100%">
                    <BoardsMenuItem
                      title={board.name}
                      bg={board.color}
                      isSelected={board.isSelected}
                      onClick={() => handleOnBoardClick(board.id, board.workspaceId)}
                    />
                  </GridItem>
                );
              })}
          </BoardsMenuWrapper>
        </VStack>

        <CreateBoardModal isOpen={boardModal.isOpen} onClose={boardModal.onClose} />
        <CreateWorkspaceModal
          initialData={workspace as Workspace}
          isOpen={workspaceModal.isOpen}
          onClose={workspaceModal.onClose}
        />
      </WorkspaceWrapper>
    </>
  );
};

export default UserWorkspacePage;
