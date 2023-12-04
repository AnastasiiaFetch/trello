import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllBoards, getAllWorkSpaces } from '../api';
import useColorStore from '../store/colorState';
import { useEffect } from 'react';
import theme from '../theme';
import useWorkspacesStore from '../store/workspacesState';
import useBoardsStore from '../store/boardsState';
import { equals } from 'ramda';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const { boardId } = useParams();
  const { color: mainColor, setColor } = useColorStore();
  const { workspaces: userWorkspaces, setWorkspaces } = useWorkspacesStore();
  const { boards: userBoards, setBoards } = useBoardsStore();

  useEffect(() => {
    if (!boardId && mainColor !== theme.colors.basic) {
      setColor(theme.colors.basic);
    }
  }, [boardId]);

  const { data: { boards } = { boards: null }, isLoading: isBoardsLoading } = useQuery({
    queryFn: () => getAllBoards(),
    queryKey: ['get-all-boards'],
    staleTime: Infinity,
    select: data => data.data,
  });

  const { data: { workspaces } = { workspaces: null }, isLoading: isWorkspacesLoading } = useQuery({
    queryFn: () => getAllWorkSpaces(),
    queryKey: ['get-all-workspaces'],
    staleTime: Infinity,
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
