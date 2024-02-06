import { useParams } from 'react-router-dom';
import useColorStore from '../store/colorState';
import { useEffect } from 'react';
import theme from '../theme';
import useUser from '../composable/useUser';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { boardId } = useParams();
  const { color: mainColor, setColor } = useColorStore();

  useEffect(() => {
    if (!boardId && mainColor !== theme.colors.basic) {
      setColor(theme.colors.basic);
    }
  }, [boardId]);

  useUser();

  return <>{children}</>;
};

export default ProtectedRoute;
