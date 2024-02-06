import { Input as ChakraInput, FormLabel, Grid, GridItem } from '@chakra-ui/react';
import { useState } from 'react';
import Button from '../../../elements/button/Button';
import HorizontalDots from '../../../elements/icons/HorizontalDots';
import ToolTip from '../../../elements/tooltip';
import { useMainColor } from '../../../composable/useMainColor';
import { boardsColorPalette } from '../colors';

interface ColorBarProps {
  isFullView: boolean;
  setView?: () => void;
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const ColorBar: React.FC<ColorBarProps> = ({
  isFullView = false,
  onColorSelect = () => {},
  selectedColor,
  setView = () => {},
}) => {
  const [colors, setColors] = useState(() => {
    return [
      ...boardsColorPalette.map((color, index) => ({
        id: index,
        color,
        isSelected: color === selectedColor,
      })),
    ];
  });

  const { darkColor } = useMainColor();
  const handleColorSelected = (id: number) => {
    const updatedButtons = colors.map(button => {
      if (button.id === id) {
        return { ...button, isSelected: true };
      } else {
        return { ...button, isSelected: false };
      }
    });
    const selectedColor = colors?.find(color => color.id === id)?.color || colors[0].color;
    onColorSelect(selectedColor);
    setColors(updatedButtons);
  };

  return (
    <>
      {isFullView ? (
        <>
          <Grid gap={2} templateColumns="repeat(5, 1fr)" w="100%">
            {colors.map(({ id, color, isSelected }) => {
              return (
                <GridItem key={id}>
                  <ChakraInput
                    width="100%"
                    height="5rem"
                    type="button"
                    cursor="pointer"
                    outline="2px solid"
                    bgColor={color}
                    outlineColor={isSelected ? 'gray.300' : 'transparent'}
                    _hover={{ outlineColor: isSelected ? 'gray.400' : 'gray.300' }}
                    onClick={() => handleColorSelected(id)}
                  />
                </GridItem>
              );
            })}
          </Grid>
        </>
      ) : (
        <>
          <FormLabel>Оберіть колір дошки</FormLabel>
          <Grid gap={2} templateColumns="repeat(6, 1fr)" w="100%">
            {colors.slice(0, 5).map(({ id, color, isSelected }) => {
              return (
                <GridItem key={id}>
                  <ChakraInput
                    width="100%"
                    type="button"
                    cursor="pointer"
                    outline="2px solid"
                    bgColor={color}
                    outlineColor={isSelected ? 'gray.300' : 'transparent'}
                    _hover={{ outlineColor: isSelected ? 'gray.400' : 'gray.300' }}
                    onClick={() => handleColorSelected(id)}
                  />
                </GridItem>
              );
            })}
            <GridItem>
              <Button
                variant="secondary"
                _hover={{
                  bgColor: 'rgba(0, 0, 0, 0.1)',
                }}
                borderRadius="md"
                size="md"
                w="100%"
                onClick={setView}
              >
                <ToolTip label={'Більше'}>
                  <HorizontalDots color={darkColor} />
                </ToolTip>
              </Button>
            </GridItem>
          </Grid>
        </>
      )}
    </>
  );
};

export default ColorBar;
