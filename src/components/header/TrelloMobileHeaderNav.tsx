import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { CustomSelectProps } from '../../types/select';
import Button from '../../elements/button/Button';
import Plus from '../../elements/icons/Plus';
import TrelloHeaderNavItemFactory from './TrelloHeaderNavItemFactory';

interface TrelloMobileHeaderNavProps {
  items: CustomSelectProps[];
}
const TrelloMobileHeaderNav: React.FC<TrelloMobileHeaderNavProps> = ({ items }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        flexShrink={0}
        variant="primary"
        w="fit-content"
        borderRadius="md"
        p={2}
        size="sm"
        aria-label={'header-nav-btn'}
        _hover={{
          bgColor: 'rgba(0, 0, 0, 0.1)',
        }}
        onClick={() => onOpen()}
      >
        <Plus size="15" />
      </Button>
      <Drawer placement={'top'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody p={0}>
            <Accordion allowToggle>
              {items.map(({ title, type, elements }, index) => {
                return (
                  <AccordionItem key={`${title}-${index}`}>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          {title}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} maxW="100%" overflowX="hidden">
                      {elements.length > 0 ? (
                        elements.map((element, elementIndex) => (
                          <Box w={'100%'} onClick={onClose} key={`${title}-item-${elementIndex}`}>
                            <TrelloHeaderNavItemFactory type={type} element={element} />
                          </Box>
                        ))
                      ) : (
                        <Box p={4}>
                          <Text textAlign="center">Цей список поки порожній...</Text>
                        </Box>
                      )}
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TrelloMobileHeaderNav;
