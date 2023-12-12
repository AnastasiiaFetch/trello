import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import WorkSpaceLayout from './layouts/WorkSpaceLayout';
import { Box, Text } from '@chakra-ui/react';
import RootLayout from './layouts/RootLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Input from './elements/input/Input';
import loadable from '@loadable/component';
import List from './components/List/List';

const useProtectedRoute = (children: React.ReactNode) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

const MainPage = loadable(() => import('./pages/main/MainPage'));
const UserBoardPage = loadable(() => import('./pages/board/UserBoardPage'));

const Router = () => {
  return (
    <BrowserRouter basename="/trello">
      <Routes>
        <Route path="/sign-in" element={<Box>Логін</Box>} />
        <Route path="/sign-up" element={<Box>Реєстрація</Box>} />
        <Route element={useProtectedRoute(<RootLayout />)}>
          <Route path="/auth/:userId" element={<MainPage />} />

          <Route element={<WorkSpaceLayout />}>
            <Route
              path="/:userId/w/:workSpaceId"
              element={
                <Box fontSize="text-lg">
                  <Text color="main.dark">user workspace still have main color</Text>
                </Box>
              }
            />
            <Route path="/:userId/b/:boardId" element={<UserBoardPage />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/sign-in" />} />
        <Route path="*" element={<>not found page</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
