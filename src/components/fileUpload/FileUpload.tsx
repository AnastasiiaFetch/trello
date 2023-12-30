import { useContext } from 'react';
import { DropzoneContext } from './DropzoneContext';
import { DropzoneContextProps } from '../../types/file';
import Button from '../../elements/button/Button';
import { Box, Text } from '@chakra-ui/react';

const FileUpload = () => {
  const { dropzoneProps } = useContext(DropzoneContext) as DropzoneContextProps;

  return (
    <Box w="fit-content">
      <Button size="sm" position="relative" w="fit-content">
        <Text fontSize="text-xs">Вкладення</Text>
      </Button>
      <input {...dropzoneProps.getInputProps()} disabled={false} />
    </Box>
  );
};

export default FileUpload;
