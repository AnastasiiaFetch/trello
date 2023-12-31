import { Box, HStack, chakra, Text, useDisclosure } from '@chakra-ui/react';
import ListContentWrapper from './ListContentWrapper';
import ListWrapper from './ListWrapper';
import { BoardItem } from '../../types/board';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useMainColor } from '../../composable/useMainColor';
import HorizontalDots from '../../elements/icons/HorizontalDots';
import IconButton from '../../elements/button/IconButton';
import Edit01 from '../../elements/icons/Edit01';
import EditableInputElement from '../../elements/editable/EditableInputElement';
import CreateItem from '../common/CreateItem';
import CardModal from '../card/CardModal';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCard } from '../../api';
import { Card } from '../../types/card';
import ToolTip from '../../elements/tooltip';
import InfoPopover from '../../elements/popover/InfoPopover';
import EyeOpen from '../../elements/icons/EyeOpen';

interface ListProps {
  item: BoardItem;
}
const List: React.FC<ListProps> = ({ item }) => {
  const { darkColor } = useMainColor();
  const cardModal = useDisclosure();

  const { workspaceId, boardId, cardId } = useParams();
  const navigate = useNavigate();

  const { data: card = null, isLoading } = useQuery({
    queryFn: () => getCard(cardId as string),
    queryKey: ['get-card', cardId],
    select: data => data.data,
    enabled: !!cardId,
  });

  const handleCardClick = (cardId: string) => {
    navigate(`/${workspaceId}/b/${boardId}/${cardId}`);
    cardModal.onOpen();
  };

  return (
    <Box alignSelf="flex-start" flexShrink={0} height="100%" whiteSpace="nowrap">
      <ListWrapper>
        <HStack justify="space-between" w="100%" maxW="100%" align="center" p={1}>
          <Box w="85%">
            <EditableInputElement
              fontSize="text-sm"
              fontWeight="semibold"
              value={item.title}
              onChange={value => console.log(value)}
              color={darkColor}
            />
          </Box>

          <IconButton
            size="sm"
            aria-label="info_btn"
            variant="secondary"
            icon={<HorizontalDots size="15" color={darkColor} />}
            onClick={() => {}}
            _hover={{ bgColor: 'rgba(0, 0, 0, 0.1)' }}
          />
        </HStack>
        <ListContentWrapper>
          <Droppable droppableId={item.id} key={item.id}>
            {provided => (
              <chakra.div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  minHeight: '1rem',
                }}
              >
                {item.cards &&
                  item?.cards.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <chakra.div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: 'none',
                            borderRadius: '0.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginBottom: '0.5rem',
                            minHeight: '3rem',
                            backgroundColor: snapshot.isDragging ? 'rgba(0, 0, 0, 0.1)' : '#FFFFFF',
                            ...provided.draggableProps.style,
                            cursor: 'pointer',
                          }}
                          onClick={() => handleCardClick(item.id)}
                        >
                          <chakra.div
                            padding="1rem"
                            w="100%"
                            position="relative"
                            _hover={{ '& > .edit_btn': { display: 'block' } }}
                          >
                            <Text color={darkColor} fontSize="text-xs" fontWeight="semibold">
                              {item.title}
                            </Text>
                            <chakra.div
                              display={'none'}
                              position="absolute"
                              top="3"
                              right="3"
                              className="edit_btn"
                            >
                              <ToolTip label="Натисніть на картку для перегляду">
                                <Box bgColor="gray.200" rounded="full" p={1.5}>
                                  <EyeOpen size="13" color={darkColor} />
                                </Box>
                              </ToolTip>
                            </chakra.div>
                          </chakra.div>
                        </chakra.div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </chakra.div>
            )}
          </Droppable>
        </ListContentWrapper>

        <CreateItem onValueSave={value => console.log(value)} buttonText={'Додати картку'} />
      </ListWrapper>

      {!isLoading && (
        <CardModal isOpen={cardModal.isOpen} onClose={cardModal.onClose} card={card as Card} />
      )}
    </Box>
  );
};

export default List;
