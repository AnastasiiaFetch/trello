import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import Avatar from '../../elements/avatar/Avatar';
import { Board } from '../../types/board';

interface BoardMemberModalProps {
  board: Board;
}

export const BoardMemberModal: React.FC<BoardMemberModalProps> = ({ board }) => {
  const { color, user, name } = board;
  return (
    <VStack w={'100%'}>
      <Box
        position={'absolute'}
        top={0}
        height={'3rem'}
        w={'100%'}
        bgColor={color}
        borderTopLeftRadius={'md'}
        borderTopRightRadius={'md'}
      />

      <HStack w={'100%'} justify={'space-between'} gap={4} mt={'3.5rem'}>
        <VStack w={'100%'} align={'start'} maxW={'75%'}>
          <Text fontSize={'text-xs'} fontWeight={'bold'}>
            {`Учасник дошки: "${name}"`}
          </Text>
          <Text
            maxW={'100%'}
            fontSize={'text-xs'}
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >{`Ім'я: ${user?.firstName} ${user?.lastName || ''}`}</Text>
          <Text
            maxW={'100%'}
            fontSize={'text-xs'}
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >{`Пошта: ${user?.email}`}</Text>
        </VStack>

        <Avatar size="md" name={`${user?.firstName} ${user?.lastName || ''}` || ''} />
      </HStack>
    </VStack>
  );
};
