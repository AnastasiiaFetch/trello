import { useContext } from 'react';
import { DropzoneContext } from './FileUploadWrapper';
import { DropzoneContextProps } from '../../types/file';

const FilesPreview = () => {
  const { files } = useContext(DropzoneContext) as DropzoneContextProps;
  // console.log(files);
  return <>fgdfgfdgdfg</>;
};

export default FilesPreview;
