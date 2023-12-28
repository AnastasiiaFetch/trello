import {
  Box,
  Flex,
  chakra,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  VStack,
  Center,
} from '@chakra-ui/react';
import CustomModalHeader from './ModalHeader';
import { Controller, useForm } from 'react-hook-form';
import Select from '../../../elements/select/Select';
import Input from '../../../elements/input/Input';
import useWorkspacesStore from '../../../store/workspacesState';
import { useMemo, useRef, useState } from 'react';
import { Textarea } from '../../../elements/textarea/Textarea';
import CopyButton from '../../../elements/button/CopyButton';
import { EmojiPopover } from './EmojiPopover';
import Emoji from '../../../elements/icons/Emoji';
import ColorBar from '../ColorBar/ColorBar';
import ChevronLeft from '../../../elements/icons/ChevronLeft';
import Button from '../../../elements/button/Button';
import trelloBoard from '../../../assets/images/trelloBoards.svg';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateBoardSchema, createBoardSchema } from '../../../utils/schemas';
import { useMainColor } from '../../../composable/useMainColor';
import NoContentModalBody from './NoContentModalBody';
import { useParams } from 'react-router-dom';

type CreateBoardModalProps = { isOpen: boolean; onClose: () => void };
type MenuViewType = 'main-menu' | 'background-menu';
type WorkspaceOptionType = { value: string; label: string; id: string };

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({ isOpen, onClose }) => {
  const { workspaces } = useWorkspacesStore();
  const { darkColor } = useMainColor();
  const { workspaceId } = useParams();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [menuView, setMenuView] = useState<MenuViewType>('main-menu');

  const workspaceOptions = useMemo(
    () =>
      workspaces
        ? workspaces?.map(workspace => ({
            value: workspace.name,
            label: workspace.name,
            id: workspace.id,
          }))
        : null,
    [workspaces]
  ) as WorkspaceOptionType[];

  const currentWorkspaceOption = useMemo(
    () =>
      (workspaceId
        ? workspaceOptions?.find(option => option.id === workspaceId)
        : null) as WorkspaceOptionType | null,
    [workspaceId]
  );

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(createBoardSchema),
    values: {
      name: '',
      workspace: currentWorkspaceOption || workspaceOptions?.[0],
      description: '',
      color: '#FFFFFF',
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

  const handleInputValueChange = (input: 'name' | 'workspace' | 'description', value: any) => {
    setValue(input, value);
  };

  const handleModalClose = () => {
    reset({
      name: '',
      workspace: currentWorkspaceOption || workspaceOptions?.[0],
      description: '',
      color: '#FFFFFF',
    });
    onClose();
    setMenuView('main-menu');
  };

  const onSubmit = (data: CreateBoardSchema) => {
    console.log(data);
    // onClose()
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} size="xl">
      <ModalOverlay />
      <ModalContent w="90%" h="fit-content" position="relative">
        {workspaces ? (
          <>
            {menuView === 'background-menu' && (
              <Box position="absolute" p={2}>
                <Button
                  variant="secondary"
                  borderRadius="md"
                  size="md"
                  w="100%"
                  onClick={() => setMenuView('main-menu')}
                >
                  <ChevronLeft size="22" color={darkColor} />
                </Button>
              </Box>
            )}
            <CustomModalHeader title={menuView === 'main-menu' ? 'Створення дошки' : 'Фон дошки'} />
            <ModalCloseButton />
            <form onSubmit={e => e.preventDefault()}>
              <ModalBody>
                <Flex gap={6} flexDir="column">
                  <Center>
                    <Controller
                      name="color"
                      control={control}
                      render={({ field: { value } }: any) => {
                        return (
                          <Box
                            borderRadius="md"
                            border="1px solid"
                            borderColor="gray.200"
                            boxShadow="xs"
                            p={4}
                            backgroundColor={value}
                          >
                            <chakra.img src={trelloBoard} />
                          </Box>
                        );
                      }}
                    />
                  </Center>
                  <VStack w="100%" align="start">
                    <Controller
                      name="color"
                      control={control}
                      render={({ field: { value } }: any) => {
                        return (
                          <ColorBar
                            isFullView={menuView === 'background-menu'}
                            selectedColor={value}
                            onColorSelect={(value: string) => setValue('color', value)}
                            setView={() => setMenuView('background-menu')}
                          />
                        );
                      }}
                    />
                  </VStack>
                  {menuView === 'main-menu' && (
                    <>
                      <VStack align="start" w="100%">
                        <Input
                          placeholder={''}
                          label={'Назва дошки'}
                          {...register('name')}
                          isError={!!errors?.name}
                          helpText={errors?.name?.message}
                        />
                        <Text fontSize="text-xs" color="gray.400">
                          <chakra.span>👋</chakra.span> Необхідно вказати назву дошки
                        </Text>
                      </VStack>
                      <Controller
                        name="workspace"
                        control={control}
                        render={({ field: { value }, name, ref }: any) => {
                          return (
                            <Select
                              isSearchable={false}
                              size={'xs'}
                              ref={ref}
                              name={name}
                              options={workspaceOptions}
                              label={'Робоча область'}
                              value={workspaceOptions?.find(
                                workspace => workspace.value === value.value
                              )}
                              onChange={(workspace: WorkspaceOptionType) => {
                                return handleInputValueChange('workspace', workspace);
                              }}
                              isError={!!errors?.workspace}
                              helpText={errors?.workspace?.message}
                            />
                          );
                        }}
                      />
                      <Controller
                        name="description"
                        control={control}
                        render={({ field: { value }, name }: any) => {
                          return (
                            <Flex position="relative" w="100%">
                              <Textarea
                                ref={textareaRef}
                                name={name}
                                label={'Опис'}
                                placeholder={'Додайте опис для цієї дошки...'}
                                value={value}
                                maxLength={350}
                                onChange={(
                                  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                                ) => {
                                  const value = event.target.value;
                                  handleInputValueChange('description', value);
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
                                    isOpen={selectedButton === 'emoji button'}
                                    onClose={() => {
                                      setSelectedButton(null);
                                    }}
                                    trigger={
                                      <Box
                                        cursor="pointer"
                                        onClick={() => setSelectedButton('emoji button')}
                                      >
                                        <Emoji size="20" />
                                      </Box>
                                    }
                                    onEmojiClick={handleEmojiAdd}
                                  />

                                  <Box>
                                    <Text fontSize="text-xs">{`${
                                      getValues('description')?.length || 0
                                    }/350`}</Text>
                                  </Box>
                                </Flex>
                              </Flex>
                            </Flex>
                          );
                        }}
                      />
                    </>
                  )}
                </Flex>
              </ModalBody>

              <ModalFooter mt={2} mb={4}>
                {menuView === 'main-menu' && (
                  <Button size="md" onClick={handleSubmit(onSubmit)}>
                    <Text color={darkColor} fontSize="text-sm">
                      Створити
                    </Text>
                  </Button>
                )}
              </ModalFooter>
            </form>
          </>
        ) : (
          <NoContentModalBody
            text={'Поки що у вас немає можливості створити дошку, спочатку створіть робочу область'}
          />
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateBoardModal;
