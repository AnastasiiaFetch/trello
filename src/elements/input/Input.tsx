import {
  FormControl as ChakraFormControl,
  FormErrorMessage as ChakraFormErrorMessage,
  FormHelperText as ChakraFormHelpText,
  FormLabel as ChakraFormLabel,
  Input as ChakraInput,
  InputGroup as ChakraInputGroup,
  InputLeftElement as ChakraInputLeftElement,
  InputRightElement as ChakraInputRightElement,
  useMultiStyleConfig,
  useStyleConfig,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { InputProps } from '../../types/input';
import InfoPopover from '../common/InfoPopover';

const Input: React.FC<InputProps> = (props, ref) => {
  const {
    size = 'xs',
    type = 'text',
    label = '',
    helpText,
    isError,
    leftElement,
    rightElement,
    containerProps = {},
    placeholder = '',
    infoPopover,
    ...rest
  } = props;

  const inputStyles = useMultiStyleConfig('Input', { size, isError });
  const inputLabelStyles = useStyleConfig('FormLabel');
  const inputHelpTextStyles = useStyleConfig('FormHelperText');
  const inputErrorMessageStyles = useStyleConfig('FormErrorMessage');

  return (
    <ChakraFormControl isInvalid={isError} zIndex={1} {...containerProps}>
      {label && (
        <ChakraFormLabel size={size} userSelect="none" __css={inputLabelStyles}>
          <span>{label}</span>
          {infoPopover && <InfoPopover trigger="hover">{infoPopover}</InfoPopover>}
        </ChakraFormLabel>
      )}

      <ChakraInputGroup variant="default">
        {leftElement && (
          <ChakraInputLeftElement top="50%" left="3">
            {leftElement}
          </ChakraInputLeftElement>
        )}

        <ChakraInput
          ref={ref}
          bg="base.white"
          size={size}
          type={type}
          whiteSpace="nowrap"
          isInvalid={isError}
          variant="default"
          __css={inputStyles}
          placeholder={placeholder}
          {...rest}
          paddingStart={leftElement ? '11' : undefined}
          paddingEnd={rightElement ? '11' : undefined}
        />
        {rightElement && (
          <ChakraInputRightElement top="50%" right="3">
            {rightElement}
          </ChakraInputRightElement>
        )}
      </ChakraInputGroup>
      {!isError && helpText ? (
        <ChakraFormHelpText __css={inputHelpTextStyles} mt="1.5" textAlign="left">
          {helpText}
        </ChakraFormHelpText>
      ) : (
        <ChakraFormErrorMessage mt="1.5" __css={inputErrorMessageStyles} textAlign="left">
          {helpText}
        </ChakraFormErrorMessage>
      )}
    </ChakraFormControl>
  );
};

export default forwardRef(Input);
