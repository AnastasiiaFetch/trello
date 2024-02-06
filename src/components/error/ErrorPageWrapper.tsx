import {
  Center,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
  chakra,
  useMediaQuery,
} from '@chakra-ui/react';
import Button from '../../elements/button/Button';
import ArrowRight from '../../elements/icons/ArrowRight';
import { useNavigate } from 'react-router-dom';

interface ErrorPageWrapperProps {
  errorIcon: any;
  errorText: string;
}
const ErrorPageWrapper: React.FC<ErrorPageWrapperProps> = ({ errorIcon, errorText }) => {
  const [isLargerThanMd] = useMediaQuery('(min-width: 48em)');
  const [isLargerThanLg] = useMediaQuery('(min-width: 62em)');

  const navigate = useNavigate();
  const go = (target: any) => () => navigate(target);
  return (
    <Grid w={'100%'} templateColumns={isLargerThanLg ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'} gap={4}>
      {isLargerThanMd && (
        <GridItem
          p={4}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          maxH={'95vh'}
        >
          <chakra.img src={errorIcon} />
        </GridItem>
      )}
      <GridItem p={4} maxH={'95vh'}>
        <Center h={'100%'} p={8}>
          <VStack gap={4} textAlign={'center'} maxW={'100%'}>
            <Text>{errorText}</Text>
            <HStack gap={4}>
              <Button variant="secondaryGray" onClick={go(-2)}>
                <HStack>
                  <ArrowRight size="20" transform="rotate(180)" />
                  <Text>Назад</Text>
                </HStack>
              </Button>
              <Button onClick={() => navigate(`/auth/main`)}>Головна</Button>
            </HStack>
          </VStack>
        </Center>
      </GridItem>
    </Grid>
  );
};

export default ErrorPageWrapper;
