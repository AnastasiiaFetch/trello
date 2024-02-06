import { ModalHeader, HStack, Text } from '@chakra-ui/react';

interface CustomModalHeaderProps {
  title: string;
  subtitle?: string;
}

export const CustomModalHeader: React.FC<CustomModalHeaderProps> = ({ title, subtitle }) => {
  return (
    <ModalHeader>
      <Text fontSize="text-md" textAlign="center">
        {title}
      </Text>
      {subtitle && (
        <HStack justifyContent="center" mt="2" fontSize="text-sm">
          <Text fontSize="text-sm" fontWeight="normal">
            {subtitle}
          </Text>
        </HStack>
      )}
    </ModalHeader>
  );
};
