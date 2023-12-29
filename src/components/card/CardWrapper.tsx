import { Flex } from '@chakra-ui/react';

interface CardWrapperProps {
  children: React.ReactNode;
  [key: string]: any;
}
const CardWrapper: React.FC<CardWrapperProps> = ({ children, ...rest }) => {
  return (
    <Flex userSelect="none" padding={4} mb={4} minH="3rem" color="main.light" {...rest}>
      {children}
    </Flex>
  );
};

export default CardWrapper;
