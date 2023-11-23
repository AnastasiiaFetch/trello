import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getAllBoards, getAllWorkSpaces } from '../api';
import { AxiosResponse } from 'axios';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const { data: boards = null, isLoading: isBoardsLoading } = useQuery({
    queryFn: () => getAllBoards(),
    queryKey: ['get-all-boards'],
    select: data => data.data,
  });

  const { data: workspaces = null, isLoading: isWorkspacesLoading } = useQuery({
    queryFn: () => getAllWorkSpaces(),
    queryKey: ['get-all-workspaces'],
    enabled: false,
    select: data => data.data,
  });

  console.log(boards);
  console.log(workspaces);

  return <>{children}</>;
};

export default ProtectedRoute;
