import { Text, HStack, VStack, chakra, Box } from '@chakra-ui/react';
import useUserStore from '../../store/userState';
import Avatar from '../../elements/avatar/Avatar';
import React, { useState } from 'react';
import ChevronRight from '../../elements/icons/ChevronRight';

interface SideNavProps {
  items: { id: string; icon: React.ReactElement; title: string }[] | null;
  selected: string | null;
  onSelect: (id: string) => void;
}

const SideNav: React.FC<SideNavProps> = ({
  items = null,
  onSelect = () => {},
  selected = null,
}) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const { currentUser } = useUserStore();
  return (
    <VStack maxH="100%" w="100%">
      <HStack gap={2}>
        <Avatar size="md" name={`${currentUser?.firstName} ${currentUser?.lastName}` || ''} />
        <Text
          fontWeight="bold"
          fontSize="text-lg"
        >{`${currentUser?.firstName} ${currentUser?.lastName}`}</Text>
      </HStack>
      <Box my="6" border="1px solid transparent" w="100%" borderTopColor="gray.400" />
      <VStack w="100%" alignItems="flex-start" gap={4}>
        <Text fontWeight="semibold" fontSize="text-md">
          Робочі області
        </Text>
        {items ? (
          items.map(({ id, title, icon }) => (
            <HStack
              w="100%"
              gap={4}
              p={2}
              key={id}
              justifyContent="space-between"
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                onSelect(id);
              }}
              cursor="pointer"
            >
              <HStack gap={2}>
                {icon}
                <Text fontWeight="medium" whiteSpace="nowrap">
                  {title.length > 35 ? title.slice(0, 35) + '...' : title}
                </Text>
              </HStack>
              <chakra.span
                opacity={hovered === id || selected === id ? '1' : '0'}
                transition="all 0.2s ease-in-out"
              >
                <ChevronRight size="25" />
              </chakra.span>
            </HStack>
          ))
        ) : (
          <Text>Список робочих областей поки пустий</Text>
        )}
      </VStack>
    </VStack>
  );
};

export default SideNav;
