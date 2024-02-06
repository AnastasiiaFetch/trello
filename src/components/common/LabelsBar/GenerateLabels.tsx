import {
  Flex,
  VStack,
  Text,
  Grid,
  GridItem,
  FormLabel,
  Input as ChakraInput,
} from '@chakra-ui/react';
import { labelsColorPalette } from '../colors';
import Input from '../../../elements/input/Input';
import Button from '../../../elements/button/Button';
import { useState } from 'react';
import { Label } from '../../../types/label';
import { useMainColor } from '../../../composable/useMainColor';

const GenerateLabels = ({
  initialLabel = null,
  allowDelete = false,
  onSave = () => {},
  onDelete = () => {},
}: {
  initialLabel: Label | null;
  allowDelete: boolean;
  onSave: (label: Partial<Label>) => void;
  onDelete: (labelId: string) => void;
}) => {
  const [selectedColor, setSelectedColor] = useState(
    initialLabel?.color || labelsColorPalette[0][0]
  );
  const [labelTitle, setLabelTitle] = useState(initialLabel?.title || '');
  const { darkColor } = useMainColor();

  const handleColorSelect = (color: string) => {
    labelsColorPalette.forEach(colors => {
      colors.find(c => {
        if (c === color) {
          setSelectedColor(color);
        }
      });
    });
  };

  const handleLabelSave = () => {
    const newLabel = initialLabel
      ? { id: initialLabel?.id, title: labelTitle, color: selectedColor }
      : { title: labelTitle, color: selectedColor };

    onSave(newLabel);
  };

  const handleLabelDelete = () => {
    initialLabel && onDelete(initialLabel?.id);
  };

  return (
    <VStack w={'100%'} align="start">
      <VStack w={'100%'} py={6} px={4} bgColor={'gray.100'}>
        <Flex
          w={'100%'}
          bgColor={selectedColor}
          borderRadius={'md'}
          align={'center'}
          h={'2rem'}
          maxH={'2rem'}
          justify={'center'}
          p={'2'}
        >
          <Text
            fontSize={'text-xs'}
            overflow={'hidden'}
            whiteSpace={'nowrap'}
            textOverflow={'ellipsis'}
            fontWeight={'semibold'}
          ></Text>
        </Flex>
      </VStack>

      <VStack w={'100%'} p={4} gap={6}>
        <VStack w={'100%'} align="start">
          <Input
            size="xs"
            label={'Назва'}
            value={labelTitle}
            onChange={e => setLabelTitle(e.target.value)}
          />
        </VStack>

        <VStack w={'100%'} align="start">
          <FormLabel>Оберіть колір</FormLabel>
          <Grid w={'100%'} templateColumns={'repeat(5, 1fr)'} gap={2}>
            {labelsColorPalette.map(colors => {
              return colors.map((color, colorIndex) => (
                <GridItem key={colorIndex}>
                  <ChakraInput
                    h="2rem"
                    w="3rem"
                    type="button"
                    cursor="pointer"
                    outline="2px solid"
                    bgColor={color}
                    outlineColor={selectedColor === color ? 'gray.300' : 'transparent'}
                    _hover={{ outlineColor: selectedColor === color ? 'gray.400' : 'gray.300' }}
                    onClick={() => handleColorSelect(color)}
                  />
                </GridItem>
              ));
            })}
          </Grid>
        </VStack>
      </VStack>
      <Flex w={'100%'} gap={4}>
        <Button size="sm" variant="secondaryGray" onClick={handleLabelSave}>
          <Text fontSize="text-sm" color={darkColor}>
            {initialLabel ? 'Зберегти' : 'Створити'}
          </Text>
        </Button>
        {allowDelete && initialLabel && (
          <Button size="sm" onClick={handleLabelDelete} bgColor={'red.300'}>
            <Text fontSize="text-sm" color={darkColor}>
              Видалити
            </Text>
          </Button>
        )}
      </Flex>
    </VStack>
  );
};

export default GenerateLabels;
