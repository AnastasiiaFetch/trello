import {
  PlacementWithLogical,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  forwardRef,
} from '@chakra-ui/react';
import React from 'react';
import Button from '../button/Button';
import { useMainColor } from '../../composable/useMainColor';

type ButtonPopoverProps = {
  children: React.ReactNode;
  triggerIcon: any;
  triggerText: string;
  placement?: PlacementWithLogical;
};

export const ButtonPopover: React.FC<ButtonPopoverProps> = forwardRef(
  ({ children, triggerIcon, triggerText, placement }, ref) => {
    const { darkColor } = useMainColor();
    const Icon = triggerIcon;
    return (
      <Popover trigger="click" placement={placement}>
        <PopoverTrigger>
          <Button
            color={darkColor}
            size="sm"
            minW="fit-content"
            w="100%"
            leftIcon={<Icon size="18" color={darkColor} />}
            justifyContent="start"
            gap={2}
          >
            <Text
              overflow="hidden"
              maxW="100%"
              color={darkColor}
              fontSize="text-xs"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {triggerText}
            </Text>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverCloseButton />
          <PopoverBody>{children}</PopoverBody>
        </PopoverContent>
      </Popover>
    );
  }
);
