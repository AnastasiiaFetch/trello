import { useEffect, useState, createContext, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { DropzoneContextProps, TrelloFile } from '../../types/file';
import { Box, Text, VStack } from '@chakra-ui/react';
import File from '../../elements/icons/File';

interface FileUploadWrapperProps {
  children: React.ReactNode;
  initialFiles?: TrelloFile[];
  onChange?: (files: TrelloFile[]) => void;
  isDisabled?: boolean;
  maxFiles?: number;
  uploadHandler?: (files: any) => Promise<TrelloFile | TrelloFile[]>;
  onSuccessUpload?: (file: TrelloFile) => void;
  deleteHandler?: (names?: string[]) => void;
  onSuccessfulDelete?: () => void;
}

export const DropzoneContext = createContext<DropzoneContextProps | null>(null);

export const FileUploadWrapper: React.FC<FileUploadWrapperProps> = ({
  children,
  initialFiles = [],
  onChange = () => {},
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
      const initialFilesState = initialFiles.map((file: string | TrelloFile) => {
        if (typeof file === 'string') {
          return {
            id: undefined,
            isWrap: false,
            preview: file,
          };
        }
        return {
          ...file,
          isWrap: false,
          preview: file.url,
        };
      });
      setFiles(initialFilesState);
    }
  }, []);

  const isDisabled = isDisabledProp || maxFiles === files.length;

  const onDrop = async (acceptedFiles: File[]) => {
    if (isDisabled) {
      return;
    }

    const accepted = acceptedFiles.filter(
      acceptedFile => !files.find(file => file.name === acceptedFile.name)
    );

    const newFileLength = files.length + accepted.length;
    let toSlice = 0;
    if (newFileLength > maxFiles) {
      toSlice = newFileLength - maxFiles;
    }
    const toAssign = accepted.slice(0, accepted.length - toSlice);

    const newFiles = [
      ...files,
      ...toAssign.map((file: File) =>
        Object.assign(file, { preview: URL.createObjectURL(file), isWrap: false })
      ),
    ];

    setFiles(newFiles);
    onChange(newFiles);
    if (uploadHandler && onSuccessUpload) {
      try {
        const res = await uploadHandler(accepted[0]);
        onSuccessUpload(res as TrelloFile);
      } catch (e) {
        console.log('e', e);
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

  const onFileDelete = async (file: File) => {
    const changedFiles = files.filter((f: File) => f.name !== file.name);
    setFiles(changedFiles);
    onChange(changedFiles);
    if (deleteHandler && onSuccessfulDelete) {
      try {
        await deleteHandler([file.name]);
        onSuccessfulDelete();
      } catch (e) {
        console.log('e', e);
      }
    }
  };

  const dropzoneProps = useDropzone(options);
  const contextProps = useMemo(() => ({ files, dropzoneProps }), [files]);

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
          left={0}
          right={0}
          top={0}
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
