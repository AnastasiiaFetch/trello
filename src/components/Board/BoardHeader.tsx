import { Box, Flex, Text, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBoard } from '../../api';
import { Board } from '../../types/board';
import { useMainColor } from '../../composable/useMainColor';

import Button from '../../elements/button/Button';
import Avatar from '../../elements/avatar/Avatar';
import HorizontalDots from '../../elements/icons/HorizontalDots';
import StarButton from '../../elements/button/StarButton';
import EditableInputElement from '../../elements/editable/EditableInputElement';
import { BasicPopover } from '../../elements/popover/BasicPopover';
import UserPlus from '../../elements/icons/UserPlus';

import useBoard from '../../composable/useBoard';
import useBoards from '../../composable/useBoards';
import InviteMemberModal from '../common/modals/InviteMemberModal';

import { BoardSidebar, BoardMemberModal } from '.';

export const BoardHeader: React.FC<{ board: Board }> = ({ board }) => {
  const { textColor, colorWithNoOpacity } = useMainColor();
  const { updateBoard } = useBoard(board.id);
  const { refetchBoards } = useBoards();

  const navigate = useNavigate();
  const boardSidebarDrawer = useDisclosure();
  const [isLargerThanSm] = useMediaQuery('(min-width: 30em)');

  const triggerAvatarRef = useRef<HTMLDivElement>(null);
  const triggerShareRef = useRef<HTMLDivElement>(null);

  const [nameValue, setNameValue] = useState('');

  useEffect(() => {
    setNameValue(board.name);
  }, [board.name]);

  const handleNameBoardUpdate = () => {
    if (nameValue.trim().length === 0) {
      setNameValue(board.name);
      return;
    }
    updateBoard({ id: board.id, payload: { name: nameValue } });
  };

  const handleBoardDelete = async () => {
    try {
      await deleteBoard(board?.id as string);
    } catch (e) {
      console.log('board deleting error:', e);
    }
    refetchBoards();
    navigate(`/auth/main`);
  };

  return (
    <>
      <Box
        height="auto"
        position="relative"
        zIndex={'8'}
        backgroundColor={colorWithNoOpacity}
        backdropFilter="blur(10px)"
      >
        <Flex
          alignItems="center"
          height="auto"
          position="relative"
          flexWrap="wrap"
          gap={4}
          px={8}
          py={2}
          w="100%"
        >
          <Flex
            position="relative"
            alignItems="center"
            minHeight="2rem"
            flexWrap="nowrap"
            maxW="40%"
            gap={6}
            color={textColor}
          >
            <EditableInputElement
              color={textColor}
              value={nameValue}
              onChange={value => setNameValue(value)}
              fontWeight="bold"
              handleUpdate={handleNameBoardUpdate}
            />
            <StarButton
              isSelected={board.isSelected}
              mode="sidebar"
              height="100%"
              boardId={board.id}
            />
          </Flex>
          <Flex
            position="relative"
            alignItems="center"
            minHeight="2rem"
            flexWrap="nowrap"
            marginLeft="auto"
            gap={4}
            color={textColor}
          >
            <BasicPopover
              ref={triggerShareRef}
              trigger={
                <Button
                  w="max-content"
                  variant={'secondaryGray'}
                  flexShrink={0}
                  aria-label={'invite-trello-members-btn'}
                  onClick={() => {}}
                >
                  <Flex gap={4} align="center" px={2}>
                    <UserPlus size="16" />

                    {isLargerThanSm && (
                      <Text fontSize="text-xs" whiteSpace={'nowrap'}>
                        Поділитися
                      </Text>
                    )}
                  </Flex>
                </Button>
              }
            >
              <InviteMemberModal />
            </BasicPopover>

            <BasicPopover
              ref={triggerAvatarRef}
              trigger={
                <Avatar
                  size="xs"
                  name={`${board.user?.firstName} ${board.user?.lastName || ''}` || ''}
                />
              }
            >
              <BoardMemberModal board={board} />
            </BasicPopover>

            <Button
              variant="secondary"
              borderRadius="md"
              size="md"
              w="fit-content"
              onClick={boardSidebarDrawer.onOpen}
            >
              <Text>
                <HorizontalDots color={textColor} size="18" />
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Box>

      <BoardSidebar
        board={board}
        handleUpdate={(input: string, value: string) =>
          updateBoard({ id: board.id, payload: { [input]: value } })
        }
        handleDelete={handleBoardDelete}
        isOpen={boardSidebarDrawer.isOpen}
        onClose={boardSidebarDrawer.onClose}
      />
    </>
  );
};
