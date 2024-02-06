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
  VStack,
  useToast,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';

import { ModalHeader } from '.';
import Button from '../../../elements/button/Button';
import Input from '../../../elements/input/Input';
import Select from '../../../elements/select/Select';
import { Textarea } from '../../../elements/textarea/Textarea';
import { useMainColor } from '../../../composable/useMainColor';
import useWorkspaces from '../../../composable/useWorkspaces';

import { CreateWorkspaceSchema, createWorkspaceSchema } from '../../../utils/schemas';
import { showToast } from '../../../utils/toasts';
import { updateWorkspace } from '../../../api';
import { Workspace } from '../../../types/workspace';

type CrateWorkspaceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Workspace;
  onWorkspaceUpdateCb?: () => void;
};

const workspaceTypes = [
  'Малий бізнес',
  'Маркетинг',
  'Розробка та IT',
  'Освіта',
  'CRM для відділу продажів',
  'Інше',
];

export const CreateWorkspaceModal: React.FC<CrateWorkspaceModalProps> = ({
  isOpen,
  onClose,
  initialData = null,
  onWorkspaceUpdateCb,
}) => {
  const toast = useToast();
  const { darkColor } = useMainColor();
  const { createWorkspace, refetchWorkspaces } = useWorkspaces();

  const workspaceTypeOptions = [...workspaceTypes.map(type => ({ value: type, label: type }))];
  const currentWorkspaceOption = initialData
    ? workspaceTypeOptions.find(option => option.value === initialData?.workspaceType)
    : null;

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
    resolver: yupResolver(createWorkspaceSchema),
    values: {
      name: initialData?.name || '',
      workspaceType: currentWorkspaceOption || workspaceTypeOptions?.[0],
      description: initialData?.description || '',
    },
  });

  const handleInputValueChange = (input: 'name' | 'workspaceType' | 'description', value: any) => {
    setValue(input, value);
  };

  const { mutate } = useMutation({
    mutationFn: (data: any) => updateWorkspace(data),
    onSuccess: data => {
      refetchWorkspaces();
      onWorkspaceUpdateCb && onWorkspaceUpdateCb();
      showToast(toast, `${data.data.message}`, 'success');
    },
    onError: data => {
      showToast(toast, `${data.message}`, 'error');
    },
  });

  const onSubmit = (data: CreateWorkspaceSchema) => {
    const toSubmit = {
      ...data,
      workspaceType: data.workspaceType.value,
    };

    initialData
      ? mutate({ id: initialData.id, payload: toSubmit as any })
      : createWorkspace(toSubmit as any);

    handleModalClose();
  };

  const handleModalClose = () => {
    reset({
      name: initialData?.name || '',
      workspaceType: currentWorkspaceOption || workspaceTypeOptions?.[0],
      description: initialData?.description || '',
    });
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} size="xl">
      <ModalOverlay />
      <ModalContent pt={'1.5rem'} w="90%" h="fit-content" position="relative">
        <ModalHeader
          title={initialData ? 'Редагування робочої області' : 'Створення робочої області'}
        />
        <ModalCloseButton />
        <form onSubmit={e => e.preventDefault()}>
          <ModalBody>
            <Flex gap={6} flexDir="column">
              <VStack align="start" w="100%">
                <Input
                  placeholder={"Компанія 'Nike'"}
                  label={'Назва робочої області'}
                  {...register('name')}
                  isError={!!errors?.name}
                  helpText={errors?.name?.message}
                />
                <Text fontSize="text-xs" color="gray.400">
                  Це може бути назва вашої команди, компанії або організації
                </Text>
              </VStack>
              <Controller
                name="workspaceType"
                control={control}
                render={({ field: { value }, name, ref }: any) => {
                  return (
                    <Select
                      isSearchable={false}
                      size={'xs'}
                      ref={ref}
                      name={name}
                      options={workspaceTypeOptions}
                      label={'Тип робочої області'}
                      value={workspaceTypeOptions?.find(
                        workspaceType => workspaceType.value === value.value
                      )}
                      onChange={(workspaceType: (typeof workspaceTypeOptions)[0]) => {
                        return handleInputValueChange('workspaceType', workspaceType);
                      }}
                      isError={!!errors?.workspaceType}
                      helpText={errors?.workspaceType?.message}
                    />
                  );
                }}
              />
              <Controller
                name="description"
                control={control}
                render={({ field: { value }, name, ref }: any) => {
                  return (
                    <VStack w="100%" align="start">
                      <Flex position="relative" w="100%">
                        <Textarea
                          ref={ref}
                          name={name}
                          label={'Опис робочої області'}
                          placeholder={'Додайте опис для цієї робочої області...'}
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
                        <Box position="absolute" bottom={2} right={4} color="gray.400">
                          <Text fontSize="text-xs">{`${
                            getValues('description')?.length || 0
                          }/350`}</Text>
                        </Box>
                      </Flex>
                      <Text fontSize="text-xs" color="gray.400">
                        Запросіть учасників до дошки, стисло описавши вашу робочу область
                      </Text>
                    </VStack>
                  );
                }}
              />
            </Flex>
          </ModalBody>

          <ModalFooter mt={2} mb={4}>
            <Button variant="primary" size="md" onClick={handleSubmit(onSubmit)}>
              <Text color={darkColor} fontSize="text-sm">
                {initialData ? 'Зберегти' : 'Створити'}
              </Text>
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
