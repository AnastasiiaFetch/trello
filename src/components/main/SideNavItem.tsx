import { useMemo } from 'react';
import { Box, GridItem, HStack, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { BoardsMenuItem, BoardsMenuWrapper } from '../common/BoardsMenu';
import { CreateBoardModal } from '../common/modals';
import useBoards from '../../composable/useBoards';

const SideNavItem = ({ itemId }: { itemId: string | null }) => {
  const { boards, boardsIsLoading } = useBoards();
  const boardModal = useDisclosure();
  const navigate = useNavigate();

  const { boardsToWorkspace, selectedBoards } = useMemo(() => {
    const filteredBoards =
      itemId && !boardsIsLoading ? boards?.filter(b => b.workspaceId === itemId) : null;
    const selected = filteredBoards?.filter(b => b.isSelected) || null;

    return { boardsToWorkspace: filteredBoards, selectedBoards: selected };
  }, [itemId, boardsIsLoading, boards]);

  const handleOnBoardClick = (boardId: string, workspaceId: string) =>
    navigate(`/${workspaceId}/b/${boardId}`);

  return (
    <>
      <VStack w="100%" gap={8} boxSizing="border-box">
        <VStack w="100%" align="start">
          <Text fontSize="text-md" fontWeight="semibold">
            Важливі дошки
          </Text>
          <Box my="1" border="1px solid transparent" w="100%" borderTopColor="gray.400" />
          {selectedBoards && !!selectedBoards.length ? (
            <BoardsMenuWrapper>
              {selectedBoards?.map(selectedBoard => {
                return (
                  <GridItem key={selectedBoard.id} w="100%">
                    <BoardsMenuItem
                      isSelected={selectedBoard.isSelected}
                      boardId={selectedBoard.id}
                      title={selectedBoard.name}
                      bg={selectedBoard.color}
                      onClick={() =>
                        handleOnBoardClick(selectedBoard.id, selectedBoard.workspaceId)
                      }
                    />
                  </GridItem>
                );
              })}
            </BoardsMenuWrapper>
          ) : (
            <HStack justify="center" my={25} w="100%">
              <Text>Список важливих дошок поки пустий</Text>
            </HStack>
          )}
        </VStack>
        <VStack w="100%" align="start">
          <Text fontSize="text-md" fontWeight="semibold">
            Всі дошки
          </Text>
          <Box my="1" border="1px solid transparent" w="100%" borderTopColor="gray.400" />

          <BoardsMenuWrapper>
            {boardsToWorkspace &&
              boardsToWorkspace?.map(board => {
                return (
                  <GridItem key={board.id} w="100%">
                    <BoardsMenuItem
                      title={board.name}
                      bg={board.color}
                      isSelected={board.isSelected}
                      boardId={board.id}
                      onClick={() => handleOnBoardClick(board.id, board.workspaceId)}
                    />
                  </GridItem>
                );
              })}
            <GridItem w="100%">
              <BoardsMenuItem isDefault onClick={() => boardModal.onOpen()} />
            </GridItem>
          </BoardsMenuWrapper>
        </VStack>
      </VStack>

      <CreateBoardModal isOpen={boardModal.isOpen} onClose={boardModal.onClose} />
    </>
  );
};

export default SideNavItem;
