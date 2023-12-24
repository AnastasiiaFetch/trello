import { Box, Flex, Text } from '@chakra-ui/react';
import { useMainColor } from '../../composable/useMainColor';
import Star from '../../elements/icons/Star';
import Select from '../../elements/custom-select/Select';
import ExpandedSelectItem from '../../elements/custom-select/ExpandedSelectItem';
import Users from '../../elements/icons/Users';
import Button from '../../elements/button/Button';
import Lock from '../../elements/icons/Lock';
import Globe from '../../elements/icons/Globe';
import { Board } from '../../types/board';
import useWorkspacesStore from '../../store/workspacesState';
import Access from '../../elements/icons/Access';
import ToolTip from '../../elements/tooltip';
import useUserStore from '../../store/userState';
import Avatar from '../../elements/avatar/Avatar';
import Filter from '../../elements/icons/Filter';
import HorizontalDots from '../../elements/icons/HorizontalDots';
import UserPlus from '../../elements/icons/UserPlus';

const BoardHeader: React.FC<Board> = ({ name, isSelected, workspaceId }) => {
  const { getWorkspace } = useWorkspacesStore();
  const { currentUser } = useUserStore();
  const workSpace = getWorkspace(workspaceId)?.name;

  const accessElements = [
    {
      contentTitle: 'Приватна',
      leftIcon: Lock,
      onClick: () => {},
      content: 'Цю дошку можуть переглядати та редагувати лише її учасники.',
    },
    {
      contentTitle: 'Робоча область',
      leftIcon: Users,
      onClick: () => {},
      content: `Цю дошку можуть переглядати та редагувати всі учасники робочої області "${
        workSpace || ''
      }".`,
    },
    {
      contentTitle: 'Загальний доступ',
      leftIcon: Globe,
      onClick: () => {},
      content: 'Цю дошку може переглядати будь-хто, але лише учасники дошки можуть редагувати її.',
    },
  ];
  const { textColor, colorWithNoOpacity, darkColor } = useMainColor();
  return (
    <Box
      height="auto"
      position="relative"
      zIndex={0}
      backgroundColor={colorWithNoOpacity}
      backdropFilter="blur(10px)"
    >
      <Flex
        alignItems="center"
        height="auto"
        position="relative"
        flexWrap="wrap"
        gap={2}
        px={8}
        py={2}
        w="100%"
      >
        <Flex
          position="relative"
          alignItems="center"
          minHeight="2rem"
          flexWrap="nowrap"
          maxW="100%"
          gap={4}
        >
          <Text
            fontWeight="bold"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            color={textColor}
          >
            {name?.length > 40 ? name?.slice(0, 40) + '...' : name}
          </Text>
          <Flex gap={1}>
            <Button variant="secondary" borderRadius="md" size="md">
              <ToolTip label={isSelected ? 'Видалити з важливого' : 'Додати до важливого'}>
                <Star color={textColor} isFilled={isSelected} size="18" />
              </ToolTip>
            </Button>
            <Select
              title={
                <ToolTip label="Налаштувати доступ">
                  <Access color={textColor} size="18" />
                </ToolTip>
              }
            >
              {accessElements.map((element, index) => (
                <ExpandedSelectItem key={index} {...element} />
              ))}
            </Select>
          </Flex>
        </Flex>
        <Flex
          position="relative"
          alignItems="center"
          minHeight="2rem"
          flexWrap="nowrap"
          marginLeft="auto"
          gap={4}
        >
          <Button variant="secondary" borderRadius="md" size="md" onClick={() => {}}>
            <ToolTip label="Фільтрувати картки">
              <Flex align="center" justify="center" gap={1}>
                <Filter color={textColor} size="18" /> <Text fontSize="text-sm">Фільтри</Text>
              </Flex>
            </ToolTip>
          </Button>
          <Avatar size="sm" name={`${currentUser?.firstName} ${currentUser?.lastName}` || ''} />
          <Button variant="primary" borderRadius="md" size="md" px={4}>
            <Flex gap={2} px={1} align="center">
              <UserPlus color={darkColor} size="20" />
              <Text color={darkColor} fontSize="text-sm">
                Поділитися
              </Text>
            </Flex>
          </Button>
          <Button variant="secondary" borderRadius="md" size="md" w="fit-content">
            <HorizontalDots color={textColor} size="18" />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default BoardHeader;
