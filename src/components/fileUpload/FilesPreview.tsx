import { useContext } from 'react';
import { DropzoneContext } from './DropzoneContext';
import { DropzoneContextProps } from '../../types/file';

const FilesPreview = () => {
  const { files } = useContext(DropzoneContext) as DropzoneContextProps;
  console.log(files);
  return <></>;
};

export default FilesPreview;
