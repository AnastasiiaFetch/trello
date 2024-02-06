import { chakra, Text } from '@chakra-ui/react';
import React from 'react';

export const parseValue = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const elements = doc.body.children;
  return elements;
};

export const createTextPlaceholder = () => (
  <Text
    overflow="hidden"
    maxW="100%"
    textOverflow="ellipsis"
    whiteSpace="nowrap"
    fontSize="text-xs"
    color="gray.400"
  >
    <chakra.span border="1px solid transparent" borderBottomColor="gray.400">
      Натисніть,
    </chakra.span>{' '}
    щоб додати опис
  </Text>
);

const createBlockquote = (element: Element, index: number) => (
  <blockquote
    style={{ textAlign: 'right' }}
    dangerouslySetInnerHTML={{ __html: element.innerHTML }}
    key={index}
  />
);

const createParagraph = (element: Element, index: number) => {
  const alignRegister = {
    'ql-align-right': 'right',
    'ql-align-left': 'left',
    'ql-align-center': 'center',
  };

  const sizeRegister = {
    'ql-size-huge': '1.55rem',
    'ql-size-large': '1.25rem',
    'ql-size-small': '0.8rem',
  };

  const style = {
    fontSize: element?.children
      ? sizeRegister[element?.children[0]?.getAttribute('class') as keyof typeof sizeRegister] ||
        '1rem'
      : '1rem',
    textAlign:
      alignRegister[element?.getAttribute('class') as keyof typeof alignRegister] || 'unset',
  };

  return (
    <p style={style as any} dangerouslySetInnerHTML={{ __html: element.innerHTML }} key={index} />
  );
};

const createList = (element: Element, index: number, type: string) =>
  React.createElement(type, {
    dangerouslySetInnerHTML: { __html: element.innerHTML },
    style: { paddingLeft: '2rem', paddingBottom: '0.5rem' },
    key: index,
  });

const createDefaultElement = (element: Element, index: number) => (
  <p dangerouslySetInnerHTML={{ __html: element.outerHTML }} key={index} />
);

export const parseDescription = (htmlString: string) => {
  const elements = parseValue(htmlString);

  if (elements.length === 0 || elements[0].textContent?.trim().length === 0) {
    return createTextPlaceholder();
  }

  return Array.from(elements).map((element, index) => {
    switch (element.nodeName.toLowerCase()) {
      case 'blockquote':
        return createBlockquote(element, index);
      case 'p':
        return createParagraph(element, index);
      case 'ul':
        return createList(element, index, 'ul');
      case 'ol':
        return createList(element, index, 'ol');
      default:
        return createDefaultElement(element, index);
    }
  });
};
