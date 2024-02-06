import { VStack, Text, Divider, Flex, HStack } from '@chakra-ui/react';
import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../elements/button/Button';
import Input from '../../../elements/input/Input';
import Edit from '../../../elements/icons/Edit';
import useUserStore from '../../../store/userState';
import LogOut from '../../../elements/icons/LogOut';

import { useMainColor } from '../../../composable/useMainColor';
import useUser from '../../../composable/useUser';
import useColorStore from '../../../store/colorState';
import theme from '../../../theme';

const SET_FIRST_NAME = 'SET_FIRST_NAME';
const SET_LAST_NAME = 'SET_LAST_NAME';

type State = {
  firstName: string;
  lastName: string;
};

type ActionType = {
  type: string;
  payload?: any;
};

const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case SET_FIRST_NAME:
      return { ...state, firstName: action.payload };
    case SET_LAST_NAME:
      return { ...state, lastName: action.payload };
    default:
      return state;
  }
};

export const UserModal = () => {
  const { darkColor } = useMainColor();
  const { setColor } = useColorStore();
  const { currentUser, setUserToken } = useUserStore();
  const { updateUser } = useUser();
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, {
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
  });

  const handleUserLogout = () => {
    setUserToken('');
    setColor(theme.colors.basic);
    navigate('/sign-in');
  };

  const handleStateUpdate = () => {
    dispatch({ type: SET_FIRST_NAME, payload: currentUser?.firstName || '' });
    dispatch({ type: SET_LAST_NAME, payload: currentUser?.lastName || '' });
  };

  const handleReset = () => {
    handleStateUpdate();
    setIsEdit(false);
  };

  const handleEdit = async () => {
    if (!isEdit) {
      setIsEdit(true);
      handleStateUpdate();
      return;
    }

    updateUser({
      firstName: state.firstName,
      lastName: state.lastName,
    });

    handleReset();
  };

  return (
    <VStack w={'100%'} p={2}>
      <VStack w={'100%'} align={'start'} px={4} my={2}>
        <Text fontSize={'text-xs'} fontWeight={'bold'} color={darkColor}>
          {`Користувач: ${currentUser?.firstName} ${currentUser?.lastName || ''}`}
        </Text>
      </VStack>
      <Divider />
      {isEdit && (
        <>
          <VStack w={'100%'} align={'start'} my={2}>
            <VStack align={'start'} w={'100%'}>
              <Text fontSize={'text-xs'} fontWeight={'bold'}>
                Ім'я
              </Text>
              <Input
                size="xs"
                fontSize={'text-xs'}
                h={'2rem'}
                value={state.firstName}
                onChange={e => dispatch({ type: SET_FIRST_NAME, payload: e.target.value })}
              />
            </VStack>
            <VStack align={'start'} w={'100%'}>
              <Text fontSize={'text-xs'} fontWeight={'bold'}>
                Прізвище
              </Text>
              <Input
                size="xs"
                fontSize={'text-xs'}
                h={'2rem'}
                value={state.lastName}
                onChange={e => dispatch({ type: SET_LAST_NAME, payload: e.target.value })}
              />
            </VStack>
          </VStack>
          <Divider />
        </>
      )}
      {isEdit ? (
        <HStack w={'100%'}>
          <Button
            variant="secondaryGray"
            borderRadius="md"
            minW="max-content"
            aria-label={'edit-user-btn'}
            onClick={handleReset}
          >
            <Flex w={'100%'} gap={4} align="center" justify={'center'}>
              <Text fontSize="text-xs" whiteSpace={'nowrap'} color={darkColor}>
                Скасувати
              </Text>
            </Flex>
          </Button>
          <Button
            variant="secondaryGray"
            borderRadius="md"
            minW="max-content"
            aria-label={'edit-user-btn'}
            onClick={handleEdit}
            bgColor={'blue.200'}
          >
            <Flex w={'100%'} gap={4} align="center" justify={'center'}>
              <Text fontSize="text-xs" whiteSpace={'nowrap'} color={darkColor}>
                Зберегти
              </Text>
            </Flex>
          </Button>
        </HStack>
      ) : (
        <Button
          variant="secondary"
          borderRadius="md"
          minW="max-content"
          aria-label={'edit-user-btn'}
          onClick={handleEdit}
          _hover={{ bgColor: 'rgba(0, 0, 0, 0.1)' }}
        >
          <Flex w={'100%'} gap={4} align="start">
            <Edit size="15" color={darkColor} />
            <Text fontSize="text-xs" whiteSpace={'nowrap'} color={darkColor}>
              Редагувати профіль
            </Text>
          </Flex>
        </Button>
      )}
      <Button
        variant="secondary"
        borderRadius="md"
        minW="max-content"
        aria-label={'edit-user-btn'}
        onClick={handleUserLogout}
        _hover={{ bgColor: 'rgba(0, 0, 0, 0.1)' }}
      >
        <Flex w={'100%'} gap={4} align="start">
          <LogOut size="15" color={darkColor} />
          <Text fontSize="text-xs" whiteSpace={'nowrap'} color={darkColor}>
            Вийти
          </Text>
        </Flex>
      </Button>
    </VStack>
  );
};
