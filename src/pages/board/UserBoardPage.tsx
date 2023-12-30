import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { Board, BoardItem, Card } from '../../types/board';
import { getBoard } from '../../api';
import BoardWrapper from '../../components/board/BoardWrapper';
import BoardContentWrapper from '../../components/board/BoardContentWrapper';
import List from '../../components/list/List';
import BoardHeader from '../../components/board/BoardHeader';
import useColorStore from '../../store/colorState';
import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import CreateItem from '../../components/common/CreateItem';
import { Helmet } from 'react-helmet-async';

const UserBoardPage = () => {
  const { boardId } = useParams();

  const { data: board = null, isLoading } = useQuery({
    queryFn: () => getBoard(boardId as string),
    queryKey: ['get-board', boardId],
    select: data => data.data,
    enabled: !!boardId,
  });

  const { setColor } = useColorStore();
  const [boardItems, setBoardItems] = useState<BoardItem[] | null>(null);

  useEffect(() => {
    if (!board) return;

    if (!!board.color) {
      setColor(board.color);
    }

    const { lists, cards } = board;

    if (!lists) return;

    const cardsByList = cards
      ? cards.reduce((acc, card) => {
          if (!acc[card.listId]) {
            acc[card.listId] = [];
          }
          acc[card.listId].push(card);
          return acc;
        }, {} as Record<string, Card[]>)
      : null;

    const initialColumns = lists.map(list => ({
      id: list.id,
      name: list.title,
      cards: cardsByList ? cardsByList[list.id] : null,
    }));

    setBoardItems(initialColumns);
  }, [board]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    setBoardItems(prevBoardItems => {
      const newBoardItems = [...(prevBoardItems as BoardItem[])] as BoardItem[];

      if (source.droppableId !== destination.droppableId) {
        const sourceColumnIndex = newBoardItems.findIndex(item => item.id === source.droppableId);
        const destColumnIndex = newBoardItems.findIndex(
          item => item.id === destination.droppableId
        );

        const sourceColumn = { ...newBoardItems[sourceColumnIndex] };
        const destColumn = { ...newBoardItems[destColumnIndex] };

        const sourceItems = [...(sourceColumn.cards as Card[])] as Card[];
        const destItems = [...(destColumn.cards as Card[])] as Card[];

        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);

        sourceColumn.cards = sourceItems.map((card, index) => ({
          ...card,
          listId: sourceColumn.id,
          order: index + 1,
        }));

        destColumn.cards = destItems.map((card, index) => ({
          ...card,
          listId: destColumn.id,
          order: index + 1,
        }));

        newBoardItems[sourceColumnIndex] = sourceColumn;
        newBoardItems[destColumnIndex] = destColumn;
      } else {
        const boardItemIndex = newBoardItems.findIndex(item => item.id === source.droppableId);
        const boardItem = { ...newBoardItems[boardItemIndex] };
        const copiedItems = [...(boardItem.cards as Card[])] as Card[];

        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);

        boardItem.cards = copiedItems.map((card, index) => ({
          ...card,
          listId: boardItem.id,
          order: index + 1,
        }));

        newBoardItems[boardItemIndex] = boardItem;
      }

      return newBoardItems;
    });
  };

  return (
    <>
      <Helmet>
        <title>{`Trello | ${board?.name}`}</title>
      </Helmet>

      {board && !isLoading ? (
        <BoardWrapper>
          <BoardHeader {...(board as Board)} />
          <BoardContentWrapper>
            <DragDropContext onDragEnd={onDragEnd}>
              {boardItems?.map(boardItem => {
                return <List key={boardItem.id} item={boardItem} />;
              })}
              <CreateItem
                textareaProps={{
                  backgroundColor: 'list.background',
                  maxWidth: '20rem',
                  minWidth: '20rem',
                  boxShadow: '0px 1px 1px #091E4240, 0px 0px 1px #091E424F',
                }}
                buttonCustomProps={{
                  height: 'fit-content',
                  maxWidth: 'fit-content',
                  minWidth: 'fit-content',
                }}
                onValueSave={value => console.log(value)}
                buttonText={'Створити новий список'}
              />
            </DragDropContext>
          </BoardContentWrapper>
        </BoardWrapper>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserBoardPage;
