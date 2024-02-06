import { useEffect, useState, createContext, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Text, VStack } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';

import { DropzoneContextProps, TrelloFile } from '../../types/file';
import File from '../../elements/icons/File';

interface FileUploadWrapperProps {
  children: React.ReactNode;
  initialFiles?: TrelloFile[];
  isDisabled?: boolean;
  maxFiles?: number;
  uploadHandler?: (file: any) => Promise<AxiosResponse<any, any>>;
  onSuccessUpload?: () => void;
  deleteHandler?: (file: any) => Promise<AxiosResponse<any, any>>;
  onSuccessfulDelete?: () => void;
}

export const DropzoneContext = createContext<DropzoneContextProps | null>(null);

export const FileUploadWrapper: React.FC<FileUploadWrapperProps> = ({
  children,
  initialFiles = [],
  isDisabled: isDisabledProp = false,
  maxFiles = 5,
  uploadHandler,
  onSuccessUpload,
  deleteHandler,
  onSuccessfulDelete,
}) => {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    if (!initialFiles || initialFiles.length === 0) {
      setFiles([]);
    } else {
      setFiles(initialFiles);
    }
  }, [initialFiles]);

  const isDisabled = isDisabledProp || maxFiles === files.length;

  const onDrop = async (droppedFiles: File[]) => {
    if (isDisabled) {
      return;
    }

    const newFileLength = files.length + droppedFiles.length;

    if (newFileLength > maxFiles) {
      throw new Error(`Перевищена максимальна довжина для вкладень: ${maxFiles}`);
    }

    const toAssign = [
      ...droppedFiles.map((file: File) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ];

    if (uploadHandler && onSuccessUpload) {
      try {
        await Promise.all(toAssign.map(async item => await uploadHandler(item)));
        onSuccessUpload();
      } catch (e) {
        console.log('file upload error:', e);
      }
    }
  };

  const accept: any = {
    'image/*': ['.jpg', '.jpeg', '.png'],
    'video/*': ['.gif', '.mp4', '.mov', '.MOV', '.avi', '.mkv', '.flv'],
  };

  const options = useMemo(
    () => ({
      onDrop,
      accept,
      maxFiles,
      disabled: isDisabled,
    }),
    [files]
  );

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  const onFileDelete = async (file: TrelloFile) => {
    if (deleteHandler && onSuccessfulDelete) {
      try {
        await deleteHandler(file);
        onSuccessfulDelete();
      } catch (e) {
        console.log('file delete error:', e);
      }
    }
  };

  const dropzoneProps = useDropzone(options);
  const contextProps = useMemo(() => ({ files, dropzoneProps, onFileDelete }), [files]);

  return (
    <DropzoneContext.Provider value={contextProps}>
      <Box h="100%" w="100%" position="relative" {...dropzoneProps.getRootProps()} cursor="pointer">
        {children}
        <Box
          zIndex={100000}
          position="absolute"
          bgColor={'modal.background'}
          color={'modal.text'}
          display={dropzoneProps.isDragActive ? 'block' : 'none'}
          h="100%"
          w="100%"
          left={2}
          right={0}
          top={-2}
          bottom={0}
        >
          <VStack gap={4} h="100%" w="100%" justify="center" align="center">
            <File size="35" />
            <Text fontWeight="semibold">Перетягніть файли для завантаження</Text>
          </VStack>
        </Box>
      </Box>
    </DropzoneContext.Provider>
  );
};
