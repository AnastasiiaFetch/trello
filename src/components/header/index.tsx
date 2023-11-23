import { Flex, GridItem, Text } from '@chakra-ui/react';
import TrelloLogo from '../../elements/icons/TrelloLogo';
import { CustomSelectProps } from '../../types/select';
import Select from '../../elements/custom-select/Select';
import Board from '../../elements/icons/Board';
import Grid from '../../elements/icons/Grid';
import Users from '../../elements/icons/Users';
import CreateSelectItem from '../../elements/custom-select/CreateSelectItem';
import BasicSelectItem from '../../elements/custom-select/BasicSelectItem';
import WorkSpaceSelectItem from '../../elements/custom-select/WorkSpaceSelectItem';

const TrelloHeader = () => {
  const headerSelects = [
    {
      title: 'Робочі області',
      mode: 'work-space',
      elements: [{ leftIcon: '', contentTitle: 'Робоча зона 1', onClick: () => console.log('1') }],
    },
    { title: 'Важливе', mode: 'selected', elements: [{}] },
    {
      title: 'Створити',
      mode: 'create',
      elements: [
        {
          contentTitle: 'Створити дошку',
          leftIcon: Board,
          onClick: () => {},
          content:
            'Дошка зроблена з карток, що згруповані в списки. Використовуйте її для управління проектами, відстеження інформації або організації інших процесів.',
        },
        {
          contentTitle: 'Шаблони',
          leftIcon: Grid,
          onClick: () => {},
          content: 'Скористуйтеся шаблоном дошки, щоб оптимізувати робочий процес.',
        },
        {
          contentTitle: 'Створити робочу область',
          leftIcon: Users,
          onClick: () => {},
          content:
            'Робоча область — це група дощок і людей. Використовуйте її, щоб організувати роботу вашої команди, компанії або інше.',
        },
      ],
    },
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
        {headerSelects.map(({ title, mode, elements }, index) => (
          <Select key={`${title}-${index}`} title={title}>
            {elements.map((element, elementIndex) => (
              <GridItem key={`${title}-item-${elementIndex}`} maxW="100%" overflowX="hidden">
                {mode === 'create' && <CreateSelectItem {...element} />}
                {mode === 'selected' && <BasicSelectItem {...element} />}
                {mode === 'work-space' && <WorkSpaceSelectItem {...element} />}
              </GridItem>
            ))}
          </Select>
        ))}
      </Flex>
      <Flex></Flex>
    </Flex>
  );
};

export default TrelloHeader;
