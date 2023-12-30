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
import { useParams } from 'react-router-dom';
import CustomModalHeader from '../common/modals/ModalHeader';
import { DropzoneProvider } from '../fileUpload/DropzoneContext';
import FileUploadWrapper from '../fileUpload/FileUploadWrapper';
import FileUpload from '../fileUpload/FileUpload';
import Input from '../../elements/input/Input';

type CreateBoardModalProps = { isOpen: boolean; onClose: () => void };
type MenuViewType = 'main-menu' | 'background-menu';
type WorkspaceOptionType = { value: string; label: string; id: string };

const CardModal: React.FC<CreateBoardModalProps> = ({ isOpen, onClose }) => {
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
  };

  const onSubmit = (data: any) => {
    console.log(data);
    // onClose()
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} size="xl">
      <ModalOverlay />
      <ModalContent w="90%" h="fit-content" position="relative">
        <CustomModalHeader title={''} />
        <ModalCloseButton />
        <form onSubmit={e => e.preventDefault()}>
          <ModalBody>
            <DropzoneProvider>
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
                </Flex>

                <FileUpload />
              </FileUploadWrapper>
            </DropzoneProvider>
          </ModalBody>

          <ModalFooter mt={2} mb={4}></ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CardModal;
