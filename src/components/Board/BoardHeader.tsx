import { Box, Flex, Text } from '@chakra-ui/react';
import { useMainColor } from '../../composable/useMainColor';
import Button from '../../elements/button/Button';
import { Board } from '../../types/board';
import ToolTip from '../../elements/tooltip';
import useUserStore from '../../store/userState';
import Avatar from '../../elements/avatar/Avatar';
import Filter from '../../elements/icons/Filter';
import HorizontalDots from '../../elements/icons/HorizontalDots';
import UserPlus from '../../elements/icons/UserPlus';
import StarButton from '../../elements/button/StarButton';
import EditableInputElement from '../../elements/editable/EditableInputElement';

const BoardHeader: React.FC<Board> = ({ name, isSelected, workspaceId }) => {
  const { currentUser } = useUserStore();

  const { textColor, colorWithNoOpacity, darkColor } = useMainColor();
  return (
    <Box
      height="auto"
      position="relative"
      zIndex={0}
      backgroundColor={colorWithNoOpacity}
      backdropFilter="blur(10px)"
    >
      <Flex
        alignItems="center"
        height="auto"
        position="relative"
        flexWrap="wrap"
        gap={4}
        px={8}
        py={2}
        w="100%"
      >
        <Flex
          position="relative"
          alignItems="center"
          minHeight="2rem"
          flexWrap="nowrap"
          maxW="40%"
          gap={6}
          color={textColor}
        >
          <EditableInputElement
            color={textColor}
            value={name}
            onChange={value => console.log(value)}
            fontWeight="bold"
          />
          <StarButton isSelected={isSelected} height="100%" />
        </Flex>
        <Flex
          position="relative"
          alignItems="center"
          minHeight="2rem"
          flexWrap="nowrap"
          marginLeft="auto"
          gap={4}
        >
          <Button
            variant="secondary"
            borderRadius="md"
            size="md"
            onClick={() => {}}
            leftIcon={<Filter color={textColor} size="18" />}
          >
            <ToolTip label="Фільтрувати картки">
              <Text fontSize="text-sm">Фільтри</Text>
            </ToolTip>
          </Button>

          <Button
            variant="primary"
            borderRadius="md"
            size="md"
            leftIcon={<UserPlus color={darkColor} size="18" />}
          >
            <Text color={darkColor} fontSize="text-sm">
              Поділитися
            </Text>
          </Button>

          <Avatar size="xs" name={`${currentUser?.firstName} ${currentUser?.lastName}` || ''} />

          <Button variant="secondary" borderRadius="md" size="md" w="fit-content">
            <Text>
              <HorizontalDots color={textColor} size="18" />
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default BoardHeader;
