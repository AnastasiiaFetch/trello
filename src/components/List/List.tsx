import { Box, HStack, chakra, Text, useDisclosure, Flex } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { BoardItem } from '../../types/board';
import { Card } from '../../types/card';

import { useMainColor } from '../../composable/useMainColor';
import { ListWrapper, ListActionBar, ListContentWrapper } from '.';
import EditableInputElement from '../../elements/editable/EditableInputElement';
import CreateItem from '../common/CreateItem';
import CardModal from '../card/CardModal';
import ToolTip from '../../elements/tooltip';
import EyeOpen from '../../elements/icons/EyeOpen';
import { useMemo, useState } from 'react';
import useList from '../../composable/useList';
import useCard from '../../composable/useCard';
import Tag from '../../elements/icons/Tag';
import Attachments from '../../elements/icons/Attachments';

interface ListProps {
  item: BoardItem;
}
export const List: React.FC<ListProps> = ({ item }) => {
  const { workspaceId, cardId } = useParams();
  const { boardId, cards, id: listId, title } = item;

  const { updateList, deleteList } = useList(boardId);
  const { createCard, card, cardIsLoading } = useCard(boardId, cardId);

  const { darkColor } = useMainColor();
  const cardModal = useDisclosure();
  const listModal = useDisclosure();

  const navigate = useNavigate();

  const [titleValue, setTitleValue] = useState(title);

  const handleListUpdate = () => {
    if (titleValue.trim().length === 0) {
      setTitleValue(title);
      return;
    }
    updateList({ id: listId, payload: { title: titleValue } });
  };

  const handleCardClick = (cardId: string) => {
    navigate(`/${workspaceId}/b/${boardId}/${cardId}`);
    cardModal.onOpen();
  };

  const sortCardsByOrder = (cardsToSort: Card[] | null) => {
    return cardsToSort ? cardsToSort.sort((a, b) => a.order - b.order) : null;
  };

  const sortedCards = useMemo(() => sortCardsByOrder(cards), [cards]);

  return (
    <Box
      alignSelf="flex-start"
      flexShrink={0}
      height="100%"
      whiteSpace="nowrap"
      position={'relative'}
    >
      <ListWrapper>
        <Box
          display={listModal.isOpen ? 'block' : 'none'}
          position={'absolute'}
          h={'100%'}
          bg={'rgba(0, 0, 0, 0.2)'}
          w={'100%'}
          zIndex={'10'}
          left={0}
          right={0}
          top={0}
        />
        <HStack justify="space-between" color={darkColor} w="100%" maxW="100%" align="center" p={1}>
          <Box w="85%">
            <EditableInputElement
              fontSize="text-sm"
              fontWeight="semibold"
              value={titleValue}
              onChange={value => setTitleValue(value)}
              handleUpdate={handleListUpdate}
              color={darkColor}
            />
          </Box>

          <ListActionBar
            isOpen={listModal.isOpen}
            onClose={listModal.onClose}
            onToggle={listModal.onToggle}
            onSuccess={() => deleteList(listId)}
          />
        </HStack>
        <ListContentWrapper>
          <Droppable droppableId={listId} key={`${listId}-${title}`}>
            {provided => (
              <chakra.div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  minHeight: '1rem',
                }}
              >
                {sortedCards &&
                  sortedCards.map((card, index) => {
                    const wrapper =
                      card.colorWrapper || card.files.find(file => !!file.isWrapper) || null;
                    return (
                      <Draggable key={`${card.id}-${index}`} draggableId={card.id} index={index}>
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
                              backgroundColor: snapshot.isDragging
                                ? 'rgba(0, 0, 0, 0.1)'
                                : '#FFFFFF',
                              ...provided.draggableProps.style,
                              cursor: 'pointer',
                            }}
                            onClick={() => handleCardClick(card.id)}
                          >
                            {wrapper && (
                              <Flex
                                borderTopLeftRadius={'0.5rem'}
                                borderTopRightRadius={'0.5rem'}
                                cursor={'pointer'}
                                w="100%"
                                h="3rem"
                                justify={'center'}
                                bgColor={card?.colorWrapper || 'rgba(0, 0, 0, 0.1)'}
                              >
                                {typeof wrapper !== 'string' && (
                                  <chakra.img
                                    maxW={'80%'}
                                    height="100%"
                                    objectFit={'cover'}
                                    objectPosition={'top'}
                                    src={wrapper.url}
                                  />
                                )}
                              </Flex>
                            )}
                            <chakra.div
                              padding="1rem"
                              w="100%"
                              position="relative"
                              _hover={{ '& > .edit_btn': { display: 'block' } }}
                            >
                              <Text
                                color={darkColor}
                                fontSize="text-xs"
                                fontWeight="semibold"
                                overflow={'hidden'}
                                whiteSpace={'nowrap'}
                                textOverflow={'ellipsis'}
                              >
                                {card.title}
                              </Text>
                              <chakra.div
                                display={'none'}
                                position="absolute"
                                top="30%"
                                right="3"
                                className="edit_btn"
                              >
                                <ToolTip label="Натисніть на картку для перегляду або перетягніть для переміщення до іншого списку">
                                  <Box bgColor="gray.200" rounded="full" p={1.5}>
                                    <EyeOpen size="13" color={darkColor} />
                                  </Box>
                                </ToolTip>
                              </chakra.div>
                            </chakra.div>
                            {(!!card.labels.length || !!card.files.length) && (
                              <HStack px={4} pb={2} pt={0} justify={'end'} w={'100%'} gap={4}>
                                {!!card.labels.length && (
                                  <Flex gap={1} align={'center'}>
                                    <Tag size="10" />
                                    <Text fontSize={'xs'}>{card.labels.length}</Text>
                                  </Flex>
                                )}
                                {!!card.files.length && (
                                  <Flex gap={1} align={'center'}>
                                    <Attachments size="10" />
                                    <Text fontSize={'xs'}>{card.files.length}</Text>
                                  </Flex>
                                )}
                              </HStack>
                            )}
                          </chakra.div>
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </chakra.div>
            )}
          </Droppable>
        </ListContentWrapper>

        <CreateItem
          onValueSave={value => createCard({ title: value, description: null, listId })}
          buttonText={'Додати картку'}
        />
      </ListWrapper>

      {!cardIsLoading && card && (
        <CardModal isOpen={cardModal.isOpen} onClose={cardModal.onClose} card={card as Card} />
      )}
    </Box>
  );
};
