import { Box, Flex, Text } from '@chakra-ui/react';
import { CustomSelectItemProps } from '../../types/select';
import SelectItemWrapper from './SelectItemWrapper';

const BasicSelectItem: React.FC<CustomSelectItemProps> = ({ leftIcon, contentTitle, ...rest }) => {
  return (
    <SelectItemWrapper
      _hover={{
        bgColor: 'gray.300',
      }}
      flexDir="column"
      borderRadius="md"
      alignItems="start"
      {...rest}
    >
      <Flex flex={1} overflowX="hidden" align="center" gap={2}>
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
