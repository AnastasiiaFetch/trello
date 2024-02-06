import { Checkbox, Flex, FormLabel, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import useBoard from '../../../composable/useBoard';
import { useParams } from 'react-router-dom';
import { Board } from '../../../types/board';
import { Label } from '../../../types/label';
import IconButton from '../../../elements/button/IconButton';
import Edit from '../../../elements/icons/Edit';
import Button from '../../../elements/button/Button';
import { useState } from 'react';
import GenerateLabels from './GenerateLabels';
import ChevronLeft from '../../../elements/icons/ChevronLeft';
import { Controller, useForm } from 'react-hook-form';
import useCard from '../../../composable/useCard';
import { useMainColor } from '../../../composable/useMainColor';
import { updateBoard } from '../../../api';

interface LabelsBarProps {
  initialLabels?: Label[];
  onSelectLabels?: (labels: Label[]) => void;
}

const LabelsBar: React.FC<LabelsBarProps> = ({ initialLabels = [], onSelectLabels = () => {} }) => {
  const { boardId, cardId } = useParams();
  const { refetchCard } = useCard(boardId as string, cardId);
  const { board, boardIsLoading, refetchBoard } = useBoard(boardId as string);
  const [isCreatingMode, setIsCreatingMode] = useState(false);
  const [labelToEdit, setLabelToEdit] = useState<Label | null>(null);
  const { darkColor } = useMainColor();

  const { getValues, setValue, control } = useForm({
    mode: 'onChange',
    values: {
      labels: initialLabels && !!initialLabels?.length ? initialLabels : [],
    },
  });

  const handleCheckboxClick = (label: Label) => {
    const selectedLabels = getValues('labels') || [];

    const labelIndex = selectedLabels.findIndex(selectedLabel => selectedLabel.id === label.id);

    if (labelIndex !== -1) {
      selectedLabels.splice(labelIndex, 1);
    } else {
      selectedLabels.push(label);
    }

    setValue('labels', selectedLabels);
    onSelectLabels(selectedLabels);
  };

  const handleReset = () => {
    setLabelToEdit(null);
    setIsCreatingMode(false);
  };

  const labelsToSubmit = async (newLabels: Partial<Label>[]) => {
    await updateBoard({ id: boardId as string, payload: { labels: newLabels } });
    await refetchBoard();
    cardId && (await refetchCard());
    !boardIsLoading && handleReset();
  };

  const handleLabelUpdate = (label: Partial<Label>) => {
    const isExistingLabel = (board as Board).labels.find(boardLabel => boardLabel.id === label.id);
    let newLabels;

    if (isExistingLabel) {
      newLabels = (board as Board).labels.map(boardLabel =>
        boardLabel.id === label.id ? { ...boardLabel, ...label } : boardLabel
      );
    } else {
      newLabels = [...(board as Board).labels, label];
    }

    labelsToSubmit(newLabels);
  };

  const handleLabelDelete = (labelId: string) => {
    const newLabels = (board as Board).labels.filter(boardLabel => boardLabel.id !== labelId);

    labelsToSubmit(newLabels);
  };

  if (labelToEdit || isCreatingMode)
    return (
      <>
        {cardId && (
          <IconButton
            size="sm"
            top={'5'}
            left={'5'}
            position={'absolute'}
            color={'modal.text'}
            aria-label="close-btn"
            variant="secondary"
            onClick={handleReset}
            _hover={{ bgColor: 'gray.100' }}
            icon={<ChevronLeft size="22" />}
          />
        )}
        <GenerateLabels
          onSave={handleLabelUpdate}
          initialLabel={labelToEdit}
          onDelete={handleLabelDelete}
          allowDelete={!cardId}
        />
      </>
    );

  return (
    <VStack w={'100%'} align="start">
      <FormLabel>Мітки</FormLabel>
      <Grid templateColumns="1fr" gap={4} w={'100%'}>
        {(board as Board) &&
          board.labels.map((label: Label) => {
            return (
              <GridItem display="flex" width={'100%'} gap={3} key={label.id} overflow={'hidden'}>
                {cardId && (
                  <Controller
                    name={'labels'}
                    control={control}
                    render={({ field: { value } }: any) => {
                      return (
                        <Checkbox
                          isChecked={value.some(
                            (selectedLabel: Label) => selectedLabel.id === label.id
                          )}
                          onChange={() => handleCheckboxClick(label)}
                          size="lg"
                        />
                      );
                    }}
                  />
                )}
                <Flex
                  w={cardId ? '15rem' : '100%'}
                  overflow={'hidden'}
                  h={'2.5rem'}
                  bgColor={label.color}
                  borderRadius={'md'}
                  align={'center'}
                  justify={'center'}
                  p={'2'}
                >
                  <Text
                    maxW={'60%'}
                    fontSize={'text-xs'}
                    overflow={'hidden'}
                    whiteSpace={'nowrap'}
                    textOverflow={'ellipsis'}
                    fontWeight={'semibold'}
                  >
                    {label.title}
                  </Text>
                </Flex>

                <IconButton
                  size="sm"
                  color={'modal.text'}
                  aria-label="close-btn"
                  variant="secondary"
                  onClick={() => setLabelToEdit(label)}
                  _hover={{ bgColor: 'gray.100' }}
                  icon={<Edit size="16" />}
                />
              </GridItem>
            );
          })}
        <GridItem mt={2}>
          <Button size="sm" variant="secondaryGray" onClick={() => setIsCreatingMode(true)}>
            <Text fontSize="text-sm" color={darkColor}>
              Створити мітку
            </Text>
          </Button>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default LabelsBar;
