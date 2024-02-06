import { useMutation, useQuery } from '@tanstack/react-query';
import { createBoard, getBoards } from '../api';
import useBoardsStore from '../store/boardsState';
import { useEffect } from 'react';
import { equals } from 'ramda';
import { useToast } from '@chakra-ui/react';
import { showToast } from '../utils/toasts';

const useCustomMutation = (cb: (data: any) => Promise<any>, refetch: () => void) => {
  const toast = useToast();
  const { mutate } = useMutation({
    mutationFn: (data: any) => cb(data),
    onSuccess: data => {
      refetch();
      showToast(toast, `${data.data.message}`, 'success');
    },
    onError: (data: any) => {
      showToast(toast, `${data?.response?.data?.message}`, 'error');
    },
  });

  return mutate;
};

const useBoards = () => {
  const { boards: storeBoards, setBoards } = useBoardsStore();

  const {
    data: userBoards,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['get-all-boards'],
    queryFn: () => getBoards(),
    enabled: !storeBoards?.length,
    select: data => data.data.boards,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!equals(storeBoards, userBoards)) setBoards(userBoards);
    }
  }, [userBoards]);

  const addBoard = useCustomMutation(createBoard, refetch);

  return {
    boardsIsLoading: isLoading,
    boards: storeBoards,
    createBoard: addBoard,
    refetchBoards: refetch,
  };
};

export default useBoards;
