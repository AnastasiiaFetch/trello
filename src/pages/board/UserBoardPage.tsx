import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { Card } from '../../types/card';
import { BoardItem } from '../../types/board';
import { List as ListType } from '../../types/list';

import { BoardWrapper, BoardHeader, BoardContentWrapper } from '../../components/Board';
import { List } from '../../components/List';

import { updateCard } from '../../api';
import useColorStore from '../../store/colorState';
import CreateItem from '../../components/common/CreateItem';
import useBoard from '../../composable/useBoard';
import useList from '../../composable/useList';

const UserBoardPage = () => {
  const { setColor } = useColorStore();
  const { boardId } = useParams();
  const { board, boardIsLoading, refetchBoard } = useBoard(boardId as string);
  const { createList } = useList(boardId as string);

  const [boardItems, setBoardItems] = useState<BoardItem[] | null>(null);

  useEffect(() => {
    if (!board || boardIsLoading) return;

    if (!!board.color) {
      setColor(board.color);
    }

    const { lists, cards } = board;

    const cardsByList = cards
      ? cards.reduce((acc: Record<string, Card[]>, card: Card) => {
          if (!acc[card.listId]) {
            acc[card.listId] = [];
          }
          acc[card.listId].push(card as Card);
          return acc;
        }, {} as Record<string, Card[]>)
      : null;

    const initialColumns = lists
      ? lists.map((list: ListType) => ({
          ...list,
          cards: cardsByList ? cardsByList[list.id] : null,
        }))
      : [];

    setBoardItems(initialColumns);
  }, [board, boardId, boardIsLoading]);

  const processBoardItems = async (boardItems: BoardItem[]) => {
    for (const item of boardItems) {
      if (item.cards && Symbol.iterator in Object(item.cards)) {
        for (const card of item.cards) {
          try {
            await updateCard({
              id: card.id,
              payload: { listId: card.listId, order: card.order },
            });
          } catch (error) {
            console.error(error);
          }
        }
      }
    }
    refetchBoard();
  };

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

        const sourceItems = sourceColumn.cards ? [...(sourceColumn.cards as Card[])] : [];
        const destItems = destColumn.cards ? [...(destColumn.cards as Card[])] : [];

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

      processBoardItems(newBoardItems);
      return newBoardItems;
    });
  };

  return (
    <>
      <Helmet>
        <title>{`Trello | ${board?.name}`}</title>
      </Helmet>

      {board && !boardIsLoading && (
        <BoardWrapper>
          <BoardHeader board={board} />
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
                onValueSave={value => createList({ title: value, boardId })}
                buttonText={'Створити новий список'}
              />
            </DragDropContext>
          </BoardContentWrapper>
        </BoardWrapper>
      )}
    </>
  );
};

export default UserBoardPage;
