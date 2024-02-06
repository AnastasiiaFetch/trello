import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Flex, HStack, Text, VStack, chakra, useMediaQuery, useToast } from '@chakra-ui/react';
import TrelloLogo from '../../elements/icons/TrelloLogo';
import Input from '../../elements/input/Input';
import { SubmitButton } from '../../elements/button/SubmitButton';
import PasswordInput from '../../elements/input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { LoginSchema, loginSchema } from '../../utils/schemas';
import { useMutation } from '@tanstack/react-query';
import useUserStore from '../../store/userState';
import { showToast } from '../../utils/toasts';
import { loginUser } from '../../api';

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [isLargerThanLg] = useMediaQuery('(min-width: 62em)');

  const toast = useToast();
  const navigate = useNavigate();
  const { setUserToken } = useUserStore();

  const { mutate: loginMutator } = useMutation({
    mutationFn: (data: LoginSchema) => loginUser(data),
    onSuccess: (data: any) => {
      setUserToken(data.data.token);
      navigate('/auth/main');
    },
    onError: (error: any) => {
      const errorText = error?.response?.data?.message;
      showToast(toast, `${errorText}`, 'error');
    },
  });

  const onSubmit = (data: LoginSchema) => loginMutator(data);
  return (
    <VStack
      h="100%"
      w="100%"
      flex="1"
      color="main.dark"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      p={8}
    >
      <HStack gap={2} align={'center'}>
        <Text fontSize={{ base: 'text-lg', md: 'text-xl' }}>Вхід до</Text>
        <Flex gap={1} justify="center">
          <TrelloLogo size={32} />
          <chakra.span fontSize="text-xl" fontWeight="bold">
            Trello
          </chakra.span>
        </Flex>
      </HStack>

      <chakra.form
        display="flex"
        flexDir="column"
        w={isLargerThanLg ? '70%' : '90%'}
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
        <VStack w="100%" mt={4} gap={4}>
          <SubmitButton text="Увійти" onClick={handleSubmit(onSubmit)} />
          {!isLargerThanLg && (
            <Text>
              Ще не зареєстровані і бажаєте{' '}
              <Link to="/sign-up" style={{ fontWeight: 'bold' }}>
                створити акаунт?
              </Link>{' '}
            </Text>
          )}
        </VStack>
      </chakra.form>
    </VStack>
  );
};

export default SignInForm;
