import { Box, Flex } from '@chakra-ui/react';

interface BoardContentWrapper {
  children: React.ReactNode;
  [key: string]: any;
}

const BoardContentWrapper: React.FC<BoardContentWrapper> = ({ children, ...rest }) => {
  return (
    <Box flexGrow="1" marginTop={2} position="relative" {...rest}>
      <Flex
        right={0}
        top={0}
        bottom={0}
        left={0}
        marginBottom={2}
        px={4}
        overflowX="auto"
        overflowY="hidden"
        paddingBottom={2}
        position="absolute"
        userSelect="none"
        whiteSpace="nowrap"
      >
        {children}
      </Flex>
    </Box>
  );
};

export default BoardContentWrapper;
