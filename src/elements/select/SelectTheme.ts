import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { selectAnatomy } from '@chakra-ui/anatomy';
import { InputTheme } from '../input/InputTheme';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  selectAnatomy.keys
);

const sizes = {
  xs: {
    field: {
      ...InputTheme.sizes?.xs.field,
    },
  },
  sm: {
    field: {
      ...InputTheme.sizes?.sm.field,
    },
  },
  md: {
    field: {
      ...InputTheme.sizes?.md.field,
    },
  },
};

const variantDefault = definePartsStyle(() => {
  const defaultField = InputTheme.variants?.default().field;
  return {
    field: {
      ...defaultField,
    },
  };
});

export const SelectTheme = defineMultiStyleConfig({
  sizes,
  variants: { default: variantDefault },
});
