import { useMemo } from 'react';
import Board from '../elements/icons/Board';
import Users from '../elements/icons/Users';
import Avatar from '../elements/avatar/Avatar';
import { Workspace } from '../types/workspace';
import { Board as BoardType } from '../types/board';
import { NavigateFunction } from 'react-router-dom';

export const useHeaderSelects = (
  userWorkspaces: Workspace[] | null,
  userBoards: BoardType[] | null,
  navigate: NavigateFunction,
  boardModal: any,
  workspaceModal: any
) => {
  return useMemo(() => {
    return [
      {
        title: 'Робочі області',
        type: 'workspaces',
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
        type: 'selected-boards',
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
                  boardId: selectedBoard.id,
                  isSelected: true,
                  onClick: () => navigate(`/${currentWorkspace?.id}/b/${selectedBoard.id}`),
                };
              })
          : [],
      },
      {
        title: 'Створити',
        type: 'create',
        elements: [
          {
            contentTitle: 'Створити робочу область',
            leftIcon: Users,
            onClick: () => workspaceModal.onOpen(),
            content:
              'Робоча область — це група дощок і людей. Використовуйте її, щоб організувати роботу вашої команди, компанії або інше.',
          },
          {
            contentTitle: 'Створити дошку',
            leftIcon: Board,
            onClick: () => boardModal.onOpen(),
            content:
              'Дошка зроблена з карток, що згруповані в списки. Використовуйте її для управління проектами, відстеження інформації або організації інших процесів.',
          },
        ],
      },
    ];
  }, [userWorkspaces, userBoards, navigate, boardModal, workspaceModal]);
};
