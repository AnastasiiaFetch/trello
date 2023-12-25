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
import { ForwardRefRenderFunction, forwardRef } from 'react';
import { InputProps } from '../../types/input';
import InfoPopover from '../popover/InfoPopover';

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
          <ChakraInputLeftElement top="50%" left="5">
            {leftElement}
          </ChakraInputLeftElement>
        )}

        <ChakraInput
          variant="default"
          bg="base.white"
          whiteSpace="nowrap"
          ref={ref}
          size={size}
          type={type}
          isInvalid={isError}
          __css={inputStyles}
          placeholder={placeholder}
          {...rest}
          paddingStart={leftElement ? '4rem' : undefined}
          paddingEnd={rightElement ? '4rem' : undefined}
        />
        {rightElement && (
          <ChakraInputRightElement top="50%" right="5">
            {rightElement}
          </ChakraInputRightElement>
        )}
      </ChakraInputGroup>
      {!isError && helpText ? (
        <ChakraFormHelpText __css={inputHelpTextStyles} mt="2" textAlign="left">
          {helpText}
        </ChakraFormHelpText>
      ) : (
        <ChakraFormErrorMessage mt="2" __css={inputErrorMessageStyles} textAlign="left">
          {helpText}
        </ChakraFormErrorMessage>
      )}
    </ChakraFormControl>
  );
};

export default forwardRef(Input as ForwardRefRenderFunction<unknown, InputProps>);
