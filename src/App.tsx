import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import WorkSpaceLayout from './layouts/WorkSpaceLayout';
import { Box, Text } from '@chakra-ui/react';
import RootLayout from './layouts/RootLayout';

const App = () => {
  return (
    <BrowserRouter basename="/trello">
      <Routes>
        <Route path="/sign-in" element={<Box>Логін</Box>} />
        <Route path="/sign-up" element={<Box>Реєстрація</Box>} />
        <Route element={<RootLayout />}>
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
              path="/w/:workSpaceId"
              element={
                <Box fontSize="text-lg">
                  <Text color="main.dark">user workspace</Text>
                </Box>
              }
            />
            <Route
              path="/:userId/b/:boardId"
              element={
                <Box fontSize="text-lg">
                  <Text>board</Text>
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

export default App;
