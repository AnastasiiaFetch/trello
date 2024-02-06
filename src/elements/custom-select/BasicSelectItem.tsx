import { Box, Flex, Text } from '@chakra-ui/react';
import { CustomSelectItemProps } from '../../types/select';
import SelectItemWrapper from './SelectItemWrapper';

const BasicSelectItem: React.FC<CustomSelectItemProps> = ({ leftIcon, contentTitle, ...rest }) => {
  return (
    <SelectItemWrapper
      _hover={{
        bgColor: 'gray.100',
      }}
      flexDir="column"
      borderRadius="md"
      alignItems="start"
      fontSize="text-sm"
      fontWeight="semibold"
      {...rest}
    >
      <Flex flex={1} overflowX="hidden" align="center" gap={3}>
        {leftIcon}
        <Flex flexDir="column">
          <Box w="100%">
            <Text w="100%" whiteSpace="nowrap">
              {contentTitle.length > 25 ? `${contentTitle.slice(0, 25)}...` : contentTitle}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </SelectItemWrapper>
  );
};

export default BasicSelectItem;
