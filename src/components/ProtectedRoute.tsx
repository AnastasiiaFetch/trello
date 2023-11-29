import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllBoards, getAllWorkSpaces } from '../api';
import useColorStore from '../store/colorState';
import { useEffect } from 'react';
import theme from '../theme';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const { boardId } = useParams();
  const { color: mainColor, setColor } = useColorStore();

  useEffect(() => {
    if (!boardId && mainColor !== theme.colors.basic) {
      setColor(theme.colors.basic);
    }
  }, [boardId]);

  const { data: boards = null, isLoading: isBoardsLoading } = useQuery({
    queryFn: () => getAllBoards(),
    queryKey: ['get-all-boards'],
    staleTime: Infinity,
    select: data => data.data,
  });

  const { data: workspaces = null, isLoading: isWorkspacesLoading } = useQuery({
    queryFn: () => getAllWorkSpaces(),
    queryKey: ['get-all-workspaces'],
    staleTime: Infinity,
    select: data => data.data,
  });

  useEffect(() => {
    console.log(boards);
    console.log(workspaces);
  }, [boards, workspaces]);

  return <>{children}</>;
};

export default ProtectedRoute;
