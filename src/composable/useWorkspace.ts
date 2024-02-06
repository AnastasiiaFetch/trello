import { useMutation, useQuery } from '@tanstack/react-query';
import { getWorkspace } from '../api';
import { useToast } from '@chakra-ui/react';
import { showToast } from '../utils/toasts';

export const useCustomMutation = (
  cb: (data: any) => Promise<any>,
  localRefetch: () => void,
  refetchWorkspaces: () => void
) => {
  const toast = useToast();
  const { mutate } = useMutation({
    mutationFn: (data: any) => cb(data),
    onSuccess: data => {
      localRefetch();
      refetchWorkspaces();
      showToast(toast, `${data.data.message}`, 'success');
    },
    onError: (data: any) => {
      showToast(toast, `${data?.response?.data?.message}`, 'error');
    },
  });

  return mutate;
};

const useWorkspace = (workspaceId: string) => {
  const {
    data: workspace = null,
    refetch,
    isLoading,
  } = useQuery({
    queryFn: () => getWorkspace(workspaceId as string),
    queryKey: ['workspace', workspaceId],
    enabled: !!workspaceId,
    select: data => data.data,
  });

  return {
    workspaceIsLoading: isLoading,
    workspace,
    refetchWorkspace: refetch,
  };
};

export default useWorkspace;
