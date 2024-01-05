import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  Grid,
  GridItem,
  HStack,
  useBoolean,
  useDisclosure,
} from '@chakra-ui/react';

import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { FileUploadWrapper } from '../fileUpload/FileUploadWrapper';
import FileUpload from '../fileUpload/FileUpload';
import FilesPreview from '../fileUpload/FilesPreview';
import { useNavigate, useParams } from 'react-router-dom';
import EditableElement from '../../elements/editable/EditableInputElement';
import { Card, Checklist } from '../../types/card';
import Editor from '../editor/Editor';
import Button from '../../elements/button/Button';
import IconButton from '../../elements/button/IconButton';
import X from '../../elements/icons/X';
import EyeOpen from '../../elements/icons/EyeOpen';
import TextIcon from '../../elements/icons/TextIcon';
import UserPlus from '../../elements/icons/UserPlus';
import Tag from '../../elements/icons/Tag';
import CheckSquare from '../../elements/icons/CheckSquare';
import Picture from '../../elements/icons/Picture';
import ArrowRight from '../../elements/icons/ArrowRight';
import { parseDescription, parseValue } from '../../utils/parseDOMElement';
import Attachments from '../../elements/icons/Attachments';
import CardSection from './CardSection';

import { useEffect, useState } from 'react';
import { ButtonPopover } from '../../elements/popover/ButtonPopover';
import CheckList from './checklist/CheckList';
import CreateCheckListModalBody from './common/CreateChecklistModalBody';
import Trash from '../../elements/icons/Trash';

type CreateBoardModalProps = { isOpen: boolean; onClose: () => void; card: Card };

const DEFAULT_CHECKLIST = (value: string) => ({
  key: value,
  items: [],
});

const CardModal: React.FC<CreateBoardModalProps> = ({ isOpen, onClose, card }) => {
  const { workspaceId, boardId } = useParams();
  const [isEditing, setIsEditing] = useBoolean();
  const navigate = useNavigate();

  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean } | null>(null);

  useEffect(() => {
    setVisibleSections({
      attachments: true,
      wrap: false,
      participants: false,
      tags: false,
      checklists: true,
      move: false,
    });
  }, [card]);

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
    // resolver: yupResolver(createBoardSchema),
    values: {
      title: card?.title || '',
      description: card?.description || '',
      checklists: card?.checklists || [],
    },
  });

  const {
    fields: checklists,
    append: appendChecklist,
    remove: removeChecklist,
  } = useFieldArray({ control, name: 'checklists' });

  const handleInputValueChange = (input: 'title' | 'description', value: any) => {
    if (input === 'description') {
      const parsedValue = parseValue(value);
      if (parsedValue.length === 0 || parsedValue[0].textContent?.trim().length === 0) {
        value = '';
      }
    }
    setValue(input, value);
  };

  const handleModalClose = () => {
    reset({
      title: card?.title || '',
      description: card?.description || '',
    });
    onClose();
    navigate(`/${workspaceId}/b/${boardId}`);
  };

  const cardActionsButton = [
    {
      id: 'participants',
      label: 'Учасники',
      icon: UserPlus,
    },
    { id: 'tags', label: 'Мітки', icon: Tag },
    {
      id: 'checklists',
      label: 'Перелік',
      icon: CheckSquare,
      content: (
        <CreateCheckListModalBody
          onValueSave={value => {
            setVisibleSections(prevVisibleSections => ({
              ...prevVisibleSections,
              checklists: true,
            }));
            appendChecklist(DEFAULT_CHECKLIST(value));
          }}
        />
      ),
    },
    { id: 'wrap', label: 'Обкладинка', icon: Picture },
    { id: 'move', label: 'Перемістити', icon: ArrowRight },
    { id: 'delete', label: 'Видалити', icon: Trash },
  ];

  const onSubmit = (data: any) => {
    console.log(data);
    // onClose()
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} size="xl">
      <ModalOverlay />
      <ModalContent
        w="60%"
        maxW="90%"
        h="fit-content"
        position="relative"
        bgColor={'modal.background'}
      >
        <ModalCloseButton />
        <Box w="100%" h="5rem" bgColor="yellow"></Box>
        <form onSubmit={e => e.preventDefault()}>
          <ModalBody w="100%" maxW="100%" p={6}>
            <FileUploadWrapper>
              <Grid
                color={'modal.text'}
                w="100%"
                height="100%"
                gap={10}
                templateColumns="3fr 1fr"
                onClick={(e: any) => {
                  if (e.target.classList.contains('attachments_custom_btn')) {
                    return;
                  }
                  e.stopPropagation();
                }}
              >
                <GridItem minW="100%" w="100%">
                  <VStack w="100%" maxW="100%" align="start" gap={6}>
                    <CardSection
                      icon={<EyeOpen size="20" />}
                      title={
                        <Controller
                          name="title"
                          control={control}
                          render={({ field: { value } }: any) => {
                            return (
                              <EditableElement
                                fontSize="text-lg"
                                whiteSpace="pre-wrap"
                                wordBreak="break-word"
                                fontWeight="semibold"
                                value={value}
                                onChange={value => handleInputValueChange('title', value)}
                              />
                            );
                          }}
                        />
                      }
                    >
                      <Text
                        overflow="hidden"
                        maxW="35vw"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        fontSize="text-xs"
                        color="gray.400"
                      >
                        {`Картка '${card?.title}'`}
                      </Text>
                    </CardSection>

                    <CardSection
                      icon={<TextIcon size="20" />}
                      title={
                        <Text py={1} fontWeight="semibold" fontSize="text-lg">
                          Опис
                        </Text>
                      }
                    >
                      <Controller
                        name="description"
                        control={control}
                        render={({ field: { value } }: any) => {
                          return (
                            <>
                              {isEditing ? (
                                <VStack align="start" gap={2}>
                                  <Editor
                                    value={value}
                                    onChange={value => handleInputValueChange('description', value)}
                                  />
                                  <HStack gap={2}>
                                    <Button
                                      variant="secondary"
                                      borderRadius="md"
                                      size="md"
                                      w="fit-content"
                                      backgroundColor={'blue.200'}
                                      onClick={setIsEditing.off}
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
                                          description: card?.description || '',
                                        });
                                      }}
                                      _hover={{ bgColor: 'rgba(0, 0, 0, 0.1)' }}
                                      icon={<X size="15" />}
                                    />
                                  </HStack>
                                </VStack>
                              ) : (
                                <Box w="100%" onClick={setIsEditing.on}>
                                  {parseDescription(value)}
                                </Box>
                              )}
                            </>
                          );
                        }}
                      />
                    </CardSection>

                    {visibleSections?.attachments && (
                      <CardSection
                        icon={<Attachments size="20" />}
                        title={
                          <Text py={1} fontWeight="semibold" fontSize="text-lg">
                            Вкладення
                          </Text>
                        }
                      >
                        <FilesPreview />
                      </CardSection>
                    )}

                    {visibleSections?.checklists && (
                      <>
                        {(checklists as unknown as Checklist[]).map((checklist, index) => (
                          <CardSection
                            key={checklist.id}
                            icon={<CheckSquare size="20" />}
                            title={
                              <EditableElement
                                fontSize="text-lg"
                                whiteSpace="pre-wrap"
                                wordBreak="break-word"
                                fontWeight="semibold"
                                width="100%"
                                value={getValues(`checklists.${index}[key]`)}
                                onChange={value => setValue(`checklists.${index}[key]`, value)}
                              />
                            }
                          >
                            <CheckList
                              onListDelete={() => removeChecklist(index)}
                              items={checklist.items}
                              onItemsChange={value => setValue(`checklists.${index}[items]`, value)}
                            />
                          </CardSection>
                        ))}
                      </>
                    )}
                  </VStack>
                </GridItem>

                <GridItem minW="100%" w="100%" h="100%">
                  <Grid w="100%" templateColumns="repeat(1, 1fr)" gap={4} mb={4}>
                    {cardActionsButton.map(button => {
                      return (
                        <GridItem w="100%" key={button.id} position="relative" color={'modal.text'}>
                          <ButtonPopover triggerIcon={button.icon} triggerText={button.label}>
                            {button.content}
                          </ButtonPopover>
                        </GridItem>
                      );
                    })}
                    <GridItem>
                      <FileUpload />
                    </GridItem>
                  </Grid>
                </GridItem>
              </Grid>
            </FileUploadWrapper>
          </ModalBody>
          <Button size="md" onClick={handleSubmit(onSubmit)}>
            <Text fontSize="text-sm">Створити</Text>
          </Button>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CardModal;
