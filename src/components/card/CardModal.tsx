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

import { Controller, useForm } from 'react-hook-form';
import CustomModalHeader from '../common/modals/ModalHeader';
import { FileUploadWrapper } from '../fileUpload/FileUploadWrapper';
import FileUpload from '../fileUpload/FileUpload';
import Input from '../../elements/input/Input';
import FilesPreview from '../fileUpload/FilesPreview';
import { useNavigate, useParams } from 'react-router-dom';

type CreateBoardModalProps = { isOpen: boolean; onClose: () => void };
// type MenuViewType = 'main-menu' | 'background-menu';
// type WorkspaceOptionType = { value: string; label: string; id: string };

const CardModal: React.FC<CreateBoardModalProps> = ({ isOpen, onClose }) => {
  const { workspaceId, boardId } = useParams();
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
      name: '',
      workspace: '',
      description: '',
      color: '#FFFFFF',
    },
  });

  const handleInputValueChange = (input: 'name' | 'workspace' | 'description', value: any) => {
    setValue(input, value);
  };

  const handleModalClose = () => {
    // reset({
    //   name: '',
    //   workspace: currentWorkspaceOption || workspaceOptions?.[0],
    //   description: '',
    //   color: '#FFFFFF',
    // });
    onClose();
    navigate(`/${workspaceId}/b/${boardId}`);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    // onClose()
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} size="2xl">
      <ModalOverlay />
      <ModalContent w="90%" h="fit-content" position="relative">
        <Box w="100%" h="5rem" bgColor="yellow"></Box>
        <ModalCloseButton />
        <form onSubmit={e => e.preventDefault()}>
          <ModalBody p={6}>
            <FileUploadWrapper>
              <Flex
                w="100%"
                h="100%"
                gap={6}
                flexDir="column"
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <Text>dlkfsjfdlsjdfkjs</Text>
                <Input
                  placeholder={"Компанія 'Nike'"}
                  label={'Назва робочої області'}
                  {...register('name')}
                  isError={!!errors?.name}
                  helpText={errors?.name?.message}
                />

                <Box h={'10rem'} bgColor="green"></Box>

                <FilesPreview />
              </Flex>

              <FileUpload />
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
