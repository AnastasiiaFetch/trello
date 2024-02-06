import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { VStack } from '@chakra-ui/react';

import Input from '../../../elements/input/Input';
import PasswordInput from '../../../elements/input/PasswordInput';
import { RegisterSchema } from '../../../utils/schemas';

interface InputComponentProps {
  register: UseFormRegister<RegisterSchema>;
  errors: FieldErrors<FieldValues>;
}

const InputsWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <VStack w="100%" gap={6} my={6}>
    {children}
  </VStack>
);

export const PersonalInformationInputs: React.FC<InputComponentProps> = ({ register, errors }) => (
  <InputsWrapper>
    <Input
      {...register('firstName')}
      label={"Ім'я"}
      size="sm"
      placeholder={"Введіть ім'я"}
      isError={!!errors.firstName}
      helpText={errors.firstName?.message as string}
    />
    <Input
      {...register('lastName')}
      label={'Прізвище'}
      size="sm"
      placeholder={'Введіть прізвище'}
      isError={!!errors.lastName}
      helpText={errors.lastName?.message as string}
    />
  </InputsWrapper>
);

export const EmailInput: React.FC<InputComponentProps> = ({ register, errors }) => (
  <InputsWrapper>
    <Input
      {...register('email')}
      label={'Пошта'}
      size="sm"
      placeholder={'Введіть електронну пошту'}
      isError={!!errors.email}
      helpText={errors.email?.message as string}
    />
  </InputsWrapper>
);

export const PasswordInputs: React.FC<InputComponentProps> = ({ register, errors }) => {
  return (
    <InputsWrapper>
      <PasswordInput
        {...register('password')}
        label={'Пароль'}
        size="sm"
        placeholder={'Введіть пароль'}
        isError={!!errors.password}
        helpText={errors.password?.message as string}
      />
      <PasswordInput
        {...register('passwordConfirmation')}
        label={'Підтвердження пароля'}
        size="sm"
        placeholder={'Повторіть пароль'}
        isError={!!errors.passwordConfirmation}
        helpText={errors.passwordConfirmation?.message as string}
      />
    </InputsWrapper>
  );
};
