import { Grid, GridItem } from '@chakra-ui/react';

interface AuthFormProps {
  children: React.ReactNode;
  [key: string]: any;
}
export const AuthFormWrapper: React.FC<AuthFormProps> = ({ children }) => {
  return (
    <Grid
      boxSizing="border-box"
      templateColumns="repeat(2, 1fr)"
      alignContent="center"
      maxH="100vh"
      h="100vh"
      w="100vw"
      maxW="100vw"
      px={10}
      overflow="hidden"
    >
      {children}
    </Grid>
  );
};

export const AuthFormItem: React.FC<AuthFormProps> = ({ children, ...rest }) => {
  return (
    <GridItem w="100%" h="100%" p={5} {...rest}>
      {children}
    </GridItem>
  );
};
