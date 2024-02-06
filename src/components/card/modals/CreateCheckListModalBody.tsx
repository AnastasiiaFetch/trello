import { Text } from '@chakra-ui/react';
import { useState } from 'react';

import Button from '../../../elements/button/Button';
import Input from '../../../elements/input/Input';
import { ModalBodyWrapper } from '.';

interface CreateCheckListModalBodyProps {
  onValueSave: (value: string) => void;
}

export const CreateCheckListModalBody: React.FC<CreateCheckListModalBodyProps> = ({
  onValueSave,
}) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <ModalBodyWrapper>
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
    </ModalBodyWrapper>
  );
};
