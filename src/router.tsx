import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
import WorkSpaceLayout from './layouts/WorkSpaceLayout';
import RootLayout from './layouts/RootLayout';
import ProtectedRoute from './components/ProtectedRoute';

const useProtectedRoute = (children: React.ReactNode) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

const SignInPage = loadable(() => import('./pages/auth/SignInPage'));
const SignUpPage = loadable(() => import('./pages/auth/SignUpPage'));
const MainPage = loadable(() => import('./pages/main/MainPage'));
const UserBoardPage = loadable(() => import('./pages/board/UserBoardPage'));
const UserWorkspacePage = loadable(() => import('./pages/workspace/UserWorkspacePage'));

const Router = () => {
  return (
    <BrowserRouter basename="/trello">
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route element={useProtectedRoute(<RootLayout />)}>
          <Route path="/auth/main" element={<MainPage />} />

          <Route element={<WorkSpaceLayout />}>
            <Route path="/w/:workspaceId" element={<UserWorkspacePage />} />
            <Route path="/:workspaceId/b/:boardId" element={<UserBoardPage />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/sign-in" />} />
        <Route path="*" element={<>not found page</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
