import { Box } from '@chakra-ui/react';
import VideoFilePreview from './VideoFilePreview';
import { PHOTO_FORMATS, VIDEO_FORMATS } from './constants';

const FileUploadPreview: React.FC<{
  file: any;
  onClick: () => void;
}> = ({ file, onClick }) => {
  const format = file.name?.split('.').pop()?.toLowerCase();
  return (
    <Box
      border="1px solid"
      borderColor="gray.400"
      borderRadius="8px"
      overflow="hidden"
      onClick={onClick}
      minW={'4rem'}
      width={{ base: '4rem' }}
      height={{ base: '4rem' }}
    >
      {PHOTO_FORMATS.includes(format as string) && (
        <img
          style={{
            cursor: 'pointer',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '0% 0%',
          }}
          src={file.url || file.preview}
          alt={file.name}
        />
      )}
      {VIDEO_FORMATS.includes(format as string) && (
        <VideoFilePreview
          src={file.url || file.preview}
          type={file.name?.split('.').pop()?.toLowerCase() || 'mp4'}
        />
      )}
    </Box>
  );
};

export default FileUploadPreview;
