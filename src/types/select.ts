export interface CustomSelectProps {
  title: string;
  elements: {
    leftIcon: any;
    rightIcon?: any;
    content?: string;
    contentTitle: string;
    onClick: () => void;
  }[];
}
