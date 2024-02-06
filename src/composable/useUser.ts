import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { showToast } from '../utils/toasts';
import useUserStore from '../store/userState';
import { getUser, updateUser } from '../api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useCustomMutation = (cb: (data: any) => Promise<any>, localRefetch: () => void) => {
  const toast = useToast();
  const { mutate } = useMutation({
    mutationFn: (data: any) => cb(data),
    onSuccess: () => {
      localRefetch();
    },
    onError: (data: any) => {
      showToast(toast, `${data?.response?.data?.message}`, 'error');
    },
  });

  return mutate;
};

const useUser = () => {
  const { currentUser, setUser, isLoggedIn, getUserToken, setUserToken } = useUserStore();
  const userToken = getUserToken();
  const navigate = useNavigate();

  const {
    data: userData,
    status,
    refetch,
  } = useQuery({
    queryFn: () => getUser(),
    queryKey: ['userToken', userToken],
    enabled: !!userToken && (!isLoggedIn || !currentUser),
    select: data => data.data,
  });

  useEffect(() => {
    if (!userToken) {
      navigate('/sign-in');
    }
  }, []);

  useEffect(() => {
    if (userData && status === 'success') {
      setUser(userData);
    } else if (status === 'error') {
      setUserToken('');
      navigate('/sign-in');
    }
  }, [status, userData]);

  const amendUser = useCustomMutation(updateUser, refetch);

  return {
    currentUser,
    refetchUser: refetch,
    updateUser: amendUser,
  };
};

export default useUser;
