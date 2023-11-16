import { BrowserRouter, Route, Routes } from 'react-router-dom';

import WorkSpaceLayout from './layouts/WorkSpaceLayout';
import { Box } from '@chakra-ui/react';

const App = () => {
  return (
    <BrowserRouter basename="/trello">
      <Routes>
        <Route path="/*" element={<Box>оберіть робочу область</Box>} />
        <Route element={<WorkSpaceLayout />}>
          <Route path="/:workSpaceId" element={<Box bgColor="gray.lightGray">!ssss</Box>} />
          <Route
            path="/:workSpaceId/:boardId"
            element={<Box bgColor="gray.lightGray">!ssss</Box>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
