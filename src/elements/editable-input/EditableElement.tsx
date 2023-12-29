import { Editable, EditableInput, EditablePreview, Text } from '@chakra-ui/react';

interface EditableElementProps {
  value: string;
  onChange: (value: string) => void;
  [key: string]: any;
}
const EditableElement: React.FC<EditableElementProps> = ({ value, onChange, ...rest }) => {
  return (
    <Editable
      defaultValue={value}
      onChange={onChange}
      display="flex"
      w="100%"
      alignItems="center"
      __css={{
        '& > .custom_editable_input:focus-visible': {
          boxShadow: 'none',
          outline: '2px solid',
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
        whiteSpace="nowrap"
        {...rest}
      />
      <EditableInput className="custom_editable_input" />
    </Editable>
  );
};

export default EditableElement;
