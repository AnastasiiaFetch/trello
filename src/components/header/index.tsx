import { Box, Flex, GridItem, Text, useDisclosure } from '@chakra-ui/react';
import TrelloLogo from '../../elements/icons/TrelloLogo';
import { CustomSelectProps } from '../../types/select';
import Board from '../../elements/icons/Board';
import Grid from '../../elements/icons/Grid';
import Users from '../../elements/icons/Users';
import ExpandedSelectItem from '../../elements/custom-select/ExpandedSelectItem';
import BoardSelectItem from '../../elements/custom-select/BoardSelectItem';
import BasicSelectItem from '../../elements/custom-select/BasicSelectItem';
import useWorkspacesStore from '../../store/workspacesState';
import useBoardsStore from '../../store/boardsState';
import { useEffect, useState } from 'react';
import { equals } from 'ramda';
import Avatar from '../../elements/avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '../../elements/custom-select/CustomSelect';
import CreateBoardModal from '../common/modals/CreateBoardModal';
import CreateWorkspaceModal from '../common/modals/CreateWorkspaceModal';
import useUserStore from '../../store/userState';
import Input from '../../elements/input/Input';
import Search from '../../elements/icons/Search';

const TrelloHeader = () => {
  const { workspaces: userWorkspaces } = useWorkspacesStore();
  const { currentUser } = useUserStore();
  const { boards: userBoards } = useBoardsStore();
  const boardModal = useDisclosure();
  const workspaceModal = useDisclosure();
  const navigate = useNavigate();

  const [headerSelects, setHeaderSelects] = useState<CustomSelectProps[]>([]);

  useEffect(() => {
    const items = [
      {
        title: 'Робочі області',
        mode: 'work-spaces',
        elements: userWorkspaces
          ? userWorkspaces.map(workspace => ({
              leftIcon: <Avatar size="md" name={workspace.name || ''} borderRadius="md" />,
              contentTitle: workspace.name,
              onClick: () => navigate(`/w/${workspace.id}`),
            }))
          : [],
      },
      {
        title: 'Важливе',
        mode: 'selected-boards',
        elements: userBoards
          ? userBoards
              .filter(board => board.isSelected)
              .map(selectedBoard => {
                const currentWorkspace = userWorkspaces?.find(
                  workspace => workspace.id === selectedBoard.workspaceId
                );
                return {
                  leftIcon: selectedBoard.color,
                  contentTitle: selectedBoard.name,
                  content: currentWorkspace?.name,
                  isSelected: true,
                  onClick: () => navigate(`/${currentWorkspace?.id}/b/${selectedBoard.id}`),
                };
              })
          : [],
      },
      {
        title: 'Створити',
        mode: 'create',
        elements: [
          {
            contentTitle: 'Створити дошку',
            leftIcon: Board,
            onClick: () => boardModal.onOpen(),
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
            onClick: () => workspaceModal.onOpen(),
            content:
              'Робоча область — це група дощок і людей. Використовуйте її, щоб організувати роботу вашої команди, компанії або інше.',
          },
        ],
      },
    ];

    setHeaderSelects(prevItems => (equals(prevItems, items) ? prevItems : items));
  }, [userWorkspaces, userBoards]);

  return (
    <>
      <Flex alignItems="center" justify="space-between" gap={4} w="100%">
        <Flex gap={8} alignItems="center">
          <Flex
            align="center"
            justify="center"
            gap={1}
            cursor="pointer"
            onClick={() => navigate('/auth/main')}
          >
            <TrelloLogo size={35} />
            <Text fontSize="display-sm" fontWeight="bold">
              Trello
            </Text>
          </Flex>
          {headerSelects.map(({ title, mode, elements }, index) => (
            <CustomSelect key={`${title}-${index}`} title={title}>
              <>
                {elements.length > 0 ? (
                  elements.map((element, elementIndex) => (
                    <GridItem key={`${title}-item-${elementIndex}`} maxW="100%" overflowX="hidden">
                      {mode === 'create' && <ExpandedSelectItem {...element} />}
                      {mode === 'selected-boards' && <BoardSelectItem {...element} />}
                      {mode === 'work-spaces' && (
                        <BasicSelectItem {...element} fontSize="text-sm" fontWeight="semibold" />
                      )}
                    </GridItem>
                  ))
                ) : (
                  <Text textAlign="center">Цей список поки порожній...</Text>
                )}
              </>
            </CustomSelect>
          ))}
        </Flex>
        <Flex gap={4}>
          <Box w="100%">
            <Input
              size="xs"
              placeholder="Пошук"
              backgroundColor="transparent"
              color="currentcolor"
              w="100%"
              _focus={{ color: 'currentColor' }}
              _placeholder={{ color: 'currentColor' }}
              rightElement={<Search size="20" />}
            />
          </Box>
          <Avatar size="sm" name={`${currentUser?.firstName} ${currentUser?.lastName}` || ''} />
        </Flex>
      </Flex>

      <CreateBoardModal isOpen={boardModal.isOpen} onClose={boardModal.onClose} />
      <CreateWorkspaceModal isOpen={workspaceModal.isOpen} onClose={workspaceModal.onClose} />
    </>
  );
};

export default TrelloHeader;
