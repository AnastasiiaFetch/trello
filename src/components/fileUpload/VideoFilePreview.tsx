import { Box, Center } from '@chakra-ui/react';

export const VideoFilePreview: React.FC<{
  src: string;
  type: string;
  controls?: boolean;
  onClose?: () => void;
  videoStyles?: React.CSSProperties;
}> = ({ src, type, onClose = () => {}, videoStyles, controls = false }) => (
  <Center w="100%" height="100%" position="relative" cursor="pointer">
    <video
      controls={controls}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        ...videoStyles,
      }}
      onEnded={onClose}
    >
      <source src={src} type={`video/${type}`} />
    </video>
    <Box position="absolute" bottom={2} left={2}>
      Icon V
    </Box>
  </Center>
);
