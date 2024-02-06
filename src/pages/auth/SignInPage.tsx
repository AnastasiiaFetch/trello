import { Center, Flex, HStack, Text, VStack, chakra, useMediaQuery } from '@chakra-ui/react';
import SignInForm from '../../components/Auth/SignInForm';
import { AuthFormItem, AuthFormWrapper } from '../../components/Auth/AuthFormWrapper';
import { Helmet } from 'react-helmet-async';
import { useMainColor } from '../../composable/useMainColor';
import TrelloLogo from '../../elements/icons/TrelloLogo';
import Button from '../../elements/button/Button';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [isLargerThanLg] = useMediaQuery('(min-width: 62em)');
  const { bodyColor } = useMainColor();
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Trello | Вхід</title>
      </Helmet>
      <AuthFormWrapper>
        <AuthFormItem>
          <SignInForm />
        </AuthFormItem>
        {isLargerThanLg && (
          <AuthFormItem>
            <Center h={'100%'} p={6} bgColor={bodyColor}>
              <VStack gap={6}>
                <Text fontSize={{ base: 'text-lg', md: 'text-xl' }}>Привіт!</Text>
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
                  Якщо ви тут вперше, створіть акаунт, щоб продовжити
                </Text>

                <Button
                  variant="primary"
                  size="md"
                  bgColor={'#FFFFFF'}
                  w={'fit-content'}
                  onClick={() => navigate('/sign-up')}
                >
                  Створити акаунт
                </Button>
              </VStack>
            </Center>
          </AuthFormItem>
        )}
      </AuthFormWrapper>
    </>
  );
};

export default SignInPage;
