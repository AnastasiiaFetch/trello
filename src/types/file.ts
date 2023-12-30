import { DropzoneState } from 'react-dropzone';

export interface TrelloFile {
  id: string;
  name: string;
  url: string;
  bytes: number;
  referenceId: string;
  entityType: string;
  created: string;
  md5Hash: string;
  originalName: string;
}

export interface DropzoneContextProps {
  files: any[];
  dropzoneProps: DropzoneState;
}
