import {
  AsyncSelect,
  CreatableSelect as ChakraCreatableSelect,
  Select as ChakraSelect,
  Options,
} from 'chakra-react-select';
import { InputTheme } from '../input/InputTheme';
import {
  useMultiStyleConfig,
  useStyleConfig,
  InputGroup as ChakraInputGroup,
  FormControl as ChakraFormControl,
  FormErrorMessage as ChakraFormErrorMessage,
  FormLabel as ChakraFormLabel,
  FormHelperText,
  chakra,
  HStack,
} from '@chakra-ui/react';
import { forwardRef, useState, ForwardRefRenderFunction, KeyboardEventHandler } from 'react';
import InfoPopover from '../popover/InfoPopover';
import { useMainColor } from '../../composable/useMainColor';

export interface SelectProps {
  size?: 'sm' | 'md';
  label?: string | null;
  placeholder?: string | null;
  onChange?: (value: any) => void;
  value: any;
  isDisabled?: boolean;
  isError?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isAsync?: boolean;
  isCreatable?: boolean;
  isMulti?: boolean;
  helpText?: string;
  infoPopover?: string | React.ReactNode;
  components?: any;
  options?: Options<any>;
  [key: string]: any;
}

const Select: React.FC<SelectProps> = (props: SelectProps, ref) => {
  const {
    value,
    placeholder = '',
    onChange = () => {},
    size = 'sm',
    label = '',
    helpText = '',
    isError,
    isCreatable = false,
    isMulti = false,
    isAsync = false,
    components = {},
    infoPopover,
    ...rest
  } = props;

  const selectStyles = useMultiStyleConfig('Select', { size, isError });
  const selectErrorMessageStyles = useStyleConfig('FormErrorMessage');
  const selectLabelStyles = useMultiStyleConfig('FormLabel');
  const selectHelpTextStyles = useStyleConfig('FormHelperText');

  const SelectComponent = isCreatable
    ? ChakraCreatableSelect
    : isAsync
    ? AsyncSelect
    : ChakraSelect;

  const customComponents = {
    ...components,
  };

  const { darkColor } = useMainColor();

  const sizesStyles = {
    xs: {
      px: '2',
      py: '1',
      fontSize: 'text-sm',
      lineHeight: 'text-sm',
    },
    sm: {
      px: '2',
      py: '1',
      fontSize: 'text-md',
      lineHeight: 'text-md',
    },
    md: {
      px: '2',
      py: '1',
      fontSize: 'text-lg',
      lineHeight: 'text-lg',
    },
  };

  const [inputValue, setInputValue] = useState('');
  const [_, setIsMenuOpen] = useState(false);

  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  const addNewOption = () => {
    if (!inputValue) return;
    const isExistedOption = value.find((option: any) => option.value === inputValue);
    if (!isExistedOption) {
      onChange([...value, { label: inputValue, value: inputValue }]);
      setInputValue('');
    }
  };

  const handleOnKeyPress: KeyboardEventHandler<HTMLDivElement> = event => {
    if (!inputValue || !isCreatable) return;
    switch (event.key) {
      case 'Enter': {
        addNewOption();
        event.preventDefault();
      }
    }
  };

  return (
    <ChakraFormControl isInvalid={isError}>
      {label && (
        <ChakraFormLabel __css={selectLabelStyles} size={size} userSelect="none">
          <HStack alignItems="center">
            <chakra.span>{label}</chakra.span>
            {infoPopover && <InfoPopover trigger="hover">{infoPopover}</InfoPopover>}
          </HStack>
        </ChakraFormLabel>
      )}

      <ChakraInputGroup variant="default" isolation="auto">
        <SelectComponent
          ref={ref}
          onChange={onChange}
          onKeyDown={handleOnKeyPress}
          value={value}
          size={size}
          placeholder={placeholder}
          onMenuOpen={onMenuOpen}
          onMenuClose={onMenuClose}
          isInvalid={isError}
          isMulti={isMulti}
          components={customComponents}
          chakraStyles={{
            input: base => ({
              ...base,
              py: '1',
              paddingLeft: 0,
            }),
            placeholder: base => ({
              ...base,
              color: darkColor,
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              ...sizesStyles[size],
            }),
            menuList: base => ({
              ...base,
              opacity: 1,
              padding: '2',
            }),
            menu: base => ({
              ...base,
              opacity: 1,
              zIndex: 100,
            }),
            control: base => ({
              ...base,
              '> div': {
                paddingTop: '0 !important',
                paddingBottom: '0 !important',
                flexWrap: 'nowrap',
              },
              bg: 'main.light',
              flex: 1,
              width: '100%',
              textAlign: 'left',
              color: 'gray.800',
            }),
            container: base => ({
              ...base,
              padding: 0,
              flex: 1,
            }),
            inputContainer: base => ({
              ...base,
              ...(size === 'sm' && InputTheme.sizes?.sm.field),
              ...(size === 'md' && InputTheme.sizes?.md.field),
              paddingInlineStart: 0,
              paddingLeft: 0,
              textAlign: 'left',
            }),
            singleValue: base => ({
              ...base,
              ...sizesStyles[size],
              marginLeft: 0,
              marginRight: 0,
              paddingLeft: 0,
              paddingRight: 0,
            }),
            multiValueLabel: base => ({
              ...base,
              ...sizesStyles[size],
              px: '2',
              py: '0',
            }),
            multiValue: (base, state) => ({
              ...base,
              ...sizesStyles[size],
              mx: '1',
              bgColor: state.data.bgColor || 'basic',
              color: state.data.color || darkColor,
              py: '0.5',
            }),
            multiValueRemove: base => ({
              ...base,
              pr: '4',
            }),
            dropdownIndicator: base => ({
              ...base,
              ...sizesStyles[size],
              fontSize: '1.8rem',
              color: 'gray.400',
              w: '100%',
              h: '100%',
              cursor: 'pointer',
            }),
            crossIcon: base => ({
              ...base,
              fontSize: '0.8rem',
              color: 'gray.400',
              '&:hover': {
                backgroundColor: 'main.light',
              },
            }),
            option: (base, state) => ({
              ...base,
              zIndex: 100,
              background: state.isFocused ? 'basic' : 'transparent',
              color: darkColor,
              fontWeight: 'normal',
              borderRadius: 'md',
              marginTop: '1',
              ...sizesStyles[size],
              py: '2',
            }),
            noOptionsMessage: base => ({
              ...base,
              ...sizesStyles[size],
            }),
          }}
          {...rest}
        />
      </ChakraInputGroup>
      {helpText && !isError && (
        <FormHelperText __css={selectHelpTextStyles} mt="2">
          {helpText}
        </FormHelperText>
      )}

      {helpText && isError && (
        <ChakraFormErrorMessage mt="2" __css={selectErrorMessageStyles}>
          {helpText}
        </ChakraFormErrorMessage>
      )}
    </ChakraFormControl>
  );
};

export default forwardRef(Select as ForwardRefRenderFunction<unknown, SelectProps>);
