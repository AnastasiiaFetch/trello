import { Flex } from '@chakra-ui/react';

interface WorkspaceWrapperProps {
  children: React.ReactNode;
  [key: string]: any;
}

const WorkspaceWrapper: React.FC<WorkspaceWrapperProps> = ({ children, ...rest }) => {
  return (
    <Flex
      flexDir="column"
      maxH="90vh"
      overflowY="auto"
      justify="start"
      align="center"
      gap={4}
      w="100%"
      py="2rem"
      {...rest}
    >
      {children}
    </Flex>
  );
};

export default WorkspaceWrapper;
