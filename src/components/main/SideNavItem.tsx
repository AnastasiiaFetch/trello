import { useMemo } from 'react';
import useBoardsStore from '../../store/boardsState';
import { Box, GridItem, HStack, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BoardsMenuItem, BoardsMenuWrapper } from '../common/BoardsMenu';
import CreateBoardModal from '../common/modals/CreateBoardModal';

const SideNavItem = ({ itemId }: { itemId: string | null }) => {
  const { getBoards } = useBoardsStore();
  const navigate = useNavigate();

  const handleOnBoardClick = (boardId: string, workspaceId: string) =>
    navigate(`/${workspaceId}/b/${boardId}`);

  const boards = useMemo(() => (itemId ? getBoards(itemId) : null), [itemId]);
  const selectedBoards = useMemo(
    () => (itemId ? getBoards(itemId)?.filter(board => board.isSelected) : null),
    [itemId]
  );

  const boardModal = useDisclosure();

  return (
    <>
      <VStack w="100%" gap={8} boxSizing="border-box">
        <VStack w="100%" align="start">
          <Text fontSize="text-md" fontWeight="semibold">
            Важливі дошки
          </Text>
          <Box my="1" border="1px solid transparent" w="100%" borderTopColor="gray.400" />
          {selectedBoards && selectedBoards.length > 0 ? (
            <BoardsMenuWrapper>
              {selectedBoards?.map(selectedBoard => {
                return (
                  <GridItem key={selectedBoard.id} w="100%">
                    <BoardsMenuItem
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
