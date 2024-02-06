import { VStack } from '@chakra-ui/react';

interface ModalBodyWrapperProps {
  children: React.ReactNode;
}

export const ModalBodyWrapper: React.FC<ModalBodyWrapperProps> = ({ children }) => {
  return (
    <VStack gap={4} px={2} my={4}>
      {children}
    </VStack>
  );
};
