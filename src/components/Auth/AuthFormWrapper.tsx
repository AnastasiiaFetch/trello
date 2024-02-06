import { Grid, GridItem, useMediaQuery } from '@chakra-ui/react';

interface AuthFormProps {
  children: React.ReactNode;
  [key: string]: any;
}
export const AuthFormWrapper: React.FC<AuthFormProps> = ({ children }) => {
  const [isLargerThanLg] = useMediaQuery('(min-width: 62em)');
  return (
    <Grid
      boxSizing="border-box"
      templateColumns={isLargerThanLg ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'}
      gap={8}
      maxH="100vh"
      h="100vh"
      w="100vw"
      maxW="100vw"
      overflow="hidden"
    >
      {children}
    </Grid>
  );
};

export const AuthFormItem: React.FC<AuthFormProps> = ({ children, ...rest }) => {
  return (
    <GridItem w="100%" h="100%" {...rest}>
      {children}
    </GridItem>
  );
};
