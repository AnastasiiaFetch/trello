import { Box, Flex, Text } from '@chakra-ui/react';
import Star from '../icons/Star';
import { CustomSelectItemProps } from '../../types/select';
import HorizontalDots from '../icons/HorizontalDots';
import SelectItemWrapper from './SelectItemWrapper';

type BasicSelectItemProps = CustomSelectItemProps & {
  mode?: 'sidebar' | 'nav';
  [key: string]: any;
};

const BasicSelectItem: React.FC<BasicSelectItemProps> = ({
  mode = 'nav',
  contentTitle = '',
  content = '',
  leftIcon = '',
  isSelected = false,
  ...rest
}) => {
  return (
    <SelectItemWrapper
      borderRadius={mode === 'sidebar' ? 'none' : 'md'}
      _hover={{
        bgColor: 'gray.200',
        '& > .star_btn': {
          display: 'flex',
        },
      }}
      {...rest}
    >
      <Flex flex={1} overflowX="hidden" align="center" gap={2}>
        <Flex bg={leftIcon} minW="3rem" maxW="3rem" minH="2rem" flex={1} borderRadius="md" />
        <Flex flexDir="column">
          <Box w="100%">
            <Text w="100%" whiteSpace="nowrap" fontSize="text-sm" fontWeight="semibold">
              {contentTitle.length > 25 ? `${contentTitle.slice(0, 25)}...` : contentTitle}
            </Text>
          </Box>
          {mode === 'nav' && (
            <Box w="100%">
              <Text
                w="100%"
                whiteSpace="nowrap"
                fontSize="text-xs"
                fontWeight="semibold"
                color="gray.500"
              >
                {`Робочий простір: ${content.length > 15 ? content.slice(0, 15) + '...' : content}`}
              </Text>
            </Box>
          )}
        </Flex>
      </Flex>
      {mode === 'sidebar' && (
        <Box
          bgColor="inherit"
          display="none"
          alignItems="center"
          justifyContent="center"
          height="100%"
          className="star_btn"
          position="relative"
          right={0}
          top={0}
        >
          <HorizontalDots size={18} />
        </Box>
      )}
      <Box
        bgColor="inherit"
        display={isSelected ? 'flex' : 'none'}
        alignItems="center"
        justifyContent="center"
        height="100%"
        className="star_btn"
        position="relative"
        right={0}
        top={0}
      >
        <Star size={18} isFilled={isSelected} />
      </Box>
    </SelectItemWrapper>
  );
};

export default BasicSelectItem;
