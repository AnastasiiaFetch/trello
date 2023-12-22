import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import Star from '../../../elements/icons/Star';
import { useState } from 'react';

export const SideNavBoard: React.FC<{
  title?: string;
  bg?: string | null;
  isSelected?: boolean;
  isDefault?: boolean;
  onClick: () => void;
}> = ({
  title = 'Створити нову дошку',
  bg = 'gray.300',
  isSelected = true,
  onClick = () => {},
  isDefault = false,
}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const handleStarButtonClick = () => {};
  return (
    <Flex
      bg={bg || 'gray.300'}
      w="100%"
      h="6rem"
      p={2}
      onClick={onClick}
      position="relative"
      cursor="pointer"
      _hover={{
        WebkitBoxShadow: '5px 5px 10px 0px rgba(161,161,161,1)',
        MozBoxShadow: '5px 5px 10px 0px rgba(161,161,161,1)',
        boxShadow: '5px 5px 10px 0px rgba(161,161,161,1)',
      }}
    >
      {isDefault ? (
        <Box alignSelf="center" textAlign="center" w="100%">
          <Text fontWeight="bold" fontSize="text-sm">
            {title}
          </Text>
        </Box>
      ) : (
        <>
          <Text fontWeight="bold" fontSize="text-sm">
            {title.length > 30 ? title.slice(0, 30) + '...' : title}
          </Text>
          <Box
            position="absolute"
            right={2}
            bottom={2}
            onClick={e => {
              e.stopPropagation();
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Star size={20} isFilled={isSelected ? !hovered : hovered} />
          </Box>
        </>
      )}
    </Flex>
  );
};

export const SideNavBoardsWrapper = ({ children }: { children: React.ReactNode }) => (
  <Grid templateColumns="repeat(auto-fill, minmax(30%, 1fr))" w="100%" gap={4}>
    {children}
  </Grid>
);
