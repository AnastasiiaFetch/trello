import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { chakra, Grid, GridItem, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import Avatar from '../../elements/avatar/Avatar';
import SideNav from '../../components/main/SideNav';
import SideNavItemWrapper from '../../components/main/SideNavItemWrapper';
import SideNavItem from '../../components/main/SideNavItem';
import { useMainColor } from '../../composable/useMainColor';
import useWorkspaces from '../../composable/useWorkspaces';

const commonGridItemProps = {
  w: '100%',
  p: '1rem',
  maxW: '100%',
  maxH: '100%',
};

const MainPage = () => {
  const { darkColor } = useMainColor();
  const { workspaces, workspacesIsLoading } = useWorkspaces();
  const [isLargerThanLg] = useMediaQuery('(min-width: 62em)');
  const [isLargerThanMd] = useMediaQuery('(min-width: 48em)');

  const workspaceMenuItems = useMemo(() => {
    return workspaces && !workspacesIsLoading
      ? workspaces?.map(workspace => {
          return {
            id: workspace.id,
            title: workspace.name,
            icon: <Avatar size="md" name={workspace.name || ''} borderRadius="md" />,
          };
        })
      : [];
  }, [workspaces, workspacesIsLoading]);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    if (!workspaces) return;
    setSelectedItem(workspaceMenuItems?.[0].id);
  }, [workspaces]);

  return (
    <>
      <Helmet>
        <title>Trello | Головна</title>
      </Helmet>

      <Grid
        py="4rem"
        px={isLargerThanLg ? '4rem' : isLargerThanMd ? '2rem' : '0.5rem'}
        alignItems="center"
        justifyItems="center"
        templateColumns={isLargerThanLg ? '1fr 2fr' : '1fr'}
        w="100%"
        h="90%"
        overflowY="auto"
        gap={8}
        maxH="90%"
        color={darkColor}
      >
        <GridItem {...commonGridItemProps}>
          <SideNav items={workspaceMenuItems} onSelect={setSelectedItem} selected={selectedItem} />
        </GridItem>
        <GridItem {...commonGridItemProps}>
          {!!workspaceMenuItems?.length ? (
            workspaceMenuItems?.map((item, index) => (
              <SideNavItemWrapper key={`${index}-${item.id}`} selected={selectedItem} id={item.id}>
                <SideNavItem itemId={selectedItem} />
              </SideNavItemWrapper>
            ))
          ) : (
            <VStack gap={4} w={isLargerThanLg ? '80%' : '100%'}>
              <Text textAlign="center">
                Тут буде список ваших дошок. Щоб створити дошку, спершу треба створити робочу
                область.
              </Text>
              <Text textAlign="center">
                Натисніть на{' '}
                <chakra.span fontWeight="semibold" borderBottom="2px solid" mx={2}>
                  "+"
                </chakra.span>{' '}
                або{' '}
                <chakra.span fontWeight="semibold" borderBottom="2px solid" mx={2}>
                  "Створити"
                </chakra.span>{' '}
                щоб створити першу робочу область.
              </Text>
            </VStack>
          )}
        </GridItem>
      </Grid>
    </>
  );
};

export default MainPage;
