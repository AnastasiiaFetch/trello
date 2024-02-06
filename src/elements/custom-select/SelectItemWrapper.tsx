import { Flex } from '@chakra-ui/react';

const SelectItemWrapper: React.FC<{ children: React.ReactNode; [key: string]: any }> = ({
  children,
  ...rest
}) => {
  return (
    <Flex
      cursor="pointer"
      align="center"
      color="main.dark"
      py={1}
      px={2}
      gap={2}
      minW="100%"
      maxW="100%"
      {...rest}
    >
      {children}
    </Flex>
  );
};

export default SelectItemWrapper;
