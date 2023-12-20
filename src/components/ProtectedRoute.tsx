import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllBoards, getAllWorkSpaces, getUser } from '../api';
import useColorStore from '../store/colorState';
import { useEffect } from 'react';
import theme from '../theme';
import useWorkspacesStore from '../store/workspacesState';
import useBoardsStore from '../store/boardsState';
import { equals } from 'ramda';
import useUserStore from '../store/userState';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const { boardId } = useParams();
  const { color: mainColor, setColor } = useColorStore();
  const { currentUser, setUser, isLoggedIn, getUserToken, setUserToken } = useUserStore();

  const { workspaces: userWorkspaces, setWorkspaces } = useWorkspacesStore();
  const { boards: userBoards, setBoards } = useBoardsStore();

  const userToken = getUserToken();

  useEffect(() => {
    if (!boardId && mainColor !== theme.colors.basic) {
      setColor(theme.colors.basic);
    }
  }, [boardId]);

  const {
    data: { user } = { user: null },
    status,
    isLoading: isUserLoading,
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
    if (user && status === 'success') {
      setUser(user);
      navigate(`/auth/${user?.id}`);
    } else if (status === 'error') {
      setUserToken('');
      navigate('/sign-in');
    }
  }, [status]);

  const { data: { boards } = { boards: null }, isLoading: isBoardsLoading } = useQuery({
    queryFn: () => getAllBoards(),
    queryKey: ['get-all-boards'],
    enabled: !!userToken && (!isLoggedIn || !userBoards),
    select: data => data.data,
  });

  const { data: { workspaces } = { workspaces: null }, isLoading: isWorkspacesLoading } = useQuery({
    queryFn: () => getAllWorkSpaces(),
    queryKey: ['get-all-workspaces'],
    enabled: !!userToken && (!isLoggedIn || !userWorkspaces),
    select: data => data.data,
  });

  useEffect(() => {
    if (!equals(userBoards, boards) && boards && !isBoardsLoading) {
      setBoards(boards);
    }
    if (!equals(userWorkspaces, workspaces) && workspaces && !isWorkspacesLoading) {
      setWorkspaces(workspaces);
    }
  }, [userBoards, boards, userWorkspaces, workspaces]);

  return <>{children}</>;
};

export default ProtectedRoute;
