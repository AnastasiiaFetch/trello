import { Center, Flex, HStack, Text, VStack, chakra, useMediaQuery } from '@chakra-ui/react';
import { AuthFormItem, AuthFormWrapper } from '../../components/Auth/AuthFormWrapper';
import SignUpForm from '../../components/Auth/SignUpForm';
import { Helmet } from 'react-helmet-async';
import TrelloLogo from '../../elements/icons/TrelloLogo';
import Button from '../../elements/button/Button';
import { useNavigate } from 'react-router-dom';
import { useMainColor } from '../../composable/useMainColor';

const SignUpPage = () => {
  const [isLargerThanLg] = useMediaQuery('(min-width: 62em)');
  const { bodyColor } = useMainColor();
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Trello | Реєстрація</title>
      </Helmet>
      <AuthFormWrapper>
        {isLargerThanLg && (
          <AuthFormItem position="relative" mt={5}>
            <Center h={'100%'} p={6} bgColor={bodyColor}>
              <VStack gap={6}>
                <Text fontSize={{ base: 'text-lg', md: 'text-xl' }}>З поверненням!</Text>
                <HStack>
                  <Text fontSize={{ base: 'text-lg', md: 'text-xl' }}>Ласкаво просимо до</Text>
                  <Flex gap={1} justify="center">
                    <TrelloLogo size={32} />
                    <chakra.span fontSize="text-xl" fontWeight="bold">
                      Trello
                    </chakra.span>
                  </Flex>
                </HStack>

                <Text fontSize="text-sm" fontWeight="bold">
                  Якщо ви вже маєте акаунт, виконайте вхід, щоб продовжити
                </Text>

                <Button
                  variant="primary"
                  size="md"
                  bgColor={'#FFFFFF'}
                  w={'fit-content'}
                  onClick={() => navigate('/sign-in')}
                >
                  Увійти
                </Button>
              </VStack>
            </Center>
          </AuthFormItem>
        )}
        <AuthFormItem>
          <SignUpForm />
        </AuthFormItem>
      </AuthFormWrapper>
    </>
  );
};

export default SignUpPage;
