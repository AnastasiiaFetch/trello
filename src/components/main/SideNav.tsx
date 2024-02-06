import {
  Text,
  HStack,
  VStack,
  chakra,
  Box,
  useDisclosure,
  useMediaQuery,
  Button,
} from '@chakra-ui/react';
import useUserStore from '../../store/userState';
import Avatar from '../../elements/avatar/Avatar';
import React, { useState } from 'react';
import ChevronRight from '../../elements/icons/ChevronRight';
import IconButton from '../../elements/button/IconButton';
import ToolTip from '../../elements/tooltip';
import Plus from '../../elements/icons/Plus';
import CreateWorkspaceModal from '../common/modals/CreateWorkspaceModal';
import { TITLE_DESKTOP_LENGTH, TITLE_MOBILE_LENGTH, TITLE_TABLET_LENGTH } from '../../constants';
import { useNavigate } from 'react-router-dom';

interface SideNavProps {
  items: { id: string; icon: React.ReactElement; title: string }[] | [];
  selected: string | null;
  onSelect: (id: string) => void;
}

const SideNav: React.FC<SideNavProps> = ({ items = [], onSelect = () => {}, selected = null }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isLargerThanLg] = useMediaQuery('(min-width: 62em)');
  const [isLargerThanSm] = useMediaQuery('(min-width: 30em)');
  const workspaceModal = useDisclosure();
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  const resizableTitleLength = isLargerThanLg
    ? TITLE_DESKTOP_LENGTH
    : isLargerThanSm
    ? TITLE_TABLET_LENGTH
    : TITLE_MOBILE_LENGTH;

  return (
    <>
      <VStack maxH="100%" w="100%" px={isLargerThanLg ? '4rem' : 0}>
        <HStack gap={2}>
          <Avatar size="md" name={`${currentUser?.firstName} ${currentUser?.lastName}` || ''} />
          <Text
            fontWeight="bold"
            fontSize="text-lg"
          >{`${currentUser?.firstName} ${currentUser?.lastName}`}</Text>
        </HStack>
        <Box my="6" border="1px solid transparent" w="100%" borderTopColor="gray.400" />
        <VStack
          minW="max-content"
          w={isLargerThanLg ? '100%' : 'max-content'}
          alignItems="flex-start"
          gap={4}
        >
          <HStack w="100%" justify="space-between" pl={2} align="center">
            <Text fontWeight="semibold" fontSize="text-md">
              Робочі області
            </Text>
            <IconButton
              variant="secondary"
              color={'inherit'}
              borderRadius="md"
              size="md"
              _hover={{
                bgColor: 'rgba(0, 0, 0, 0.1)',
              }}
              icon={
                <ToolTip label="Створити робочу область">
                  <Plus size="20" />
                </ToolTip>
              }
              onClick={() => workspaceModal.onOpen()}
              aria-label="add_workspace_btn"
            />
          </HStack>
          {!!items.length ? (
            items.map(({ id, title, icon }) => (
              <HStack
                as={Button}
                variant={'unstyled'}
                w="100%"
                gap={4}
                p={2}
                my={2}
                key={id}
                justifyContent="space-between"
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => {
                  onSelect(id);
                  navigate(`/auth/main/${id}`);
                }}
                cursor="pointer"
              >
                <HStack gap={2}>
                  {icon}
                  <ToolTip label={title}>
                    <Text fontWeight="medium" whiteSpace="nowrap">
                      {title.length > resizableTitleLength
                        ? title.slice(0, resizableTitleLength) + '...'
                        : title}
                    </Text>
                  </ToolTip>
                </HStack>
                <chakra.span
                  opacity={hovered === id || selected === id ? '1' : '0'}
                  transition="all 0.2s ease-in-out"
                >
                  {isLargerThanLg ? (
                    <ChevronRight size="25" />
                  ) : (
                    <ChevronRight transform="rotate(90)" size="25" />
                  )}
                </chakra.span>
              </HStack>
            ))
          ) : (
            <Text>Список робочих областей пустий</Text>
          )}
        </VStack>
      </VStack>

      <CreateWorkspaceModal isOpen={workspaceModal.isOpen} onClose={workspaceModal.onClose} />
    </>
  );
};

export default SideNav;
