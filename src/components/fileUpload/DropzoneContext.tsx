import { Box, Center, Text } from '@chakra-ui/react';
import { useEffect, useState, createContext, useMemo } from 'react';
import { DropzoneState, useDropzone } from 'react-dropzone';
import { DropzoneContextProps, TrelloFile } from '../../types/file';
import Button from '../../elements/button/Button';

// const FileUpload: React.FC<FileUploadProps> = ({
//   initialFiles,
//   onChange = () => {},
//   maxFiles = 5,
//   uploadHandler,
//   onSuccessUpload,
//   isDisabled: isDisabledProp = false,
// }) => {
// const [files, setFiles] = useState<any[]>([]);

// useEffect(() => {
//   if (!initialFiles || initialFiles.length === 0) {
//     setFiles([]);
//   } else {
//     const initialFilesState = initialFiles.map((file: string | TrelloFile) => {
//       if (typeof file === 'string') {
//         return {
//           id: undefined,
//           preview: file,
//         };
//       }
//       return {
//         ...file,
//         preview: file.url,
//       };
//     });
//     setFiles(initialFilesState);
//   }
// }, [initialFiles]);

// const isDisabled = isDisabledProp || maxFiles === files.length;

// const onDrop = async (acceptedFiles: File[]) => {
//   if (isDisabled) {
//     return;
//   }

//   const accepted = acceptedFiles.filter(
//     acceptedFile => !files.find(file => file.name === acceptedFile.name)
//   );

//   const newFileLength = files.length + accepted.length;
//   let toSlice = 0;
//   if (newFileLength > maxFiles) {
//     toSlice = newFileLength - maxFiles;
//   }
//   const toAssign = accepted.slice(0, accepted.length - toSlice);

//   const newFiles = [
//     ...files,
//     ...toAssign.map((file: File) => Object.assign(file, { preview: URL.createObjectURL(file) })),
//   ];

//   setFiles(newFiles);
//   onChange(newFiles);
//   if (uploadHandler && onSuccessUpload) {
//     try {
//       const res = await uploadHandler(accepted[0]);
//       onSuccessUpload(res as TrelloFile);
//     } catch (e) {
//       console.log('e', e);
//     }
//   }
// };

// const accept: any = {
//   'image/*': ['.jpg', '.jpeg', '.png'],
//   'video/*': ['.gif', '.mp4', '.mov', '.MOV', '.avi', '.mkv', '.flv'],
// };

// const options = {
//   onDrop,
//   accept,
//   maxFiles,
//   disabled: isDisabled,
// };

// useEffect(() => {
//   return () => files.forEach(file => URL.revokeObjectURL(file.preview));
// }, []);

// const { getRootProps, getInputProps, isDragActive } = useDropzone(options);
//   return (
//     <Box {...getRootProps()}>
//       //container
//     </Box>

// <Button size="sm" width="fit-content">
//     <Text fontSize="text-xs">Вкладення</Text>
//   </Button>
//   <input type="button" {...getInputProps()} disabled={false} />
//   );
// };

// export default FileUpload;

interface DropzoneProviderProps {
  children: React.ReactNode;
  initialFiles?: TrelloFile[];
  onChange?: (files: TrelloFile[]) => void;
  isDisabled?: boolean;
  maxFiles?: number;
  uploadHandler?: (files: any) => Promise<TrelloFile | TrelloFile[]>;
  onSuccessUpload?: (file: TrelloFile) => void;
}

export const DropzoneContext = createContext<DropzoneContextProps | null>(null);

export const DropzoneProvider: React.FC<DropzoneProviderProps> = ({
  children,
  initialFiles = [],
  onChange = () => {},
  isDisabled: isDisabledProp = false,
  maxFiles = 5,
  uploadHandler,
  onSuccessUpload,
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
            preview: file,
          };
        }
        return {
          ...file,
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
      ...toAssign.map((file: File) => Object.assign(file, { preview: URL.createObjectURL(file) })),
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

  const options = {
    onDrop,
    accept,
    maxFiles,
    disabled: isDisabled,
  };

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  const dropzoneProps = useDropzone(options);
  const contextProps = useMemo(() => ({ files, dropzoneProps }), [files]);

  console.log('1');

  return <DropzoneContext.Provider value={contextProps}>{children}</DropzoneContext.Provider>;
};
