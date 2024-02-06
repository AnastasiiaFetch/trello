import {
  VStack,
  Text,
  Box,
  GridItem,
  HStack,
  Flex,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

import {
  DeleteConfirmationModal,
  CreateWorkspaceModal,
  CreateBoardModal,
} from '../../components/common/modals';
import WorkspaceWrapper from '../../components/workspace/WorkspaceWrapper';
import { BoardsMenuItem, BoardsMenuWrapper } from '../../components/common/BoardsMenu';
import Avatar from '../../elements/avatar/Avatar';
import Button from '../../elements/button/Button';
import Input from '../../elements/input/Input';
import Edit from '../../elements/icons/Edit';
import Search from '../../elements/icons/Search';
import Trash from '../../elements/icons/Trash';

import useBoards from '../../composable/useBoards';
import useWorkspace from '../../composable/useWorkspace';
import useWorkspaces from '../../composable/useWorkspaces';
import { useMainColor } from '../../composable/useMainColor';
import useFilters from '../../composable/useFilters';

import { Workspace } from '../../types/workspace';
import { Board } from '../../types/board';

import { deleteWorkspace } from '../../api';

const UserWorkspacePage = () => {
  const { workspaceId } = useParams();
  const { darkColor } = useMainColor();

  const navigate = useNavigate();
  const boardModal = useDisclosure();
  const workspaceModal = useDisclosure();
  const workspaceDeleteModal = useDisclosure();

  const [isLargerThanLg] = useMediaQuery('(min-width: 62em)');
  const [isLargerThanMd] = useMediaQuery('(min-width: 48em)');
  const [isLargerThanSm] = useMediaQuery('(min-width: 30em)');

  const { boards } = useBoards();
  const { workspace, refetchWorkspace } = useWorkspace(workspaceId as string);
  const { refetchWorkspaces } = useWorkspaces();

  const handleOnBoardClick = (boardId: string, workspaceId: string) =>
    navigate(`/${workspaceId}/b/${boardId}`);

  const workspaceBoards = useMemo(
    () => (workspaceId ? boards?.filter(b => b.workspaceId === workspaceId) : null),
    [workspaceId, workspace, boards]
  );

  const { entities, inputValue, setInputValue } = useFilters(workspaceBoards as Board[], 'name');

  const handleWorkspaceDelete = async () => {
    try {
      await deleteWorkspace(workspace?.id as string);
    } catch (e) {
      console.log('workspace deleting error:', e);
    }
    refetchWorkspaces();
    navigate(`/auth/main`);
  };

  return (
    <>
      <Helmet>
        <title>{`Trello | ${workspace?.name}`}</title>
      </Helmet>

      <WorkspaceWrapper>
        <VStack
          w={isLargerThanMd ? '80%' : '100%'}
          maxW={isLargerThanMd ? '80%' : '100%'}
          height="100%"
          align="center"
          justify="start"
          gap={6}
        >
          <Flex
            flexDir={isLargerThanMd ? 'row' : 'column'}
            gap={4}
            w="100%"
            justify="space-between"
            alignItems={'center'}
          >
            <Flex gap={4} minW="70%" maxW={isLargerThanMd ? '70%' : '100%'}>
              <Avatar
                size={isLargerThanSm ? 'md' : 'sm'}
                borderRadius="md"
                name={`${workspace?.name}` || ''}
              />
              <Flex align="center" gap={4} maxW="80%">
                <Text
                  fontWeight="bold"
                  fontSize={isLargerThanSm ? 'text-xl' : 'text-lg'}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {workspace?.name}
                </Text>
              </Flex>
            </Flex>
            {isLargerThanMd ? (
              <Button
                variant="secondary"
                borderRadius="md"
                minW="max-content"
                aria-label={'edit-workspace-btn'}
                onClick={() => workspaceModal.onOpen()}
                _hover={{ bgColor: 'rgba(0, 0, 0, 0.1)' }}
              >
                <Flex gap={4} align="center" px={2}>
                  <Edit size="20" color={darkColor} />
                  {isLargerThanLg && (
                    <Text fontSize="text-sm" whiteSpace={'nowrap'} color={darkColor}>
                      Редагувати робочу область
                    </Text>
                  )}
                </Flex>
              </Button>
            ) : (
              <Flex width="100%" justify="center" align="center" gap={4}>
                <Button
                  flexShrink={0}
                  variant="secondary"
                  w="fit-content"
                  borderRadius="md"
                  size="sm"
                  _hover={{
                    bgColor: 'rgba(0, 0, 0, 0.1)',
                  }}
                  border={'1px solid'}
                  borderColor={'gray.300'}
                  onClick={() => workspaceDeleteModal.onOpen()}
                  aria-label={'delete-workspace-btn'}
                >
                  <Trash size="18" color={darkColor} />
                </Button>
                <Button
                  flexShrink={0}
                  variant="secondary"
                  w="fit-content"
                  borderRadius="md"
                  size="sm"
                  border={'1px solid'}
                  borderColor={'gray.300'}
                  _hover={{
                    bgColor: 'rgba(0, 0, 0, 0.1)',
                  }}
                  onClick={() => workspaceModal.onOpen()}
                  aria-label={'edit-workspace-btn'}
                >
                  <Edit size="18" color={darkColor} />
                </Button>
              </Flex>
            )}
          </Flex>

          <HStack w="100%" maxW="100%" wordBreak="break-word" align="start" textOverflow="ellipsis">
            <Text fontSize="text-sm">{workspace?.description}</Text>
          </HStack>
        </VStack>

        <VStack
          w="100%"
          height="100%"
          align="start"
          justify="start"
          py={isLargerThanSm ? '2rem' : '1rem'}
        >
          <Flex
            flexDir={isLargerThanMd ? 'row' : 'column'}
            w="100%"
            gap={2}
            align={isLargerThanMd ? 'center' : 'start'}
            justify="space-between"
          >
            <Text fontSize="text-lg" fontWeight="semibold">
              Дошки
            </Text>
            <Box w={isLargerThanMd ? '30%' : '100%'}>
              <Input
                size="xs"
                placeholder="Пошук дощок"
                w="100%"
                rightElement={<Search size="20" />}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
              />
            </Box>
          </Flex>
          <Box my="1" border="1px solid transparent" w="100%" borderTopColor="gray.400" />

          <BoardsMenuWrapper
            templateColumns={
              isLargerThanMd
                ? 'repeat(auto-fill, minmax(20vw, 1fr))'
                : isLargerThanSm
                ? 'repeat(2, 1fr)'
                : 'repeat(1, 1fr)'
            }
          >
            <GridItem w="100%">
              <BoardsMenuItem isDefault onClick={() => boardModal.onOpen()} />
            </GridItem>
            {entities &&
              entities?.map(board => {
                return (
                  <GridItem key={board.id} w="100%">
                    <BoardsMenuItem
                      boardId={board.id}
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

        {isLargerThanMd && (
          <HStack w={'100%'}>
            <Box
              cursor={'pointer'}
              onClick={() => workspaceDeleteModal.onOpen()}
              border={'1px solid transparent'}
              py={1}
              aria-label={'delete-workspace-btn'}
              _hover={{
                borderBottomColor: 'gray.400',
              }}
            >
              <Text fontSize={'text-xs'} fontWeight={'semibold'}>
                Видалити цю робочу область?
              </Text>
            </Box>
          </HStack>
        )}

        <CreateBoardModal isOpen={boardModal.isOpen} onClose={boardModal.onClose} />
        <CreateWorkspaceModal
          initialData={workspace as Workspace}
          isOpen={workspaceModal.isOpen}
          onClose={workspaceModal.onClose}
          onWorkspaceUpdateCb={refetchWorkspace}
        />
        <DeleteConfirmationModal
          isOpen={workspaceDeleteModal.isOpen}
          onClose={workspaceDeleteModal.onClose}
          onSuccess={handleWorkspaceDelete}
          confirmationText={`Ви дійсно хочете видалити робочу область: "${workspace?.name}"?`}
        />
      </WorkspaceWrapper>
    </>
  );
};

export default UserWorkspacePage;
