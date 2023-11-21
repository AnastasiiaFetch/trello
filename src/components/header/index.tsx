import { Flex, Text } from '@chakra-ui/react';
import TrelloLogo from '../../elements/icons/TrelloLogo';
import { CustomSelectProps } from '../../types/select';
import Select from '../../elements/select/Select';

const TrelloHeader = () => {
  const headerSelects = [
    {
      title: 'Робочі області',
      elements: [{ leftIcon: '', contentTitle: 'Робоча зона 1', onClick: () => console.log('1') }],
    },
    { title: 'Важливе', elements: [] },
    { title: 'Створити', elements: [] },
  ] as CustomSelectProps[];

  return (
    <Flex alignItems="center" justify="space-between">
      <Flex gap={8} alignItems="center">
        <Flex align="center" justify="center" gap={1}>
          <TrelloLogo size={30} />
          <Text fontSize="display-xs" fontWeight="bold">
            Trello
          </Text>
        </Flex>
        {headerSelects.map((select, index) => {
          return <Select key={`${select.title}-${index}`} {...select} />;
        })}
      </Flex>
      <Flex></Flex>
    </Flex>
  );
};

export default TrelloHeader;
