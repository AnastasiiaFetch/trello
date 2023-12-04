export interface CustomSelectItemProps {
  leftIcon: any;
  rightIcon?: any;
  content?: string;
  contentTitle: string;
  isSelected?: boolean;
  onClick: () => void;
}

export interface CustomSelectProps {
  title: string;
  mode: string;
  elements: CustomSelectItemProps[];
}
