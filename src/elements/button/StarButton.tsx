import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import Star from '../icons/Star';
import useBoard from '../../composable/useBoard';

const StarButton = ({
  mode = 'nav',
  isSelected,
  boardId,
  ...rest
}: {
  mode?: 'nav' | 'sidebar';
  isSelected: boolean;
  boardId: string;
  [key: string]: any;
}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const { updateBoard } = useBoard(boardId);
  return (
    <Box
      cursor="pointer"
      bgColor="transparent"
      onClick={e => {
        e.stopPropagation();
        updateBoard({ id: boardId, payload: { isSelected: !isSelected } });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={'add-to-select-btn'}
      {...rest}
    >
      <Star
        size={18}
        color={mode === 'nav' ? '#ECC94B' : 'currentColor'}
        isFilled={isSelected ? !hovered : hovered}
      />
    </Box>
  );
};

export default StarButton;
