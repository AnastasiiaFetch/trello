import { Tooltip } from '@chakra-ui/react';

const ToolTip: React.FC<{ label: string; children: React.ReactNode }> = ({
  label = '',
  children,
}) => {
  return (
    <Tooltip padding={2} borderRadius={'0.325rem'} label={label} hasArrow placement="bottom-end">
      {children}
    </Tooltip>
  );
};

export default ToolTip;
