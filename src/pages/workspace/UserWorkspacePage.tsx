import { VStack, Text, Box, GridItem, HStack, Flex } from '@chakra-ui/react';
import WorkspaceWrapper from '../../components/workspace/WorkspaceWrapper';
import { BoardsMenuItem, BoardsMenuWrapper } from '../../components/common';
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

const UserWorkspacePage = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const { getBoards } = useBoardsStore();
  const { getWorkspace } = useWorkspacesStore();

  const handleOnBoardClick = (boardId: string, workspaceId: string) =>
    navigate(`/${workspaceId}/b/${boardId}`);

  const boards = useMemo(() => (workspaceId ? getBoards(workspaceId) : null), [workspaceId]);
  const workspace = useMemo(() => (workspaceId ? getWorkspace(workspaceId) : null), [workspaceId]);
  return (
    <WorkspaceWrapper>
      <VStack
        w="100%"
        height="fit-content"
        maxH="100%"
        align="center"
        justify="start"
        gap={4}
        py="4rem"
        overflow="auto"
      >
        <HStack gap={4} w="60%" justify="space-between">
          <Flex gap={3}>
            <Avatar size="md" borderRadius="md" name={`${workspace?.name}` || ''} />
            <Flex align="center" gap={1.5}>
              <Text fontWeight="bold" fontSize="text-lg">
                {workspace?.name}
              </Text>
              <Button
                variant="secondary"
                w="fit-content"
                borderRadius="md"
                size="md"
                _hover={{
                  bgColor: 'rgba(0, 0, 0, 0.1)',
                }}
                onClick={() => {}}
              >
                <ToolTip label="Редагувати робочу область">
                  <Edit size="18" />
                </ToolTip>
              </Button>
            </Flex>
          </Flex>
          <Button w="fit-content">
            <Flex gap={2} align="center">
              <UserPlus size="20" />
              <Text fontSize="text-sm"> Запросіть учасників робочої області</Text>
            </Flex>
          </Button>
        </HStack>
        <HStack w="60%" align="start">
          <Text fontSize="text-xs">{workspace?.description}</Text>
        </HStack>
      </VStack>
      <VStack
        w="100%"
        height="100%"
        align="start"
        justify="start"
        px="4rem"
        py="2rem"
        overflow="auto"
      >
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
            <BoardsMenuItem isDefault onClick={() => {}} />
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
    </WorkspaceWrapper>
  );
};

export default UserWorkspacePage;
