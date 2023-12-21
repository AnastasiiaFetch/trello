import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import { useMainColor } from '../../composable/useMainColor';
import { Helmet } from 'react-helmet-async';
import SideNav from '../../components/main/SideNav';
import useWorkspacesStore from '../../store/workspacesState';
import { useMemo, useState } from 'react';
import Avatar from '../../elements/avatar/Avatar';
import SideNavItemWrapper from '../../components/main/SideNavItemWrapper';
import SideNavItem from '../../components/main/SideNavItem';

const MainPage = () => {
  const { darkColor } = useMainColor();
  const { workspaces } = useWorkspacesStore();

  const menuItems = useMemo(() => {
    return workspaces
      ? workspaces?.map(workspace => {
          return {
            id: workspace.id,
            title: workspace.name,
            icon: <Avatar size="md" name={workspace.name || ''} borderRadius="md" />,
          };
        })
      : null;
  }, [workspaces]);

  const [selectedItem, setSelectedItem] = useState(menuItems?.[0].id || null);
  return (
    <>
      <Helmet>
        <title>Trello | Головна</title>
      </Helmet>
      <Grid
        gap={4}
        py="4rem"
        px="4rem"
        alignItems="center"
        justifyItems="center"
        templateColumns="1fr 2fr"
        w="100%"
        h="90%"
        maxH="90%"
        color={darkColor}
      >
        <GridItem w="80%" p="1rem" maxW="80%" maxH="100%" overflowY="auto">
          <SideNav items={menuItems} onSelect={setSelectedItem} selected={selectedItem} />
        </GridItem>
        <GridItem w="100%" p="1rem" maxW="100%" maxH="100%" overflowY="auto">
          {menuItems &&
            menuItems.map((item, index) => (
              <SideNavItemWrapper key={`${index}-${item.id}`} selected={selectedItem} id={item.id}>
                <SideNavItem itemId={selectedItem} />
              </SideNavItemWrapper>
            ))}
        </GridItem>
      </Grid>
    </>
  );
};

export default MainPage;
