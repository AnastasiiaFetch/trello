import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useMediaQuery,
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

type CreateBoardModalProps = { isOpen: boolean; onClose: () => void };

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({ isOpen, onClose }) => {
  const { workspaces } = useWorkspacesStore();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

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
  ) as {
    value: string;
    label: string;
    id: string;
  }[];

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
    values: {
      name: '',
      workspace: workspaceOptions?.[0].value || '',
      description: '',
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
          prevTextareaValue.slice(0, start) + content + prevTextareaValue.slice(end)
        );

        setTimeout(() => {
          const currentCursorPosition = start + content.length;
          textareaRef.current?.setSelectionRange(currentCursorPosition, currentCursorPosition);
        }, 0);
      }
    }
  };

  const handleInputValueChange = (input: 'name' | 'workspace' | 'description', value: string) => {
    // setSelectedItems(value);
    setValue(input, value);
  };

  const handleModalClose = () => {
    // reset({
    //   priceSelect: priceTypeOptions[0].value,
    //   priceChangeSelect: changePriceOptions[0].value,
    //   priceInput: 0,
    //   discountInput: 0,
    //   discountSelect: discountOptions[0].value,
    // });
    // setSelectedItems(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} size="xl">
      <ModalOverlay />
      <ModalContent w="90%" maxH="100%">
        <CustomModalHeader title={'Створити дошку'} />

        <ModalCloseButton />
        <form onSubmit={e => e.preventDefault()}>
          <ModalBody overflowY="auto">
            <Flex gap={6} flexDir="column">
              <Input
                placeholder=""
                label={'Назва дошки'}
                {...register('name')}
                isError={!!errors?.name}
                helpText={errors?.name?.message}
              />
              <Controller
                name="workspace"
                control={control}
                render={({ field: { value }, name, ref }: any) => {
                  return (
                    <Select
                      size={'xs'}
                      ref={ref}
                      name={name}
                      options={workspaceOptions}
                      label={'Робоча область'}
                      value={workspaceOptions?.find(type => type.value === value)}
                      onChange={(type: (typeof workspaceOptions)[0]) => {
                        return handleInputValueChange('workspace', type.value);
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
                        placeholder={'Додайте опис для цієї дошки'}
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
                              getValues('description').length || 0
                            }/350`}</Text>
                          </Box>
                        </Flex>
                      </Flex>
                    </Flex>
                  );
                }}
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            {/* <SaveButton type="submit" onCancel={handleModalClose} size="md" /> */}
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateBoardModal;
