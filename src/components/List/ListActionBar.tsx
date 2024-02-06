import { Box, HStack, Text, VStack, useBoolean } from '@chakra-ui/react';
import IconButton from '../../elements/button/IconButton';
import HorizontalDots from '../../elements/icons/HorizontalDots';
import Button from '../../elements/button/Button';
import { useMainColor } from '../../composable/useMainColor';
import Trash from '../../elements/icons/Trash';
import X from '../../elements/icons/X';

interface ListActionBarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  onSuccess: () => void;
}

export const ListActionBar: React.FC<ListActionBarProps> = ({
  isOpen,
  onClose,
  onToggle,
  onSuccess,
}) => {
  const { darkColor } = useMainColor();
  const [flag, setFlag] = useBoolean();

  return (
    <Box>
      <IconButton
        size="sm"
        aria-label="info_btn"
        variant="secondary"
        icon={<HorizontalDots size="15" color={darkColor} />}
        onClick={onToggle}
        _hover={{ bgColor: 'rgba(0, 0, 0, 0.1)' }}
      />
      {isOpen && (
        <VStack
          position={'absolute'}
          zIndex={'10'}
          top={0}
          left={0}
          w={'100%'}
          p={6}
          bgColor={'modal.background'}
        >
          {!flag && (
            <Button
              position={'absolute'}
              right={2}
              top={2}
              alignSelf={'end'}
              variant="secondary"
              onClick={onToggle}
              w={'fit-content'}
              p={2}
              borderRadius={'md'}
              _hover={{ bgColor: 'rgba(0, 0, 0, 0.1)' }}
            >
              <X size="15" color={darkColor} />
            </Button>
          )}
          {flag ? (
            <VStack gap={4}>
              <Text textAlign={'center'} fontSize={'text-sm'}>
                Ви дійсно хочете видалити цей список ?
              </Text>
              <HStack gap={2}>
                <Button
                  size="sm"
                  variant="secondaryGray"
                  onClick={() => {
                    onClose();
                    setFlag.off();
                  }}
                >
                  <Text fontSize="text-xs" color={darkColor}>
                    Скасувати
                  </Text>
                </Button>
                <Button size="sm" variant="secondaryGray" bgColor={'red.300'} onClick={onSuccess}>
                  <Text fontSize="text-xs" color={darkColor}>
                    Видалити
                  </Text>
                </Button>
              </HStack>
            </VStack>
          ) : (
            <Button
              mt={6}
              variant="secondaryGray"
              color={darkColor}
              size="sm"
              minW="fit-content"
              w="100%"
              leftIcon={<Trash size="18" color={darkColor} />}
              justifyContent="start"
              gap={2}
              onClick={setFlag.on}
            >
              <Text
                overflow="hidden"
                maxW="100%"
                color={darkColor}
                fontSize="text-xs"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {'Видалити список'}
              </Text>
            </Button>
          )}
        </VStack>
      )}
    </Box>
  );
};
