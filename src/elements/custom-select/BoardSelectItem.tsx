import { Box, Flex, Text } from '@chakra-ui/react';
import { CustomSelectItemProps } from '../../types/select';
import HorizontalDots from '../icons/HorizontalDots';
import SelectItemWrapper from './SelectItemWrapper';
import StarButton from '../button/StarButton';

type BoardSelectItemProps = CustomSelectItemProps & {
  mode?: 'sidebar' | 'nav';
  [key: string]: any;
};

const BoardSelectItem: React.FC<BoardSelectItemProps> = ({
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
        bgColor: 'rgba(0, 0, 0, 0.1)',
        '& > .additional_btn': {
          display: 'flex',
        },
      }}
      {...rest}
    >
      <Flex flex={1} overflowX="hidden" align="center" gap={2}>
        <Flex bg={leftIcon} minW="3rem" maxW="3rem" minH="2rem" flex={1} borderRadius="md" />
        <Flex flexDir="column">
          <Box w="100%">
            <Text
              w="100%"
              whiteSpace="nowrap"
              fontSize="text-sm"
              fontWeight={mode === 'nav' ? 'semibold' : 'normal'}
            >
              {contentTitle.length > (mode === 'nav' ? 23 : 20)
                ? `${contentTitle.slice(0, mode === 'nav' ? 23 : 20)}...`
                : contentTitle}
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
                {`Робочий простір: ${content.length > 14 ? content.slice(0, 14) + '...' : content}`}
              </Text>
            </Box>
          )}
        </Flex>
      </Flex>
      {mode === 'sidebar' && (
        <Box
          bgColor="transparent"
          display="none"
          alignItems="center"
          justifyContent="center"
          height="100%"
          className="additional_btn"
          position="relative"
          right={0}
          top={0}
          borderRadius="md"
          px="0.5rem"
          _hover={{ bgColor: 'inherit' }}
        >
          <HorizontalDots size={18} />
        </Box>
      )}
      <StarButton
        isSelected={isSelected}
        mode={mode}
        className="additional_btn"
        display={isSelected ? 'flex' : 'none'}
        alignItems="center"
        justifyContent="center"
        position="relative"
        right={0}
        top={0}
        height="100%"
      />
    </SelectItemWrapper>
  );
};

export default BoardSelectItem;
