import { Box, Flex, Text } from '@chakra-ui/react';
import { CustomSelectItemProps } from '../../types/select';
import SelectItemWrapper from './SelectItemWrapper';

const ExpandedSelectItem: React.FC<CustomSelectItemProps> = ({
  contentTitle,
  content,
  leftIcon,
  ...rest
}) => {
  const Icon = leftIcon ? leftIcon : null;
  return (
    <SelectItemWrapper
      _hover={{
        bgColor: 'gray.100',
      }}
      flexDir="column"
      borderRadius="md"
      alignItems="start"
      {...rest}
    >
      <Flex align="center" gap={2} overflowX="hidden">
        {Icon && <Icon size={20} />}
        <Box w="100%">
          <Text w="100%" whiteSpace="nowrap" fontSize="text-sm" fontWeight="semibold">
            {contentTitle.length > 30 ? `${contentTitle.slice(0, 30)}...` : contentTitle}
          </Text>
        </Box>
      </Flex>

      <Flex>
        <Text fontSize="text-xs" whiteSpace="break-spaces">
          {content}
        </Text>
      </Flex>
    </SelectItemWrapper>
  );
};

export default ExpandedSelectItem;
