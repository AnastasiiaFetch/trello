import React, { useState } from 'react';
import { useClipboard, chakra, IconButtonProps } from '@chakra-ui/react';
import Check from '../icons/Check';
import Copy from '../icons/Copy';

interface ICopyButton extends IconButtonProps {
  value: string | number | readonly string[] | undefined;
}

const CopyButton: React.FC<ICopyButton> = ({ value, size, ...rest }) => {
  const { onCopy } = useClipboard(value as string);
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setShowCopied(true);

    setTimeout(() => {
      setShowCopied(false);
    }, 1000);
  };

  return (
    <>
      <chakra.div
        onClick={handleCopy}
        cursor="pointer"
        bgColor="white"
        _hover={{ color: 'gray.600' }}
        {...rest}
      >
        {showCopied ? (
          <chakra.div bgColor="green.300" borderRadius="xl" p="0.5">
            <Check size={size ? size : '18'} color="white" />
          </chakra.div>
        ) : (
          <chakra.span>
            <Copy size={size ? size : '20'} />
          </chakra.span>
        )}
      </chakra.div>
    </>
  );
};

export default CopyButton;
