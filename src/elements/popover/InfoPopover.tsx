import {
  PlacementWithLogical,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';

interface InfoPopoverProps {
  children: React.ReactNode;
  triggerElement?: any;
  trigger?: 'click' | 'hover';
  placement?: PlacementWithLogical;
}

const InfoPopover: React.FC<InfoPopoverProps> = ({
  children,
  trigger = 'hover',
  triggerElement,
  placement = 'bottom',
}) => {
  return (
    <Popover
      trigger={trigger}
      placement={placement}
      openDelay={20}
      closeDelay={50}
      strategy="absolute"
    >
      <PopoverTrigger>{triggerElement}</PopoverTrigger>
      <Portal>
        <PopoverContent zIndex="10" w="fit-content">
          <PopoverArrow />
          <PopoverBody p={0} fontSize="text-xs">
            {children}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default InfoPopover;
