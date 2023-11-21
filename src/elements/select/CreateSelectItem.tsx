import { Box, Flex, Text } from '@chakra-ui/react';
import TrelloLogo from '../icons/TrelloLogo';

const CreateSelectItem = ({ ...rest }) => {
  return (
    <Flex
      cursor="pointer"
      color="main.dark"
      flexDir="column"
      borderRadius="md"
      py={1}
      px={2}
      gap={2}
      minW="100%"
      maxW="100%"
      _hover={{
        bgColor: 'gray.200',
      }}
      {...rest}
    >
      <Flex align="center" gap={2} overflowX="hidden">
        <TrelloLogo />
        <Box w="100%">
          <Text w="100%" whiteSpace="nowrap" fontSize="text-sm" fontWeight="semibold">
            {'Project Managementu111uuusss55555'.length > 30
              ? `${'Project Managementu111uuusss55555'.slice(0, 30)}...`
              : 'Project Managementu111uuusss55555'}
          </Text>
        </Box>
      </Flex>

      <Flex>
        <Text fontSize="text-sm">dsjsjhksdfsdfjsf</Text>
      </Flex>
    </Flex>
  );
};

export default CreateSelectItem;
