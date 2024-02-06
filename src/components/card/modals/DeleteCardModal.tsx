import { Flex, Text } from '@chakra-ui/react';
import { ModalBodyWrapper } from '.';
import Button from '../../../elements/button/Button';

interface DeleteCardModalProps {
  onSuccess: () => void;
  title: string;
}

export const DeleteCardModal: React.FC<DeleteCardModalProps> = ({ onSuccess, title }) => {
  return (
    <ModalBodyWrapper>
      <Text fontWeight={'semibold'}>Видалення картки</Text>
      <Flex width={'80%'} textAlign={'center'}>
        <Text>Ви дійсно хочете видалити картку "{title}"?</Text>
      </Flex>
      <Button
        variant="secondary"
        borderRadius="md"
        size="md"
        backgroundColor={'red.400'}
        onClick={onSuccess}
        _hover={{
          bgColor: 'red.500',
        }}
      >
        <Text fontSize={'text-sm'} color={'modal.text'}>
          Видалити
        </Text>
      </Button>
    </ModalBodyWrapper>
  );
};
