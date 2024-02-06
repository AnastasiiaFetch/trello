import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';

interface CardSectionProps {
  icon: any;
  title: any;
  children: React.ReactNode;
}
const CardSection: React.FC<CardSectionProps> = ({ icon, title, children }) => {
  return (
    <Grid templateColumns="50px 1fr" gap={2} w="100%">
      <GridItem h="fit-content">
        <Flex w="100%" justify="center" align="center" p={2}>
          {icon}
        </Flex>
      </GridItem>
      <GridItem>
        <Box width="100%" mb={1}>
          {title}
        </Box>
        <Box width="100%">{children}</Box>
      </GridItem>
    </Grid>
  );
};

export default CardSection;
