import { Box } from '@chakra-ui/react';

interface ListWrapperProps {
  children: React.ReactNode;
  [key: string]: any;
}

export const ListWrapper: React.FC<ListWrapperProps> = ({ children, ...rest }) => {
  return (
    <Box
      bg="list.background"
      cursor="pointer"
      display="flex"
      justifyContent="space-between"
      maxHeight="100%"
      flexDirection="column"
      boxShadow="0px 1px 1px #091E4240, 0px 0px 1px #091E424F"
      p={4}
      overflowY="auto"
      borderRadius="xl"
      position="relative"
      scrollMargin="0.5rem"
      whiteSpace="normal"
      boxSizing="border-box"
      verticalAlign="top"
      fontSize="1rem"
      fontWeight="400"
      lineHeight="1.5rem"
      w="20rem"
      {...rest}
    >
      {children}
    </Box>
  );
};
