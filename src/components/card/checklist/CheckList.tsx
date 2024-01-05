import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { ChecklistItem } from '../../../types/card';
import { v4 as uv4 } from 'uuid';
import { Checkbox, HStack, Text, VStack, useBoolean } from '@chakra-ui/react';
import EditableInputElement from '../../../elements/editable/EditableInputElement';
import Button from '../../../elements/button/Button';
import IconButton from '../../../elements/button/IconButton';
import Trash from '../../../elements/icons/Trash';

interface CheckListProps {
  items: ChecklistItem[];
  onItemsChange: (items: ChecklistItem[]) => void;
  onListDelete: () => void;
}

type FieldType =
  | 'values'
  | `values.${number}`
  | `values.${number}.value`
  | `values.${number}.isChecked`
  | `values.${number}.id`;

const DEFAULT_ITEM = {
  value: 'Натисніть, щоб додати значення',
  isChecked: false,
  id: uv4(),
};

const CheckList: React.FC<CheckListProps> = ({ items, onItemsChange, onListDelete }) => {
  const { register, control, getValues, setValue, reset } = useForm({
    // resolver: yupResolver(ProductVariantPropertySchema),
    mode: 'onChange',
    defaultValues: {
      values: items.length > 0 ? items : [DEFAULT_ITEM],
    },
  });

  const handleValueChange = (field: FieldType, value: string | boolean) => {
    setValue(field, value);

    const { values } = getValues();
    onItemsChange(values);
  };

  const {
    fields: values,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({ control, name: 'values' });
  return (
    <VStack maxW="100%" width="100%" mt={2} gap={4} align="start">
      {values.map((_, index) => {
        return (
          <HStack key={index} width="100%" gap={4} justify="space-between">
            <Controller
              name={`values.${index}.isChecked`}
              control={control}
              render={({ field: { value } }: any) => {
                return (
                  <Checkbox
                    isChecked={value}
                    onChange={() => {
                      handleValueChange(`values.${index}.isChecked`, !value);
                    }}
                    size="lg"
                  />
                );
              }}
            />

            <EditableInputElement
              whiteSpace="pre-wrap"
              wordBreak="break-word"
              value={getValues(`values.${index}.value`)}
              onChange={value => handleValueChange(`values.${index}.value`, value)}
            />

            <IconButton
              size="sm"
              color={'modal.text'}
              aria-label="close-btn"
              variant="secondary"
              onClick={() => {
                removeItem(index);

                if (getValues('values').length === 0) {
                  onListDelete();
                }
              }}
              _hover={{ bgColor: 'rgba(0, 0, 0, 0.1)' }}
              icon={<Trash size="18" />}
            />
          </HStack>
        );
      })}
      <HStack gap={4}>
        <Button
          variant="secondary"
          borderRadius="md"
          size="md"
          w="fit-content"
          backgroundColor={'gray.200'}
          _hover={{ backgroundColor: 'gray.300' }}
          onClick={() => appendItem(DEFAULT_ITEM)}
        >
          <Text fontSize="text-xs" color={'modal.text'}>
            Додати пункт
          </Text>
        </Button>
        <Button
          variant="secondary"
          borderRadius="md"
          size="md"
          w="fit-content"
          backgroundColor={'gray.200'}
          _hover={{ backgroundColor: 'gray.300' }}
          onClick={onListDelete}
        >
          <Text fontSize="text-xs" color={'modal.text'}>
            Видалити перелік
          </Text>
        </Button>
      </HStack>
    </VStack>
  );
};

export default CheckList;
