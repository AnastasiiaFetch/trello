import { useContext } from 'react';
import { DropzoneContext } from './DropzoneContext';
import { DropzoneContextProps } from '../../types/file';
import { Box, VStack } from '@chakra-ui/react';

interface FileUploadWrapperProps {
  children: React.ReactNode;
}
const FileUploadWrapper: React.FC<FileUploadWrapperProps> = ({ children }) => {
  const { dropzoneProps } = useContext(DropzoneContext) as DropzoneContextProps;

  return (
    <Box h="100%" w="100%" position="relative">
      <VStack h="100%" w="100%" {...dropzoneProps.getRootProps()} cursor="pointer">
        {children}
      </VStack>
    </Box>
  );
};

export default FileUploadWrapper;
