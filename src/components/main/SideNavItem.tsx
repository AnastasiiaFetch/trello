import { useMemo } from 'react';
import useBoardsStore from '../../store/boardsState';
import { Box, GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { SideNavBoard, SideNavBoardsWrapper } from './common';

const SideNavItem = ({ itemId }: { itemId: string | null }) => {
  const { getBoards } = useBoardsStore();
  const navigate = useNavigate();

  const handleOnBoardClick = (id: string) => navigate(`/b/${id}`);

  const boards = useMemo(() => (itemId ? getBoards(itemId) : null), [itemId]);
  const selectedBoards = useMemo(
    () => (itemId ? getBoards(itemId)?.filter(board => board.isSelected) : null),
    [itemId]
  );

  return (
    <VStack w="100%" gap={8} boxSizing="border-box">
      <VStack w="100%" align="start">
        <Text fontSize="text-md" fontWeight="semibold">
          Важливі дошки
        </Text>
        <Box my="1" border="1px solid transparent" w="100%" borderTopColor="gray.400" />
        {selectedBoards && selectedBoards.length > 0 ? (
          <SideNavBoardsWrapper>
            {selectedBoards?.map(selectedBoard => {
              return (
                <GridItem key={selectedBoard.id} w="100%">
                  <SideNavBoard
                    title={selectedBoard.name}
                    bg={selectedBoard.color}
                    onClick={() => handleOnBoardClick(selectedBoard.id)}
                  />
                </GridItem>
              );
            })}
            <GridItem w="100%">
              <SideNavBoard isDefault onClick={() => {}} />
            </GridItem>
          </SideNavBoardsWrapper>
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
        {boards ? (
          <SideNavBoardsWrapper>
            {boards?.map(board => {
              return (
                <GridItem key={board.id} w="100%">
                  <SideNavBoard
                    title={board.name}
                    bg={board.color}
                    isSelected={board.isSelected}
                    onClick={() => handleOnBoardClick(board.id)}
                  />
                </GridItem>
              );
            })}
            <GridItem w="100%">
              <SideNavBoard isDefault onClick={() => {}} />
            </GridItem>
          </SideNavBoardsWrapper>
        ) : (
          <HStack justify="center" my={25} w="100%">
            <Text>Список дошок поки пустий</Text>
          </HStack>
        )}
      </VStack>
    </VStack>
  );
};

export default SideNavItem;
