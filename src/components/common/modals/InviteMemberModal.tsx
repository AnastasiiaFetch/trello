import { Button, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import Input from '../../../elements/input/Input';
import { inviteUser } from '../../../api';

export const InviteMemberModal = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInviteClick = () => {
    const emailRegex = /@(gmail\.com|yahoo\.com|outlook\.com)$/;

    if (!emailRegex.test(inputValue)) {
      setError('Дозволено лише gmail, yahoo або outlook адреси');
      return;
    }

    setError('');
    inviteUser(inputValue);
    setInputValue('');
    setSuccess('Запрошення було успішно відправлено');

    setTimeout(() => setSuccess(''), 1500);
  };

  return (
    <VStack p={4} w={'100%'} gap={4}>
      <Text fontSize={'text-sm'} fontWeight={'semibold'} textAlign={'center'}>
        Запросіть більше учасників до Trello
      </Text>
      <VStack w={'100%'}>
        <Input value={inputValue} onChange={e => setInputValue(e.target.value)} />
        {error ? (
          <Text fontSize={'text-xs'} color={'red.500'}>
            {error}
          </Text>
        ) : (
          <Text fontSize={'text-xs'} color={success ? 'green.500' : 'inherit'}>
            {success || 'Запрошення буде відправлено на пошту'}
          </Text>
        )}
      </VStack>
      <Button onClick={handleInviteClick}>
        <Text fontSize={'text-xs'}>Відправити запрошення</Text>
      </Button>
    </VStack>
  );
};
