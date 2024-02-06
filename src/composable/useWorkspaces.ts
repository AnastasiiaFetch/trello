import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { equals } from 'ramda';
import useWorkspacesStore from '../store/workspacesState';
import { createWorkspace, getWorkspaces } from '../api';
import { useToast } from '@chakra-ui/react';
import { showToast } from '../utils/toasts';

export const useCustomMutation = (cb: (data: any) => Promise<any>, refetch: () => void) => {
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

const useWorkspaces = () => {
  const { workspaces: storeWorkspaces, setWorkspaces } = useWorkspacesStore();

  const {
    data: userWorkspaces,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['get-all-workspaces'],
    queryFn: () => getWorkspaces(),
    enabled: !storeWorkspaces?.length,
    select: data => data.data.workspaces,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!equals(storeWorkspaces, userWorkspaces)) setWorkspaces(userWorkspaces);
    }
  }, [userWorkspaces]);

  const addWorkspace = useCustomMutation(createWorkspace, refetch);

  return {
    createWorkspace: addWorkspace,
    workspacesIsLoading: isLoading,
    workspaces: storeWorkspaces,
    refetchWorkspaces: refetch,
  };
};

export default useWorkspaces;
