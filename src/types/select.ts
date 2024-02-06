export interface CustomSelectItemProps {
  leftIcon: any;
  rightIcon?: any;
  content?: string;
  contentTitle: string;
  isSelected?: boolean;
  onClick: () => void;
  [key: string]: any;
}

export interface CustomSelectProps {
  title: string;
  type: string;
  elements: CustomSelectItemProps[];
}
