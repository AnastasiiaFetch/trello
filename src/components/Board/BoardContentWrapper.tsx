import { Box, Flex } from '@chakra-ui/react';

interface BoardContentWrapper {
  children: React.ReactNode;
  [key: string]: any;
}

const BoardContentWrapper: React.FC<BoardContentWrapper> = ({ children, ...rest }) => {
  return (
    <Box position="relative" flexGrow={1} {...rest}>
      <Flex
        right={0}
        top={0}
        bottom={0}
        left={0}
        px={6}
        py={6}
        mb={4}
        gap={6}
        position="absolute"
        userSelect="none"
        whiteSpace="nowrap"
        overflowX="auto"
        scrollSnapType="x mandatory"
        css={{
          scrollbarColor: 'rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.1)',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            height: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            marginInlineStart: '1.5rem',
            marginInlineEnd: '1.5rem',
          },
        }}
      >
        {children}
      </Flex>
    </Box>
  );
};

export default BoardContentWrapper;
