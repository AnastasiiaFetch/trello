import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Flex, Text, VStack, chakra } from '@chakra-ui/react';
import TrelloLogo from '../../elements/icons/TrelloLogo';
import Input from '../../elements/input/Input';
import { SubmitButton } from '../../elements/button/SubmitButton';
import PasswordInput from '../../elements/input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { LoginSchema, loginSchema } from '../../utils/schemas';

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
    navigate('/auth/true');
  };
  return (
    <VStack
      h="100%"
      w="100%"
      flex="1"
      color="main.dark"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
    >
      <Box w="max-content">
        <Flex gap={1}>
          <Text fontSize="text-xl">Привіт! З поверненням до</Text>
          <TrelloLogo size={35} />
          <chakra.span fontSize="text-xl" fontWeight="bold">
            Trello
          </chakra.span>
        </Flex>
        <Text fontSize="text-sm" fontWeight="bold">
          Виконайте вхід, щоб продовжити
        </Text>
      </Box>

      <chakra.form
        display="flex"
        flexDir="column"
        w="70%"
        gap={6}
        my={6}
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <Input
          {...register('email')}
          label={'Пошта'}
          type="email"
          size="sm"
          placeholder={'Введіть електронну пошту'}
          isError={!!errors.email}
          helpText={errors.email?.message as string}
        />
        <PasswordInput
          {...register('password')}
          label={'Пароль'}
          size="sm"
          placeholder={'Введіть пароль'}
          isError={!!errors.password}
          helpText={errors.password?.message}
        />
        <VStack w="100%" mt={4}>
          <SubmitButton text="Увійти" onClick={handleSubmit(onSubmit)} />
          <Text>
            Ще не зареєстровані і бажаєте{' '}
            <Link to="/sign-up" style={{ fontWeight: 'bold' }}>
              створити акаунт?
            </Link>{' '}
            Або{' '}
            <Link to="/" style={{ fontWeight: 'bold' }}>
              забули пароль?
            </Link>
          </Text>
        </VStack>
      </chakra.form>
    </VStack>
  );
};

export default SignInForm;
