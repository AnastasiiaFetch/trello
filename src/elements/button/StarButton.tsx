import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import Star from '../icons/Star';

const StarButton = ({
  mode = 'sidebar',
  isSelected,
  ...rest
}: {
  mode?: 'nav' | 'sidebar';
  isSelected: boolean;
  [key: string]: any;
}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <Box
      cursor="pointer"
      bgColor="transparent"
      onClick={e => {
        e.stopPropagation();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
