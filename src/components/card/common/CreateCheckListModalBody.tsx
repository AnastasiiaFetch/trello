import { Text, VStack } from '@chakra-ui/react';
import Button from '../../../elements/button/Button';
import Input from '../../../elements/input/Input';
import { useState } from 'react';

interface CreateCheckListModalBodyProps {
  onValueSave: (value: string) => void;
}
const CreateCheckListModalBody: React.FC<CreateCheckListModalBodyProps> = ({ onValueSave }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <VStack px={2} py={4} gap={4}>
      <Text fontWeight="semibold">Додати перелік</Text>
      <Input label="Назва" value={inputValue} onChange={e => setInputValue(e.target.value)} />
      <Button
        variant="secondary"
        borderRadius="md"
        size="md"
        backgroundColor={'blue.200'}
        onClick={() => {
          if (inputValue.trim().length === 0) {
            return;
          }
          onValueSave(inputValue);
          setInputValue('');
        }}
        _hover={{
          bgColor: 'blue.300',
        }}
      >
        <Text fontSize="text-sm" color={'modal.text'}>
          Зберегти
        </Text>
      </Button>
    </VStack>
  );
};

export default CreateCheckListModalBody;
