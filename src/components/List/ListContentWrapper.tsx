import { Flex } from '@chakra-ui/react';

interface ListContentWrapperProps {
  children: React.ReactNode;
  [key: string]: any;
}

const ListContentWrapper: React.FC<ListContentWrapperProps> = ({ children, ...rest }) => {
  return (
    <Flex
      flexDir="column"
      my={0}
      mx={1}
      py={0}
      px={1}
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

export default ListContentWrapper;
