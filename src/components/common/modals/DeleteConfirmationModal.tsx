import {
  VStack,
  Text,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import Button from '../../../elements/button/Button';
import { useMainColor } from '../../../composable/useMainColor';

interface DeleteConfirmationModalProps {
  confirmationText: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  confirmationText,
  onSuccess,
  isOpen,
  onClose,
}) => {
  const { darkColor } = useMainColor();
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent py={4} w="90%" h="fit-content">
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={6} w={'100%'} p={4}>
            <Text textAlign={'center'} w={'100%'} fontSize={'text-sm'}>
              {confirmationText}
            </Text>
            <HStack gap={4}>
              <Button size="sm" variant="secondaryGray" onClick={onClose}>
                <Text fontSize="text-sm" color={darkColor}>
                  Скасувати
                </Text>
              </Button>
              <Button size="sm" variant="secondaryGray" bgColor={'red.300'} onClick={onSuccess}>
                <Text fontSize="text-sm" color={darkColor}>
                  Видалити
                </Text>
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
