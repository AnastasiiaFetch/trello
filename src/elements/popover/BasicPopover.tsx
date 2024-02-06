import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverCloseButton,
  Box,
} from '@chakra-ui/react';
import { useMainColor } from '../../composable/useMainColor';
import { forwardRef } from 'react';

interface BasicPopoverProps {
  trigger: any;
  children: React.ReactNode;
  [key: string]: any;
}

export const BasicPopover: React.FC<BasicPopoverProps> = forwardRef<HTMLElement, BasicPopoverProps>(
  ({ trigger, children, ...rest }, ref) => {
    const { darkColor } = useMainColor();

    return (
      <Popover placement="top" strategy={'absolute'}>
        <PopoverTrigger>
          <Box ref={ref as any}>{trigger}</Box>
        </PopoverTrigger>
        <PopoverContent color={darkColor} left={'-5%'} {...rest}>
          <PopoverCloseButton />
          <PopoverBody>{children}</PopoverBody>
        </PopoverContent>
      </Popover>
    );
  }
);
