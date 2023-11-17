import {
  Box,
  Grid,
  GridItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import Button from '../button/Button';
import { CustomSelectProps } from '../../types/select';

const Select: React.FC<CustomSelectProps> = ({ elements, title }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Box w="fit-content">
          <Button variant="secondary" borderRadius="md">
            {title}
          </Button>
        </Box>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          {/* <PopoverArrow /> */}
          <PopoverBody>
            <Grid templateColumns="repeat(1, 1fr)">
              {elements.map((element, index) => {
                return <GridItem key={`${element.contentTitle}-${index}`}></GridItem>;
              })}
            </Grid>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default Select;
