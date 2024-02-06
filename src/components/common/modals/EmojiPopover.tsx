import {
  Box,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useMediaQuery,
} from '@chakra-ui/react';
import Picker from 'emoji-picker-react';

interface EmojiPopoverProps {
  isOpen: boolean;
  trigger: any;
  onClose: () => void;
  onEmojiClick: (emoji: string) => void;
  ref?: any;
}

export const EmojiPopover: React.FC<EmojiPopoverProps> = props => {
  const { isOpen, onClose, onEmojiClick, trigger } = props;
  const [isLargerThanMd] = useMediaQuery('(min-width: 48em)');
  return (
    <Popover
      size="sm"
      placement={isLargerThanMd ? 'left-start' : 'bottom'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent zIndex={10} style={{ border: 'none' }}>
        <PopoverCloseButton />
        <PopoverBody p={0}>
          <Box w="100%">
            <Picker
              onEmojiClick={emojiObject => {
                const emoji = emojiObject.emoji;
                onEmojiClick(emoji);
              }}
              height={isLargerThanMd ? 350 : 300}
              width={isLargerThanMd ? 350 : 320}
              skinTonesDisabled
              searchDisabled
              previewConfig={{ showPreview: false }}
            />
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
