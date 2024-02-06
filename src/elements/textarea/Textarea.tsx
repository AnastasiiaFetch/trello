import {
  forwardRef,
  useMultiStyleConfig,
  useStyleConfig,
  FormErrorMessage as ChakraFormErrorMessage,
  FormHelperText as ChakraFormHelpText,
  Textarea as ChakraTextarea,
  FormControl as ChakraFormControl,
  FormLabel as ChakraFormLabel,
  InputGroup as ChakraInputGroup,
  TextareaProps as ChakraTextareaProps,
} from '@chakra-ui/react';
import ResizeTextarea from 'react-textarea-autosize';
import React from 'react';

export interface TextareaProps extends ChakraTextareaProps {
  size?: 'sm' | 'md';
  label?: string | null;
  placeholder?: string | '';
  isDisabled?: boolean;
  isError?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  helpText?: string;
  minRows?: number;
  ref?: React.MutableRefObject<HTMLTextAreaElement | null>;
  containerProps?: any;
}

export const Textarea: React.FC<TextareaProps> = forwardRef((props, ref) => {
  const {
    size = 'sm',
    placeholder = '',
    label,
    helpText,
    isError,
    minRows = 5,
    containerProps = {},
    ...rest
  } = props;
  const textareaLabelStyles = useMultiStyleConfig('FormLabel');
  const textareaHelpTextStyles = useStyleConfig('FormHelperText');
  const textareaErrorMessageStyles = useStyleConfig('FormErrorMessage');

  return (
    <ChakraFormControl isInvalid={isError} {...containerProps}>
      {label && (
        <ChakraFormLabel size={size} __css={textareaLabelStyles} userSelect="none">
          {label}
        </ChakraFormLabel>
      )}
      <ChakraInputGroup variant="default">
        <ChakraTextarea
          ref={ref}
          minH="unset"
          overflow="hidden"
          bg="main.light"
          variant="default"
          w="100%"
          minRows={minRows}
          px="2.5"
          resize="none"
          overflowY="auto"
          boxShadow={'xs'}
          pb="10"
          border={'1px solid'}
          borderColor="var(--chakra-colors-gray-300)"
          as={ResizeTextarea}
          placeholder={placeholder}
          {...rest}
        />
      </ChakraInputGroup>
      {!isError && helpText ? (
        <ChakraFormHelpText __css={textareaHelpTextStyles} mt="2" textAlign="left">
          {helpText}
        </ChakraFormHelpText>
      ) : (
        <ChakraFormErrorMessage mt="2" __css={textareaErrorMessageStyles} textAlign="left">
          {helpText}
        </ChakraFormErrorMessage>
      )}
    </ChakraFormControl>
  );
});
