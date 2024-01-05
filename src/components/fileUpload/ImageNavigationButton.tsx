import { Box } from '@chakra-ui/react';

const ImageNavigationButton: React.FC<{
  style: React.CSSProperties;
  onClick: () => void;
  icon: React.ReactElement;
  displayCondition: boolean;
}> = ({ style, onClick, icon, displayCondition }) => (
  <Box
    style={{
      width: 'fit-content',
      position: 'absolute',
      color: 'white',
      cursor: 'pointer',
      zIndex: '1000',
      ...style,
    }}
    display={displayCondition ? 'block' : 'none'}
    onClick={onClick}
  >
    {icon}
  </Box>
);

export default ImageNavigationButton;
