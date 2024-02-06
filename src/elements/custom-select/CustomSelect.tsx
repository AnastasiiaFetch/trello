import {
  Box,
  Grid,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import Button from '../button/Button';

const CustomSelect: React.FC<{
  title: string | any;
  children?: React.ReactNode;
  variant?: string;
  [key: string]: any;
}> = ({ title, children, variant = 'secondary' }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Box w="fit-content">
          <Button
            variant={variant as 'secondary' | 'primary'}
            borderRadius="md"
            size="md"
            aria-label={title}
          >
            {title as string}
          </Button>
        </Box>
      </PopoverTrigger>
      {children && (
        <Portal>
          <PopoverContent width="22rem" maxH="60vh" overflow="auto">
            <PopoverArrow />
            <PopoverBody>
              <Grid templateColumns="repeat(1, 1fr)" gap={2}>
                {children}
              </Grid>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      )}
    </Popover>
  );
};

export default CustomSelect;
