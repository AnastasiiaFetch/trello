import { Input as ChakraInput, Grid, GridItem, Text, VStack, chakra } from '@chakra-ui/react';
import ModalBodyWrapper from './ModalBodyWrapper';
import { cardWrapperColorPalette } from '../../common/colors';
import { useMemo } from 'react';
import { TrelloFile } from '../../../types/file';
import { Card } from '../../../types/card';
import { updateCardWrapper } from '../../../api';

interface CreateWrapperModalProps {
  onValueSave: () => void;
  files: TrelloFile[];
  card: Card;
}

const COLORS_LENGTH = cardWrapperColorPalette.length;

type ColorItemType = {
  type: 'color';
  id: number;
  color: string;
  isSelected: boolean;
};

type FileItemType = {
  type: 'file';
  id: any;
  url: any;
  isSelected: boolean;
};

type WrapperItemsType = ColorItemType | FileItemType;

const CreateWrapperModal: React.FC<CreateWrapperModalProps> = ({
  onValueSave,
  files = [],
  card = null,
}) => {
  const selectedItem =
    card?.colorWrapper || (files.find(file => !!file.isWrapper) as string | TrelloFile);

  const wrapperItems = useMemo<WrapperItemsType[]>(() => {
    return [
      ...cardWrapperColorPalette.map(
        (color, index) =>
          ({
            type: 'color',
            id: index,
            color,
            isSelected: color === selectedItem,
          } as ColorItemType)
      ),
      ...files.map(
        file =>
          ({
            type: 'file',
            id: file.id,
            url: file.url,
            isSelected: typeof selectedItem !== 'string' && file.id === selectedItem?.id,
          } as FileItemType)
      ),
    ];
  }, [card]);

  const handleWrapperUpdate = async (item: FileItemType | ColorItemType) => {
    let toSubmitItem;

    if (item.type === 'color') {
      toSubmitItem = { type: 'color', color: item.color };
    }

    if (item.type === 'file') {
      toSubmitItem = { type: 'file', fileId: item.id };
    }

    try {
      await updateCardWrapper(card?.id as string, toSubmitItem);
      onValueSave();
    } catch (e) {
      console.log('card wrapper updating error:', e);
    }
  };

  return (
    <ModalBodyWrapper>
      <Text fontWeight="semibold">Додати обкладинку</Text>
      <VStack align={'start'} w={'100%'}>
        <Text fontWeight="semibold">Колір</Text>
        <Grid templateColumns={'repeat(5, 1fr)'} w={'100%'} gap={2}>
          {wrapperItems.slice(0, COLORS_LENGTH).map(item => {
            return (
              <GridItem key={`${item.id}-${item.type}`}>
                <ChakraInput
                  width="3rem"
                  height="2.5rem"
                  type="button"
                  cursor="pointer"
                  outline="2px solid"
                  bgColor={(item as ColorItemType).color}
                  outlineColor={item.isSelected ? 'gray.300' : 'transparent'}
                  _hover={{ outlineColor: item.isSelected ? 'gray.400' : 'gray.300' }}
                  onClick={() => handleWrapperUpdate(item)}
                />
              </GridItem>
            );
          })}
        </Grid>
      </VStack>
      <VStack align={'start'} w={'100%'}>
        <Text fontWeight="semibold">Вкладення</Text>
        {!wrapperItems.slice(COLORS_LENGTH).length ? (
          <Text fontSize={'text-xs'}>Список вкладених файлів пустий</Text>
        ) : (
          <Grid templateColumns={'repeat(4, 1fr)'} w={'100%'} gap={2}>
            {wrapperItems.slice(COLORS_LENGTH).map(item => {
              return (
                <GridItem key={`${item.id}-${item.type}`}>
                  <chakra.img
                    width="4rem"
                    height="4rem"
                    borderRadius={'md'}
                    cursor="pointer"
                    outline="2px solid"
                    objectFit={'cover'}
                    objectPosition={'top'}
                    src={(item as FileItemType).url}
                    outlineColor={item.isSelected ? 'gray.300' : 'transparent'}
                    _hover={{ outlineColor: item.isSelected ? 'gray.400' : 'gray.300' }}
                    onClick={() => handleWrapperUpdate(item)}
                  />
                </GridItem>
              );
            })}
          </Grid>
        )}
      </VStack>
    </ModalBodyWrapper>
  );
};

export default CreateWrapperModal;
