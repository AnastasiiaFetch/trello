import { Box, Flex, VStack, Text, chakra, HStack, useToast, useMediaQuery } from '@chakra-ui/react';
import { cloneElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import TrelloLogo from '../../elements/icons/TrelloLogo';
import Button from '../../elements/button/Button';
import { SubmitButton } from '../../elements/button/SubmitButton';

import { EmailInput, PasswordInputs, PersonalInformationInputs } from './common';
import { useMainColor } from '../../composable/useMainColor';
import { RegisterSchema, registerSchema } from '../../utils/schemas';
import { isEmptyObject } from '../../utils/isEmptyObject';
import { showToast } from '../../utils/toasts';
import { registerUser } from '../../api';

interface StepperProps {
  currentStep: (typeof steps)[0];
}

const steps = [
  { label: 'Персональна \n інформація', component: PersonalInformationInputs },
  { label: 'Пошта', component: EmailInput },
  { label: 'Пароль', component: PasswordInputs },
];

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  const { bodyColor } = useMainColor();
  const renderStepBoxes = () => {
    return steps.map((step, idx) => {
      return (
        <Box key={step.label} flex={1} position="relative">
          <Flex direction="column" align="center">
            <Box
              w="1.5rem"
              h="1.5rem"
              bg={currentStep.label === step.label ? bodyColor : 'white'}
              borderRadius="50%"
              border="2px solid"
              borderColor="gray.300"
            />
            <Text fontSize="text-sm" whiteSpace="pre-line" textAlign="center">
              {step.label}
            </Text>
          </Flex>
          {idx > 0 && (
            <Box
              position="absolute"
              flex="1 1 auto"
              style={{
                top: '0.8rem',
                left: 'calc(-50% + 2rem)',
                right: 'calc(50% + 2rem)',
              }}
            >
              <span
                style={{
                  borderTopStyle: 'solid',
                  borderTopWidth: '2px',
                  borderColor: 'gray.300',
                  display: 'block',
                }}
              />
            </Box>
          )}
        </Box>
      );
    });
  };

  return (
    <Flex h="fit-content" w="100%" justify="space-between" position="relative">
      {renderStepBoxes()}
    </Flex>
  );
};

const SignUpForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [currentStep, setStep] = useState(steps[0]);
  const [isLargerThanLg] = useMediaQuery('(min-width: 62em)');
  const StepComponent = currentStep.component;

  const getCurrentStepIndex = () => steps.findIndex(step => step.label === currentStep.label);

  const handleNextClick = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      setStep(nextStep);
    }
  };

  const handlePrevClick = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1];
      setStep(prevStep);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    const isNoErrors = isEmptyObject(errors);
    if (isNoErrors) return;
    const errorObject = {
      firstName: "Ім'я",
      lastName: 'Прізвище',
      email: 'Пошта',
      password: 'Пароль',
      passwordConfirmation: 'Підтвердження пароля',
    };
    for (let error in errors) {
      showToast(
        toast,
        `Поле "${errorObject[error as keyof typeof errorObject]}" містить помилку`,
        'error'
      );
    }
  }, [errors]);

  const { mutate: registerMutator } = useMutation({
    mutationFn: (data: Omit<RegisterSchema, 'passwordConfirmation'>) => registerUser(data),
    onSuccess: (data: any) => {
      showToast(toast, `${data.data.message}`, 'success');
      navigate('/sign-in');
    },
    onError: (error: any) => {
      const errorText = error?.response?.data?.message;
      showToast(toast, `${errorText}`, 'error');
    },
  });

  const onSubmit = (data: RegisterSchema) => {
    const toSubmit = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };
    registerMutator(toSubmit);
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
      <HStack gap={2} align={'center'}>
        <Text fontSize={{ base: 'text-lg', md: 'text-xl' }}>Створення акаунта</Text>
        <Flex gap={1} justify="center">
          <TrelloLogo size={32} />
          <chakra.span fontSize="text-xl" fontWeight="bold">
            Trello
          </chakra.span>
        </Flex>
      </HStack>

      <chakra.form
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <VStack w={isLargerThanLg ? '70%' : '90%'} gap={6} my={6}>
          <Stepper currentStep={currentStep} />
          {cloneElement(<StepComponent register={register} errors={errors} />, { register })}
          <Flex w="100%" justify="center">
            <HStack w="100%" gap={6}>
              <Button
                size="md"
                bgColor={'gray.50'}
                borderRadius={'md'}
                variant="primary"
                onClick={handlePrevClick}
                isDisabled={getCurrentStepIndex() === 0}
              >
                Повернутися
              </Button>
              {getCurrentStepIndex() === steps.length - 1 ? (
                <SubmitButton text="Відправити" size="md" onClick={handleSubmit(onSubmit)} />
              ) : (
                <Button size="md" variant="primary" onClick={handleNextClick}>
                  Далі
                </Button>
              )}
            </HStack>
          </Flex>
        </VStack>
      </chakra.form>
    </VStack>
  );
};

export default SignUpForm;
