import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { showToast } from '../utils/toasts';
import useBoard from './useBoard';
import { createCard, getCard, updateCard } from '../api';

const useCustomMutation = (
  cb: (data: any) => Promise<any>,
  refetchBoard?: () => void,
  refetchCard?: () => void
) => {
  const toast = useToast();
  const { mutate } = useMutation({
    mutationFn: (data: any) => cb(data),
    onSuccess: () => {
      refetchCard && refetchCard();
      refetchBoard && refetchBoard();
    },
    onError: (data: any) => {
      showToast(toast, `${data?.response?.data?.message}`, 'error');
    },
  });

  return mutate;
};

const useCard = (boardId: string, cardId?: string) => {
  const { refetchBoard } = useBoard(boardId as string);

  const {
    data: card = null,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getCard(cardId as string),
    queryKey: ['get-card', cardId],
    select: data => data.data,
    enabled: !!cardId,
  });

  const addCard = useCustomMutation(createCard, refetchBoard);
  const amendCard = useCustomMutation(updateCard, undefined, refetch);

  return {
    card,
    cardIsLoading: isLoading,
    createCard: addCard,
    updateCard: amendCard,
    refetchBoard,
    refetchCard: refetch,
  };
};

export default useCard;
