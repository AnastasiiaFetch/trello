import { Box, Text, chakra } from '@chakra-ui/react';
import { AuthFormItem, AuthFormWrapper } from '../../components/Auth/AuthFormWrapper';
import signUp from '../../assets/images/signUp.svg';
import SignUpForm from '../../components/Auth/SignUpForm';
import { Helmet } from 'react-helmet-async';

const SignUpPage = () => {
  return (
    <>
      <Helmet>
        <title>Trello | Реєстрація</title>
      </Helmet>
      <AuthFormWrapper>
        <AuthFormItem position="relative" mt={5}>
          <chakra.img src={signUp} />
          <Box position="absolute" bottom="18%" left="24%">
            <Text fontSize="text-xs" fontWeight="bold" color="main.dark">
              <a href="https://storyset.com/user">User illustrations by Storyset</a>
            </Text>
          </Box>
        </AuthFormItem>
        <AuthFormItem>
          <SignUpForm />
        </AuthFormItem>
      </AuthFormWrapper>
    </>
  );
};

export default SignUpPage;
