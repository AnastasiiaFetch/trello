import { useMutation, useQuery } from '@tanstack/react-query';
import { getBoard, updateBoard } from '../api';
import { useToast } from '@chakra-ui/react';
import { showToast } from '../utils/toasts';
import useBoards from './useBoards';

const useCustomMutation = (
  cb: (data: any) => Promise<any>,
  localRefetch: () => void,
  refetchBoards: () => void
) => {
  const toast = useToast();
  const { mutate } = useMutation({
    mutationFn: (data: any) => cb(data),
    onSuccess: () => {
      localRefetch();
      refetchBoards();
    },
    onError: (data: any) => {
      showToast(toast, `${data?.response?.data?.message}`, 'error');
    },
  });

  return mutate;
};

const useBoard = (boardId: string) => {
  const { refetchBoards } = useBoards();

  const {
    data: board = null,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getBoard(boardId as string),
    queryKey: ['get-board', boardId],
    select: data => data.data,
    enabled: !!boardId,
  });

  const amendBoard = useCustomMutation(updateBoard, refetch, refetchBoards);

  return {
    boardIsLoading: isLoading,
    board,
    updateBoard: amendBoard,
    refetchBoard: refetch,
  };
};

export default useBoard;
