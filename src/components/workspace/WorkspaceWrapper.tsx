import { Flex } from '@chakra-ui/react';

interface WorkspaceWrapperProps {
  children: React.ReactNode;
  [key: string]: any;
}

const WorkspaceWrapper: React.FC<WorkspaceWrapperProps> = ({ children, ...rest }) => {
  return (
    <Flex
      flexDir="column"
      justify="center"
      align="center"
      gap={4}
      w="100%"
      h="90%"
      maxH="90%"
      {...rest}
    >
      {children}
    </Flex>
  );
};

export default WorkspaceWrapper;
