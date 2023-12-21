import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { Board } from '../../types/board';
import { getBoard } from '../../api';
import BoardWrapper from '../../components/board/BoardWrapper';
import BoardContentWrapper from '../../components/board/BoardContentWrapper';
import List from '../../components/list/List';
import BoardHeader from '../../components/board/BoardHeader';
import useColorStore from '../../store/colorState';
import { useEffect } from 'react';

const UserBoardPage = () => {
  const { boardId } = useParams();
  const { data: board = null, isLoading } = useQuery({
    queryFn: () => getBoard(boardId as string),
    queryKey: ['get-board', boardId],
    select: data => data.data,
    enabled: !!boardId,
  });

  const { setColor } = useColorStore();

  useEffect(() => {
    if (board && !!board.color) {
      setColor(board.color);
    }
  }, [board]);

  return (
    <BoardWrapper>
      <BoardHeader {...(board as Board)} />
      <BoardContentWrapper>
        <List />
      </BoardContentWrapper>
    </BoardWrapper>
  );
};

export default UserBoardPage;
