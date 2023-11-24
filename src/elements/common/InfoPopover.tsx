import {
  PlacementWithLogical,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';

const InfoPopover = ({
  children,
  trigger,
  placement = 'top',
}: {
  children: React.ReactNode;
  trigger: 'click' | 'hover';
  placement?: PlacementWithLogical;
}) => {
  return (
    <Popover
      trigger={trigger}
      placement={placement}
      openDelay={20}
      closeDelay={50}
      strategy="absolute"
    >
      <PopoverTrigger>
        {/* <InfoCircle color="var(--chakra-colors-gray-600)" size="18" /> */}
      </PopoverTrigger>
      <Portal>
        <PopoverContent zIndex="100000">
          <PopoverArrow />
          <PopoverBody fontSize="text-sm">{children}</PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default InfoPopover;
