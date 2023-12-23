import { Box } from '@chakra-ui/react';
import ListContentWrapper from './ListContentWrapper';
import ListWrapper from './ListWrapper';
import { BoardItem } from '../../types/board';
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface ListProps {
  item: BoardItem;
}
const List: React.FC<ListProps> = ({ item }) => {
  console.table(item.cards);
  return (
    <Box
      pb={0}
      pt={2}
      px={2}
      alignSelf="flex-start"
      flexShrink={0}
      height="100%"
      whiteSpace="nowrap"
    >
      <ListWrapper>
        <>header</>
        <ListContentWrapper>
          <Droppable droppableId={item.id} key={item.id}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  // background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                  padding: 4,
                  width: 250,
                  minHeight: 50,
                }}
              >
                {item.cards &&
                  item?.cards.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: 'none',
                            padding: 16,
                            margin: '0 0 8px 0',
                            minHeight: '50px',
                            backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                            color: 'white',
                            ...provided.draggableProps.style,
                          }}
                        >
                          {item.title}
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ListContentWrapper>
        <>footer</>
      </ListWrapper>
    </Box>
  );
};

export default List;
