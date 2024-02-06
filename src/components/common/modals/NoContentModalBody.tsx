import { Center, ModalBody, ModalCloseButton, Text } from '@chakra-ui/react';

export const NoContentModalBody = ({ text }: { text: string }) => {
  return (
    <>
      <ModalCloseButton />
      <ModalBody my={8}>
        <Center p={4} textAlign="center">
          <Text>{text}</Text>
        </Center>
      </ModalBody>
    </>
  );
};
