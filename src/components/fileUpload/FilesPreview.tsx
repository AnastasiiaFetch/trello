import { useContext, useState } from 'react';
import { DropzoneContext } from './FileUploadWrapper';
import { DropzoneContextProps } from '../../types/file';

import { PhotoSlider } from 'react-photo-view';
import { Box, chakra, HStack, Text, VStack } from '@chakra-ui/react';
import ChevronRight from '../../elements/icons/ChevronRight';
import ChevronLeft from '../../elements/icons/ChevronLeft';
import X from '../../elements/icons/X';
import formatBytes from '../../utils/formatBytes';
import Button from '../../elements/button/Button';
import ImageNavigationButton from './ImageNavigationButton';
import VideoFilePreview from './VideoFilePreview';
import FileUploadPreview from './FileUploadPreview';
import { VIDEO_FORMATS } from './constants';

import 'react-photo-view/dist/react-photo-view.css';

const FilesPreview = () => {
  const { files, onFileDelete } = useContext(DropzoneContext) as DropzoneContextProps;

  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const thumbs = files.map((file: any, i) => (
    <HStack key={i} alignItems="center" justifyContent="start" gap={4} w="100%">
      <FileUploadPreview
        file={file}
        onClick={() => {
          setIndex(i);
          setVisible(true);
        }}
      />
      <VStack align="start" maxW="80%" gap={1}>
        <Text
          w="100%"
          fontSize="text-xs"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          overflow="hidden"
          fontWeight="semibold"
          color="gray.600"
        >
          {file.originalName || file.name}
        </Text>
        <HStack align="start" minW="max-content" maxW="80%" gap={2}>
          <Text
            fontSize="text-xs"
            mt="0px !important"
            margin="0"
            fontWeight="medium"
            color="gray.400"
          >
            {formatBytes(file?.bytes)}
          </Text>
          <chakra.span
            border="1px solid transparent"
            borderBottomColor="gray.600"
            as={Button}
            p={0}
            variant="secondary"
            w="fit-content"
            onClick={() => onFileDelete(file)}
          >
            <Text fontSize="text-xs" color="gray.600">
              Видалити
            </Text>
          </chakra.span>
        </HStack>
      </VStack>
    </HStack>
  ));

  return (
    <VStack gap={2} w="100%" align="start">
      <PhotoSlider
        index={index}
        visible={visible}
        maskOpacity={0.8}
        bannerVisible={false}
        images={files.map((file, i) => ({
          key: `${i}`,
          src: file.preview || file.url,
          alt: file.name,
          type: VIDEO_FORMATS.includes(file.name?.split('.').pop()?.toLowerCase() as string)
            ? 'video'
            : 'image',
        }))}
        onClose={() => setVisible(false)}
        onIndexChange={index => setIndex(index)}
        overlayRender={({ onClose, onIndexChange, index, images }) => {
          const currentImage = images[index] as any;

          const navigationButtons = [
            {
              style: { top: '50%', right: '1.5rem' },
              onClick: () => onIndexChange(index + 1),
              icon: <ChevronRight size={35} />,
              displayCondition: index < files.length - 1,
            },
            {
              style: { top: '50%', left: '1.5rem' },
              onClick: () => onIndexChange(index - 1),
              icon: <ChevronLeft size={35} />,
              displayCondition: index > 0,
            },
            {
              style: { top: '1.5rem', right: '1.5rem' },
              onClick: onClose,
              icon: <X size={35} />,
              displayCondition: true,
            },
          ];

          return (
            <Box
              style={{
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '1000',
              }}
            >
              {currentImage.type === 'video' && (
                <VideoFilePreview
                  src={currentImage.src as string}
                  onClose={onClose}
                  controls={true}
                  type={currentImage.alt?.split('.').pop()?.toLowerCase() || 'mp4'}
                  videoStyles={{
                    width: 'fit-content',
                    maxWidth: '80%',
                    height: 'fit-content',
                    maxHeight: '80%',
                  }}
                />
              )}
              {navigationButtons.map((button, buttonIndex) => (
                <ImageNavigationButton key={buttonIndex} {...button} />
              ))}
            </Box>
          );
        }}
      />
      {thumbs}
    </VStack>
  );
};

export default FilesPreview;
