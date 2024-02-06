import { Editable, EditableInput, EditablePreview, Text } from '@chakra-ui/react';

interface EditableElementProps {
  value: string;
  onChange: (value: string) => void;
  handleUpdate: () => void;
  [key: string]: any;
}
const EditableInputElement: React.FC<EditableElementProps> = ({
  value,
  onChange = () => {},
  handleUpdate = () => {},
  ...rest
}) => {
  return (
    <Editable
      value={value}
      onChange={onChange}
      onBlur={handleUpdate}
      display="flex"
      w="100%"
      alignItems="center"
      __css={{
        '& > .custom_editable_input:focus-visible': {
          boxShadow: 'none',
          flex: '1',
          outline: '1px solid',
          outlineColor: 'rgba(0, 0, 0, 0.1)',
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
        },
      }}
    >
      <EditablePreview
        width="100%"
        as={Text}
        overflow="hidden"
        textOverflow="ellipsis"
        cursor={'pointer'}
        whiteSpace="nowrap"
        {...rest}
      />
      <EditableInput style={{ width: '100%' }} className="custom_editable_input" />
    </Editable>
  );
};

export default EditableInputElement;
