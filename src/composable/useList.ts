import { useMutation } from '@tanstack/react-query';
import { createList, deleteList, updateList } from '../api';
import { useToast } from '@chakra-ui/react';
import { showToast } from '../utils/toasts';
import useBoard from './useBoard';

const useCustomMutation = (cb: (data: any) => Promise<any>, refetch: () => void) => {
  const toast = useToast();
  const { mutate } = useMutation({
    mutationFn: (data: any) => cb(data),
    onSuccess: () => {
      refetch();
    },
    onError: (data: any) => {
      showToast(toast, `${data?.response?.data?.message}`, 'error');
    },
  });

  return mutate;
};

const useList = (boardId: string) => {
  const { refetchBoard } = useBoard(boardId as string);

  const addList = useCustomMutation(createList, refetchBoard);
  const amendList = useCustomMutation(updateList, refetchBoard);
  const removeList = useCustomMutation(deleteList, refetchBoard);

  return {
    createList: addList,
    updateList: amendList,
    deleteList: removeList,
  };
};

export default useList;
