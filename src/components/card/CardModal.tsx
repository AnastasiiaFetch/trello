import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  VStack,
  Grid,
  GridItem,
  Flex,
  HStack,
  useBoolean,
} from '@chakra-ui/react';

import { Controller, useForm } from 'react-hook-form';
import { FileUploadWrapper } from '../fileUpload/FileUploadWrapper';
import FileUpload from '../fileUpload/FileUpload';
import Input from '../../elements/input/Input';
import FilesPreview from '../fileUpload/FilesPreview';
import { useNavigate, useParams } from 'react-router-dom';
import EditableElement from '../../elements/editable/EditableInputElement';
import { Card } from '../../types/card';
import Editor from '../editor/Editor';
import { useMainColor } from '../../composable/useMainColor';
import Button from '../../elements/button/Button';
import IconButton from '../../elements/button/IconButton';
import X from '../../elements/icons/X';
import EyeOpen from '../../elements/icons/EyeOpen';
import TextIcon from '../../elements/icons/TextIcon';
import parse from 'html-react-parser';

type CreateBoardModalProps = { isOpen: boolean; onClose: () => void; card: Card };

const CardModal: React.FC<CreateBoardModalProps> = ({ isOpen, onClose, card }) => {
  const { workspaceId, boardId } = useParams();
  const { darkColor } = useMainColor();
  const [isEditing, setIsEditing] = useBoolean();
  const navigate = useNavigate();

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
    },
  });

  const handleInputValueChange = (input: 'title' | 'description', value: any) => {
    console.log(value);
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

  const addToCardButtons = [
    { id: 'add1', label: 'Учасники', icon: <></>, onClick: () => {} },
    { id: 'add2', label: 'Мітки', icon: <></>, onClick: () => {} },
    { id: 'add3', label: 'Перелік', icon: <></>, onClick: () => {} },
    { id: 'add4', label: 'Вкладення', icon: <></>, onClick: () => {} },
    { id: 'add5', label: 'Обкладинка', icon: <></>, onClick: () => {} },
  ];

  const cardActionsButton = [
    { id: 'action1', label: 'Перемістити', icon: <></>, onClick: () => {} },
    { id: 'action2', label: 'Копіювати', icon: <></>, onClick: () => {} },
    { id: 'action3', label: 'Архівувати', icon: <></>, onClick: () => {} },
  ];

  const parseDescription = htmlString => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const elements = doc.body.children;

    console.log(elements);

    return Array.from(elements).map((element, index) => {
      switch (element.nodeName.toLowerCase()) {
        case 'blockquote':
          return (
            <blockquote
              style={{ textAlign: 'right' }}
              dangerouslySetInnerHTML={{ __html: element.innerHTML }}
              key={index}
            />
          );
        case 'span':
          if (element.classList.contains('ql-size-huge')) {
            const style = { fontSize: '2em', color: 'rgb(230, 0, 0)' };
            return (
              <span
                style={style}
                dangerouslySetInnerHTML={{ __html: element.innerHTML }}
                key={index}
              />
            );
          }
          break;
        case 'p':
          return <p dangerouslySetInnerHTML={{ __html: element.innerHTML }} key={index} />;
        case 'ul':
          return (
            <ul
              dangerouslySetInnerHTML={{ __html: element.innerHTML }}
              style={{ paddingLeft: '1rem', paddingBottom: '0.5rem' }}
              key={index}
            />
          );
        case 'ol':
          return (
            <ol
              dangerouslySetInnerHTML={{ __html: element.innerHTML }}
              style={{ paddingLeft: '1rem', paddingBottom: '0.5rem' }}
              key={index}
            />
          );
        default:
          return <div dangerouslySetInnerHTML={{ __html: element.outerHTML }} key={index} />;
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} size="xl">
      <ModalOverlay />
      <ModalContent w="60%" maxW="90%" h="fit-content" position="relative">
        <ModalCloseButton />

        <Box w="100%" h="5rem" bgColor="yellow"></Box>
        <form onSubmit={e => e.preventDefault()}>
          <ModalBody w="100%" maxW="100%" p={6}>
            <FileUploadWrapper>
              <Grid color={darkColor} w="100%" height="100%" gap={8} templateColumns="4fr 2fr">
                <GridItem
                  minW="100%"
                  w="100%"
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <VStack w="100%" maxW="100%" align="start" gap={6}>
                    <Flex align="start" flexDir="column" gap={1} w="100%">
                      <HStack gap={2}>
                        <EyeOpen size="20" />
                        <Controller
                          name="title"
                          control={control}
                          render={({ field: { value } }: any) => {
                            return (
                              <EditableElement
                                fontSize="text-md"
                                width="100%"
                                fontWeight="semibold"
                                value={value}
                                onChange={value => handleInputValueChange('title', value)}
                              />
                            );
                          }}
                        />
                      </HStack>
                      <Text
                        overflow="hidden"
                        maxW="100%"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        fontSize="text-xs"
                        color="gray.400"
                      >
                        {card?.title}
                      </Text>
                    </Flex>

                    {card?.description && (
                      <VStack align="start" w="100%">
                        <HStack gap={2}>
                          <TextIcon size="20" />
                          <Text fontWeight="semibold" fontSize="text-md">
                            Опис
                          </Text>
                        </HStack>
                        <Controller
                          name="description"
                          control={control}
                          render={({ field: { value } }: any) => {
                            return (
                              <>
                                {isEditing ? (
                                  <>
                                    <Editor
                                      value={value}
                                      onChange={value =>
                                        handleInputValueChange('description', value)
                                      }
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
                                        <Text fontSize="text-xs" color={darkColor}>
                                          Зберегти
                                        </Text>
                                      </Button>
                                      <IconButton
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
                                        icon={<X size="15" color={darkColor} />}
                                      />
                                    </HStack>
                                  </>
                                ) : (
                                  <Box w="100%" onClick={setIsEditing.on}>
                                    {parseDescription(value || '')}
                                  </Box>
                                )}
                              </>
                            );
                          }}
                        />
                      </VStack>
                    )}

                    <FilesPreview />
                  </VStack>
                </GridItem>
                <GridItem minW="100%" w="100%" bgColor="green">
                  <FileUpload />
                </GridItem>
              </Grid>
            </FileUploadWrapper>
          </ModalBody>

          <ModalFooter>
            <Box>
              <Text>Footer content</Text>
            </Box>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CardModal;
