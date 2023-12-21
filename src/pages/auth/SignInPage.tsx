import { Box, Text, chakra } from '@chakra-ui/react';
import signIn from '../../assets/images/signIn.svg';
import SignInForm from '../../components/Auth/SignInForm';
import { AuthFormItem, AuthFormWrapper } from '../../components/Auth/AuthFormWrapper';
import { Helmet } from 'react-helmet-async';

const SignInPage = () => {
  return (
    <>
      <Helmet>
        <title>Trello | Вхід</title>
      </Helmet>
      <AuthFormWrapper>
        <AuthFormItem position="relative" mt={5}>
          <chakra.img src={signIn} />
          <Box position="absolute" top="12%" left="20%">
            <Text fontSize="text-xs" fontWeight="bold" color="main.light">
              <a href="https://storyset.com/user">User illustrations by Storyset</a>
            </Text>
          </Box>
        </AuthFormItem>
        <AuthFormItem>
          <SignInForm />
        </AuthFormItem>
      </AuthFormWrapper>
    </>
  );
};

export default SignInPage;
