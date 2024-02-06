import { useContext } from 'react';
import { Box, Text } from '@chakra-ui/react';

import { DropzoneContext } from '.';
import { DropzoneContextProps } from '../../types/file';
import Button from '../../elements/button/Button';

import Attachments from '../../elements/icons/Attachments';
import { useMainColor } from '../../composable/useMainColor';

export const FileUpload = () => {
  const { dropzoneProps } = useContext(DropzoneContext) as DropzoneContextProps;
  const { darkColor } = useMainColor();
  return (
    <Box w="100%">
      <Button
        size="sm"
        variant="secondaryGray"
        minW="fit-content"
        leftIcon={<Attachments size="18" color={darkColor} />}
        justifyContent="start"
        gap={2}
        className="attachments_custom_btn"
      >
        <Text
          overflow="hidden"
          color={darkColor}
          maxW="100%"
          fontSize="text-xs"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          className="attachments_custom_btn"
        >
          Вкладення
        </Text>
      </Button>
      <input {...dropzoneProps.getInputProps()} disabled={false} />
    </Box>
  );
};
