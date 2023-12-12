import { Flex } from '@chakra-ui/react';

interface BoardWrapperProps {
  children: React.ReactNode;
  [key: string]: any;
}

const BoardWrapper: React.FC<BoardWrapperProps> = ({ children, ...rest }) => {
  return (
    <Flex flexDir="column" height="100%" position="relative" {...rest}>
      {children}
    </Flex>
  );
};

export default BoardWrapper;
