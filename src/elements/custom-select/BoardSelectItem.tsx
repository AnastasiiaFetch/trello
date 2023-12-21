import { Box, Flex, Text } from '@chakra-ui/react';
import Star from '../icons/Star';
import { CustomSelectItemProps } from '../../types/select';
import HorizontalDots from '../icons/HorizontalDots';
import SelectItemWrapper from './SelectItemWrapper';
import { useState } from 'react';

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
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <SelectItemWrapper
      borderRadius={mode === 'sidebar' ? 'none' : 'md'}
      _hover={{
        bgColor: 'gray.300',
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
          bgColor="inherit"
          display="none"
          alignItems="center"
          justifyContent="center"
          height="100%"
          className="additional_btn"
          position="relative"
          right={0}
          top={0}
          border="1px solid transparent"
          borderRadius="md"
          px="0.5rem"
          _hover={{ borderColor: 'currentColor' }}
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
        className="additional_btn"
        position="relative"
        right={0}
        top={0}
        onClick={e => {
          e.stopPropagation();
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Star size={18} isFilled={isSelected ? !hovered : hovered} />
      </Box>
    </SelectItemWrapper>
  );
};

export default BoardSelectItem;
