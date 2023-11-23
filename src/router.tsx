import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import WorkSpaceLayout from './layouts/WorkSpaceLayout';
import { Box, Text } from '@chakra-ui/react';
import RootLayout from './layouts/RootLayout';
import ProtectedRoute from './components/ProtectedRoute';

const useProtectedRoute = (children: React.ReactNode) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

const Router = () => {
  return (
    <BrowserRouter basename="/trello">
      <Routes>
        <Route path="/sign-in" element={<Box>Логін</Box>} />
        <Route path="/sign-up" element={<Box>Реєстрація</Box>} />
        <Route element={useProtectedRoute(<RootLayout />)}>
          <Route
            path="/auth/:userId"
            element={
              <Box fontSize="text-lg">
                <Text>user workspaces and boards</Text>
              </Box>
            }
          />

          <Route element={<WorkSpaceLayout />}>
            <Route
              path="/:userId/w/:workSpaceId"
              element={
                <Box fontSize="text-lg">
                  <Text color="main.dark">user workspace still have main color</Text>
                </Box>
              }
            />
            <Route
              path="/:userId/b/:boardId"
              element={
                <Box fontSize="text-lg">
                  <Text>board has custom color</Text>
                </Box>
              }
            />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/sign-in" />} />
        <Route path="*" element={<>not found page</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
