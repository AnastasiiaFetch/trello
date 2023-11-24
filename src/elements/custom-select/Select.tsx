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

const Select: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Box w="fit-content">
          <Button variant="secondary" borderRadius="md" size="md">
            {title}
          </Button>
        </Box>
      </PopoverTrigger>
      <Portal>
        <PopoverContent width="21rem">
          <PopoverArrow />
          <PopoverBody>
            <Grid templateColumns="repeat(1, 1fr)" gap={2}>
              {children}
            </Grid>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default Select;
