import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Text,
  VStack,
  useBoolean,
  useDisclosure,
} from '@chakra-ui/react';

import { Controller, useForm } from 'react-hook-form';
import { useMemo, useRef, useState } from 'react';

import { Board } from '../../types/board';
import { createTextPlaceholder } from '../../utils/parseDOMElement';

import InfoCircle from '../../elements/icons/InfoCircle';
import ChevronLeft from '../../elements/icons/ChevronLeft';
import Tag from '../../elements/icons/Tag';
import Trash from '../../elements/icons/Trash';
import X from '../../elements/icons/X';
import Emoji from '../../elements/icons/Emoji';

import EditableInputElement from '../../elements/editable/EditableInputElement';
import BasicSelectItem from '../../elements/custom-select/BasicSelectItem';
import ToolTip from '../../elements/tooltip';
import Button from '../../elements/button/Button';
import IconButton from '../../elements/button/IconButton';
import { Textarea } from '../../elements/textarea/Textarea';
import CopyButton from '../../elements/button/CopyButton';
import { EmojiPopover } from '../common/modals/EmojiPopover';
import LabelsBar from '../common/LabelsBar/LabelsBar';
import ColorBar from '../common/ColorBar/ColorBar';

interface BoardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  board: Board;
  handleUpdate: (input: string, value: string) => void;
  handleDelete: () => void;
}

export const BoardSidebar: React.FC<BoardSidebarProps> = ({
  isOpen,
  onClose,
  board,
  handleUpdate,
  handleDelete,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const emojiPopover = useDisclosure();
  const [isEditing, setIsEditing] = useBoolean();
  const [menuView, setMenuView] = useState<
    'main-view' | 'labels-view' | 'colors-view' | 'delete-view'
  >('main-view');

  const {
    control,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    values: {
      name: board?.name || '',
      description: board?.description || '',
      color: board?.color || '',
    },
  });

  const handleEmojiAdd = (content: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;

      if (start !== null && end !== null) {
        const prevTextareaValue = getValues('description');

        setValue(
          'description',
          prevTextareaValue?.slice(0, start) + content + prevTextareaValue?.slice(end)
        );

        setTimeout(() => {
          const currentCursorPosition = start + content.length;
          textareaRef.current?.setSelectionRange(currentCursorPosition, currentCursorPosition);
        }, 0);
      }
    }
  };

  const handleBoardUpdate = (input: 'name' | 'description' | 'color', value: string) => {
    if (value.trim().length === 0) {
      value = board?.[input];
    }

    setValue(input, value);

    handleUpdate(input, value);
  };

  const boardSidebarButtons = [
    {
      id: 1,
      title: 'Змінити фон',
      icon: <Flex h={'22px'} w={'22px'} bgColor={board.color} borderRadius={'md'} />,
      onClick: () => setMenuView('colors-view'),
      label: 'colors',
    },
    {
      id: 0,
      title: 'Мітки',
      icon: <Tag size="22" />,
      onClick: () => setMenuView('labels-view'),
      label: 'labels',
    },

    {
      id: 2,
      title: 'Видалити дошку',
      icon: <Trash size="22" />,
      onClick: () => setMenuView('delete-view'),
      label: 'delete',
    },
  ];

  const boardSidebarHeader = useMemo(() => {
    return menuView === 'main-view'
      ? 'Меню дошки'
      : menuView === 'colors-view'
      ? 'Колір дошки'
      : menuView === 'delete-view'
      ? 'Видалення дошки'
      : 'Мітки дошки';
  }, [menuView]);

  const handleClose = () => {
    setMenuView('main-view');
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={handleClose} size={'sm'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton onClick={handleClose} zIndex={'1000'} />
        <DrawerBody p={4}>
          <VStack align={'start'} w={'100%'} gap={4} position={'relative'}>
            {menuView !== 'main-view' && (
              <IconButton
                size="sm"
                top={'-2'}
                left={'0'}
                position={'absolute'}
                color={'modal.text'}
                aria-label="close-btn"
                variant="secondary"
                onClick={() => setMenuView('main-view')}
                _hover={{ bgColor: 'gray.100' }}
                icon={<ChevronLeft size="24" />}
              />
            )}

            <HStack align={'center'} justify={'center'} w={'100%'}>
              <Text fontWeight={'bold'} fontSize={'text-md'}>
                {boardSidebarHeader}
              </Text>
            </HStack>
            <Divider />

            {menuView === 'labels-view' && <LabelsBar />}

            {menuView === 'colors-view' && (
              <Controller
                name="color"
                control={control}
                render={({ field: { value } }: any) => {
                  return (
                    <ColorBar
                      isFullView={true}
                      selectedColor={value}
                      onColorSelect={(value: string) => {
                        handleBoardUpdate('color', value);
                      }}
                    />
                  );
                }}
              />
            )}

            {menuView === 'delete-view' && (
              <VStack align={'center'} justify={'center'} w={'100%'} gap={4}>
                <Text textAlign={'center'}>{`Ви дійсно хочете видалити дошку ${board.name}?`}</Text>
                <HStack gap={4}>
                  <Button
                    size="sm"
                    variant="secondaryGray"
                    onClick={() => setMenuView('main-view')}
                  >
                    <Text>Скасувати</Text>
                  </Button>
                  <Button
                    size="sm"
                    variant="secondaryGray"
                    bgColor={'red.300'}
                    onClick={handleDelete}
                  >
                    <Text>Видалити</Text>
                  </Button>
                </HStack>
              </VStack>
            )}

            {menuView === 'main-view' && (
              <>
                <VStack align={'start'} w={'100%'}>
                  <HStack color={'gray.500'}>
                    <Text fontWeight={'semibold'}>Назва дошки</Text>
                    <ToolTip label={'Натисніть на назву дошки для редагування'}>
                      <InfoCircle />
                    </ToolTip>
                  </HStack>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field: { value } }: any) => {
                      return (
                        <EditableInputElement
                          fontSize="text-md"
                          whiteSpace="pre-wrap"
                          wordBreak="break-word"
                          value={value}
                          onChange={value => setValue('name', value)}
                          handleUpdate={() => handleBoardUpdate('name', value)}
                        />
                      );
                    }}
                  />
                </VStack>

                <VStack align={'start'} w={'100%'}>
                  <HStack color={'gray.500'}>
                    <Text fontWeight={'semibold'}>Опис дошки</Text>
                    <ToolTip label={'Натисніть на опис дошки для редагування'}>
                      <InfoCircle />
                    </ToolTip>
                  </HStack>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field: { value }, name }: any) => {
                      return (
                        <>
                          {isEditing ? (
                            <VStack align="start" gap={2} w="100%">
                              <Flex position="relative" w="100%">
                                <Textarea
                                  ref={textareaRef}
                                  name={name}
                                  placeholder={'Додайте опис для цієї дошки...'}
                                  value={value}
                                  maxLength={350}
                                  onChange={(
                                    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                                  ) => {
                                    const value = event.target.value;
                                    setValue('description', value);
                                  }}
                                  isError={!!errors?.description}
                                  helpText={errors?.description?.message}
                                />
                                <Flex
                                  w="95%"
                                  mx={4}
                                  my={2}
                                  bgColor="white"
                                  position="absolute"
                                  bottom="0"
                                  align="center"
                                  justify={'space-between'}
                                  color="gray.400"
                                >
                                  <Flex gap={2} alignItems="center" position="relative">
                                    <CopyButton zIndex={1} value={value} aria-label="copy button" />

                                    <EmojiPopover
                                      isOpen={emojiPopover.isOpen}
                                      onClose={emojiPopover.onClose}
                                      trigger={
                                        <Box cursor="pointer" onClick={emojiPopover.onOpen}>
                                          <Emoji size="20" />
                                        </Box>
                                      }
                                      onEmojiClick={handleEmojiAdd}
                                    />

                                    <Box>
                                      <Text fontSize="text-xs">{`${value?.length || 0}/350`}</Text>
                                    </Box>
                                  </Flex>
                                </Flex>
                              </Flex>
                              <HStack gap={2}>
                                <Button
                                  variant="secondary"
                                  borderRadius="md"
                                  size="md"
                                  w="fit-content"
                                  backgroundColor={'blue.200'}
                                  onClick={() => {
                                    handleBoardUpdate('description', value);
                                    setIsEditing.off();
                                  }}
                                  _hover={{
                                    bgColor: 'blue.300',
                                  }}
                                >
                                  <Text fontSize="text-xs" color={'modal.text'}>
                                    Зберегти
                                  </Text>
                                </Button>
                                <IconButton
                                  color={'modal.text'}
                                  size="md"
                                  aria-label="close-btn"
                                  variant="secondary"
                                  onClick={() => {
                                    setIsEditing.off();
                                    reset({
                                      ...getValues(),
                                      description: board?.description || '',
                                    });
                                  }}
                                  _hover={{ bgColor: 'rgba(0, 0, 0, 0.1)' }}
                                  icon={<X size="15" />}
                                />
                              </HStack>
                            </VStack>
                          ) : (
                            <Box w="100%" onClick={setIsEditing.on} cursor={'pointer'}>
                              {value || createTextPlaceholder()}
                            </Box>
                          )}
                        </>
                      );
                    }}
                  />
                </VStack>

                <Divider />

                {boardSidebarButtons.map(button => {
                  return (
                    <BasicSelectItem
                      key={`${button.id}-${button.label}`}
                      borderRadius="md"
                      px="1rem"
                      py="0.5rem"
                      fontSize="text-sm"
                      leftIcon={button.icon}
                      contentTitle={button.title}
                      onClick={button.onClick}
                      _hover={{
                        bgColor: 'gray.100',
                      }}
                      aria-label={`board-${button.label}-btn`}
                    />
                  );
                })}
              </>
            )}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
