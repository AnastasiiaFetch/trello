import { DropzoneState } from 'react-dropzone';

export interface TrelloFile {
  id: string;
  name: string;
  url: string;
  preview: string;
  bytes: number;
  referenceId: string;
  entityType: string;
  created: string;
  md5Hash: string;
  originalName: string;
  isWrapper: boolean;
}

export interface DropzoneContextProps {
  files: TrelloFile[];
  dropzoneProps: DropzoneState;
  onFileDelete: (file: TrelloFile) => Promise<void>;
}
