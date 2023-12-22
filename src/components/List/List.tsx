import { Box } from '@chakra-ui/react';
import ListContentWrapper from './ListContentWrapper';
import ListWrapper from './ListWrapper';

const List = () => {
  return (
    <Box
      pb={0}
      pt={2}
      px={2}
      alignSelf="flex-start"
      flexShrink={0}
      height="100%"
      whiteSpace="nowrap"
    >
      <ListWrapper>
        <>header</>
        <ListContentWrapper>
          <p>dksglsflddddddddddddddd</p>
          <p>dksglsfld</p> <p>dksglsfld</p>
          <p>dksglsfld</p> <p>dksglsfld</p>
          <p>dksglsfld</p> <p>dksglsfld</p>
          <p>dksglsfld</p> <p>dksglsfld</p>
          <p>dksglsfld</p> <p>dksglsfld</p>
          <p>dksglsfld</p> <p>dksglsfld</p>
          <p>dksglsfld</p> <p>dksglsfld</p> <p>dksglsfld</p> <p>dksglsfld</p> <p>dksglsfld</p>{' '}
          <p>dksglsfld</p> <p>dksglsfld</p>
        </ListContentWrapper>
        <>footer</>
      </ListWrapper>
    </Box>
  );
};

export default List;
