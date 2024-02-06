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
const Page400 = loadable(() => import('./pages/error/Page400'));
const Page404 = loadable(() => import('./pages/error/Page404'));
const Page500 = loadable(() => import('./pages/error/Page500'));

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route element={useProtectedRoute(<RootLayout />)}>
          <Route path="/auth/main" element={<MainPage />} />
          <Route path="/auth/main/:workspaceId" element={<MainPage />} />

          <Route element={<WorkSpaceLayout />}>
            <Route path="/w/:workspaceId" element={<UserWorkspacePage />} />
            <Route path="/:workspaceId/b/:boardId" element={<UserBoardPage />} />
            <Route path="/:workspaceId/b/:boardId/:cardId" element={<UserBoardPage />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/sign-in" />} />
        <Route path="/400" element={<Page400 />} />
        <Route path="/500" element={<Page500 />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
