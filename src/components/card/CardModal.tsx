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
  useMediaQuery,
  Flex,
  chakra,
} from '@chakra-ui/react';

import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { FileUploadWrapper } from '../fileUpload/FileUploadWrapper';
import FileUpload from '../fileUpload/FileUpload';
import FilesPreview from '../fileUpload/FilesPreview';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Checklist } from '../../types/card';
import Editor from '../editor/Editor';
import Button from '../../elements/button/Button';
import IconButton from '../../elements/button/IconButton';
import X from '../../elements/icons/X';
import EyeOpen from '../../elements/icons/EyeOpen';
import TextIcon from '../../elements/icons/TextIcon';
import Tag from '../../elements/icons/Tag';
import CheckSquare from '../../elements/icons/CheckSquare';
import Picture from '../../elements/icons/Picture';
import { parseDescription, parseValue } from '../../utils/parseDOMElement';
import Attachments from '../../elements/icons/Attachments';
import CardSection from './CardSection';
import { ButtonPopover } from '../../elements/popover/ButtonPopover';
import CheckList from './checklist/CheckList';
import Trash from '../../elements/icons/Trash';
import CreateCheckListModalBody from './modals/CreateCheckListModalBody';
import useCard from '../../composable/useCard';
import CreateLabelModalBody from './modals/CreateLabelModalBody';
import { useMemo } from 'react';
import { deleteCard, deleteCardFile, uploadCardFiles } from '../../api';
import CreateWrapperModal from './modals/CreateWrapperModal';
import DeleteCardModal from './modals/DeleteCardModal';
import EditableInputElement from '../../elements/editable/EditableInputElement';

type CreateBoardModalProps = { isOpen: boolean; onClose: () => void; card: Card };

const DEFAULT_CHECKLIST = (value: string) => ({
  key: value,
  items: [],
});

const CardModal: React.FC<CreateBoardModalProps> = ({ isOpen, onClose, card }) => {
  const { workspaceId, boardId } = useParams();
  const [isEditing, setIsEditing] = useBoolean();
  const navigate = useNavigate();

  const { updateCard, refetchBoard, refetchCard } = useCard(boardId as string, card.id);

  const [isLargerThanLg] = useMediaQuery('(min-width: 62em)');
  const [isLargerThanMd] = useMediaQuery('(min-width: 48em)');
  const [isLargerThanSm] = useMediaQuery('(min-width: 30em)');

  const initialFiles = useMemo(() => card?.files || [], [card?.files]);
  const fileWrapper = useMemo(() => {
    return card.files.find(file => !!file.isWrapper) || null;
  }, [card?.files]);

  const { control, getValues, setValue, reset } = useForm({
    mode: 'onChange',
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

  const handleCardUpdate = (
    input: 'title' | 'description' | 'checklists' | 'labels',
    value?: any
  ) => {
    if (input === 'description') {
      const parsedValue = parseValue(value);
      if (parsedValue.length === 0 || parsedValue[0].textContent?.trim().length === 0) {
        value = '';
      }
      setValue(input, value);
    }

    if (input === 'title') {
      if (value.trim().length === 0) {
        value = card?.title;
      }
      setValue(input, value);
    }

    if (input === 'checklists') {
      const { checklists } = getValues();
      value = checklists;
    }

    updateCard({ id: card.id, payload: { [input]: value } });
  };

  const handleReset = () => {
    refetchBoard();
    onClose();
    navigate(`/${workspaceId}/b/${boardId}`);
  };

  const handleModalClose = () => {
    reset({
      title: card?.title || '',
      description: card?.description || '',
    });
    handleReset();
  };

  const handleCardDelete = async () => {
    try {
      await deleteCard(card?.id as string);
    } catch (e) {
      console.log('card deleting error:', e);
    }
    handleReset();
  };

  const cardActionsButton = [
    {
      id: 'tags',
      label: 'Мітки',
      icon: Tag,
      content: (
        <CreateLabelModalBody
          initialLabels={card?.labels}
          onValueSave={labels => {
            handleCardUpdate('labels', labels);
          }}
        />
      ),
    },
    {
      id: 'checklists',
      label: 'Перелік',
      icon: CheckSquare,
      content: (
        <CreateCheckListModalBody
          onValueSave={value => {
            appendChecklist(DEFAULT_CHECKLIST(value));
            handleCardUpdate('checklists');
          }}
        />
      ),
    },
    {
      id: 'wrap',
      label: 'Обкладинка',
      icon: Picture,
      content: <CreateWrapperModal card={card} files={initialFiles} onValueSave={refetchCard} />,
    },
    {
      id: 'delete',
      label: 'Видалити',
      icon: Trash,
      content: <DeleteCardModal onSuccess={handleCardDelete} title={card.title} />,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} size="xl">
      <ModalOverlay />
      <ModalContent
        w={isLargerThanLg ? '60%' : '90%'}
        maxW="90%"
        h="fit-content"
        position="relative"
        bgColor={'modal.background'}
      >
        <ModalCloseButton />
        {(card?.colorWrapper || fileWrapper) && (
          <Flex
            cursor={'pointer'}
            w="100%"
            h="6rem"
            justify={'center'}
            bgColor={card?.colorWrapper || 'rgba(0, 0, 0, 0.1)'}
          >
            {fileWrapper && (
              <chakra.img
                maxW={'80%'}
                height="100%"
                objectFit={'cover'}
                objectPosition={'top'}
                src={fileWrapper.url}
              />
            )}
          </Flex>
        )}
        <form onSubmit={e => e.preventDefault()}>
          <ModalBody w="100%" maxW="100%" p={6} my={8}>
            <FileUploadWrapper
              initialFiles={initialFiles}
              uploadHandler={file => uploadCardFiles(card?.id, file)}
              onSuccessUpload={() => refetchCard()}
              deleteHandler={file => deleteCardFile(card?.id as string, file)}
              onSuccessfulDelete={() => refetchCard()}
            >
              <Grid
                color={'modal.text'}
                w="100%"
                height="100%"
                gap={10}
                templateColumns={isLargerThanMd ? '3fr 1fr' : '1fr'}
                onClick={(e: any) => {
                  if (e.target.classList.contains('attachments_custom_btn')) {
                    return;
                  }
                  e.stopPropagation();
                }}
              >
                <GridItem minW="100%" w="100%">
                  <VStack w="100%" maxW="100%" align="start" gap={6}>
                    {!!card.labels.length && (
                      <CardSection
                        icon={<Tag size="20" />}
                        title={
                          <Text py={1} fontWeight="semibold" fontSize="text-lg">
                            Мітки
                          </Text>
                        }
                      >
                        <HStack gap={2} flexWrap={'wrap'}>
                          {card.labels.map(label => {
                            return (
                              <Flex
                                key={label.id}
                                minW={'3rem'}
                                maxW={'6rem'}
                                minH={'2rem'}
                                bgColor={label.color}
                                px={4}
                                py={1}
                                align={'center'}
                                justify={'center'}
                                borderRadius={'md'}
                              >
                                <Text
                                  fontSize={'text-xs'}
                                  overflow={'hidden'}
                                  whiteSpace={'nowrap'}
                                  textOverflow={'ellipsis'}
                                  fontWeight={'semibold'}
                                >
                                  {label.title}
                                </Text>
                              </Flex>
                            );
                          })}
                        </HStack>
                      </CardSection>
                    )}

                    <CardSection
                      icon={<EyeOpen size="20" />}
                      title={
                        <Controller
                          name="title"
                          control={control}
                          render={({ field: { value } }: any) => {
                            return (
                              <EditableInputElement
                                fontSize="text-lg"
                                whiteSpace="pre-wrap"
                                wordBreak="break-word"
                                fontWeight="semibold"
                                value={value}
                                onChange={value => setValue('title', value)}
                                handleUpdate={() => handleCardUpdate('title', value)}
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
                                    onChange={(value: string) => setValue('description', value)}
                                  />
                                  <HStack gap={2}>
                                    <Button
                                      variant="secondary"
                                      borderRadius="md"
                                      size="md"
                                      w="fit-content"
                                      backgroundColor={'blue.200'}
                                      onClick={() => {
                                        handleCardUpdate('description', value);
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
                                          description: card?.description || '',
                                        });
                                      }}
                                      _hover={{ bgColor: 'rgba(0, 0, 0, 0.1)' }}
                                      icon={<X size="15" />}
                                    />
                                  </HStack>
                                </VStack>
                              ) : (
                                <Box w="100%" onClick={setIsEditing.on} cursor={'pointer'}>
                                  {parseDescription(value)}
                                </Box>
                              )}
                            </>
                          );
                        }}
                      />
                    </CardSection>

                    {!!card?.files.length && (
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

                    {(checklists as unknown as Checklist[]).map((checklist, index) => (
                      <CardSection
                        key={checklist.id}
                        icon={<CheckSquare size="20" />}
                        title={
                          <Controller
                            name={`checklists.${index}[key]`}
                            control={control}
                            render={({ field: { value } }: any) => {
                              return (
                                <EditableInputElement
                                  fontSize="text-lg"
                                  whiteSpace="pre-wrap"
                                  wordBreak="break-word"
                                  fontWeight="semibold"
                                  width="100%"
                                  value={value}
                                  onChange={value => setValue(`checklists.${index}[key]`, value)}
                                  handleUpdate={() => {
                                    if (value.trim().length === 0) {
                                      setValue(
                                        `checklists.${index}[key]`,
                                        'Натисніть, щоб додати значення'
                                      );
                                      return;
                                    }

                                    handleCardUpdate(`checklists`);
                                  }}
                                />
                              );
                            }}
                          />
                        }
                      >
                        <CheckList
                          onListDelete={() => removeChecklist(index)}
                          items={checklist.items}
                          onItemsChange={value => setValue(`checklists.${index}[items]`, value)}
                          handleCardUpdateCb={() => {
                            handleCardUpdate(`checklists`);
                          }}
                        />
                      </CardSection>
                    ))}
                  </VStack>
                </GridItem>

                <GridItem minW="100%" w="100%" h="100%">
                  <Grid
                    w="100%"
                    templateColumns={
                      isLargerThanMd
                        ? 'repeat(1, 1fr)'
                        : isLargerThanSm
                        ? 'repeat(2, 1fr)'
                        : 'repeat(1, 1fr)'
                    }
                    gap={4}
                    mb={4}
                  >
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
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CardModal;
