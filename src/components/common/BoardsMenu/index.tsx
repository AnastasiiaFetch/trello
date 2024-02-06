import { Box, Button, Flex, Grid, Text, useMediaQuery } from '@chakra-ui/react';
import StarButton from '../../../elements/button/StarButton';
import { useMainColor } from '../../../composable/useMainColor';

export const BoardsMenuItem: React.FC<{
  title?: string;
  bg?: string | null;
  isSelected?: boolean;
  boardId?: string;
  isDefault?: boolean;
  onClick: () => void;
}> = ({
  title = 'Створити нову дошку',
  bg = '',
  boardId,
  isSelected = true,
  onClick = () => {},
  isDefault = false,
}) => {
  const { darkColor, sideBarColor } = useMainColor();
  return (
    <Flex
      bg={bg || sideBarColor}
      w="100%"
      h="6rem"
      whiteSpace="break-spaces"
      overflow="auto"
      p={2}
      as={Button}
      onClick={onClick}
      borderRadius="md"
      position="relative"
      cursor="pointer"
      _hover={{
        borderColor: 'transparent',
        WebkitBoxShadow: '5px 5px 10px 0px rgba(161,161,161,1)',
        MozBoxShadow: '5px 5px 10px 0px rgba(161,161,161,1)',
        boxShadow: '5px 5px 10px 0px rgba(161,161,161,1)',
      }}
    >
      {isDefault ? (
        <Box alignSelf="center" textAlign="center" w="100%">
          <Text fontWeight="semibold" fontSize="text-sm" color={darkColor}>
            {title}
          </Text>
        </Box>
      ) : (
        <>
          <Text fontWeight="semibold" fontSize="text-sm" color={darkColor}>
            {title.length > 30 ? title.slice(0, 30) + '...' : title}
          </Text>
          <StarButton
            boardId={boardId as string}
            isSelected={isSelected}
            position="absolute"
            right={2}
            bottom={2}
          />
        </>
      )}
    </Flex>
  );
};

export const BoardsMenuWrapper = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
  [key: string]: any;
}) => {
  const [isLargerThanLg] = useMediaQuery('(min-width: 62em)');
  const [isLargerThanMd] = useMediaQuery('(min-width: 48em)');
  return (
    <Grid
      templateColumns={
        isLargerThanLg
          ? 'repeat(auto-fill, minmax(15vw, 1fr))'
          : isLargerThanMd
          ? 'repeat(3, 1fr)'
          : 'repeat(1, 1fr)'
      }
      w="100%"
      gap={4}
      {...rest}
    >
      {children}
    </Grid>
  );
};
