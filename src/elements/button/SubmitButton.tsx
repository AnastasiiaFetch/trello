import { Box } from '@chakra-ui/react';
import Button from './Button';

export const SubmitButton = ({
  text,
  size = 'lg',
  ...rest
}: {
  text: string;
  size?: string;
  [key: string]: any;
}) => {
  return (
    <Box w="100%" {...rest}>
      <Button
        variant="primary"
        size={size as 'lg' | 'sm' | 'md'}
        type="submit"
        fullWidth
        height="max-content"
        userSelect="none"
      >
        {text}
      </Button>
    </Box>
  );
};
