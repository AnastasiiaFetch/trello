import { Flex } from '@chakra-ui/react';

interface ListContentWrapperProps {
  children: React.ReactNode;
  [key: string]: any;
}

export const ListContentWrapper: React.FC<ListContentWrapperProps> = ({ children, ...rest }) => {
  return (
    <Flex
      flexDir="column"
      my={2}
      pr={1}
      height="100%"
      overflowX="hidden"
      overflowY="auto"
      zIndex={1}
      userSelect="none"
      {...rest}
    >
      {children}
    </Flex>
  );
};
