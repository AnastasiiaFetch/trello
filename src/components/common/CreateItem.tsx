import { useEffect, useRef, useState } from 'react';
import { Textarea } from '../../elements/textarea/Textarea';
import Button from '../../elements/button/Button';
import { HStack, Text, VStack } from '@chakra-ui/react';
import Plus from '../../elements/icons/Plus';
import { useMainColor } from '../../composable/useMainColor';
import IconButton from '../../elements/button/IconButton';
import X from '../../elements/icons/X';

interface CreateItemProps {
  buttonText: string;
  textareaProps?: any;
  onValueSave: (value: string) => void;
  buttonCustomProps?: any;
}
const CreateItem: React.FC<CreateItemProps> = ({
  buttonText,
  onValueSave,
  textareaProps = {},
  buttonCustomProps = {},
}) => {
  const [isGenerationMode, setIsGenerationMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { darkColor } = useMainColor();

  useEffect(() => {
    if (!isGenerationMode) return;

    textareaRef.current?.focus();
  }, [isGenerationMode]);

  const handleReset = () => {
    setIsGenerationMode(false);
    setValue('');
  };

  const handleAddButtonClick = () => {
    if (!isGenerationMode) {
      setIsGenerationMode(true);
      return;
    }

    if (value.trim().length > 0) {
      onValueSave(value);
    }

    handleReset();
  };

  return (
    <VStack w="100%" align="start">
      {isGenerationMode && (
        <Textarea
          ref={textareaRef}
          placeholder={'Додайте назву...'}
          fontSize={'text-xs'}
          value={value}
          minRows={3}
          mr={1}
          boxShadow={'none'}
          borderColor={'transparent'}
          maxLength={50}
          onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = event.target.value;
            setValue(value);
          }}
          {...textareaProps}
        />
      )}
      <HStack>
        <Button
          variant="secondary"
          borderRadius="md"
          size="md"
          w="fit-content"
          backgroundColor={isGenerationMode ? 'blue.200' : 'list.background'}
          onClick={handleAddButtonClick}
          _hover={{ bgColor: isGenerationMode ? 'blue.300' : 'rgba(0, 0, 0, 0.1)' }}
          {...buttonCustomProps}
        >
          <HStack gap={2}>
            {!isGenerationMode && <Plus color={darkColor} size="15" />}
            <Text fontSize="text-xs" color={darkColor}>
              {buttonText}
            </Text>
          </HStack>
        </Button>
        {isGenerationMode && (
          <IconButton
            size="md"
            aria-label="close-btn"
            variant="secondary"
            onClick={handleReset}
            _hover={{ bgColor: 'rgba(0, 0, 0, 0.1)' }}
            icon={<X size="18" color={darkColor} />}
          />
        )}
      </HStack>
    </VStack>
  );
};

export default CreateItem;
