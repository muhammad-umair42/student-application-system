import { ComponentType } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminApplicationControl from './pages/AdminApplicationControl.tsx';
import ApplicationList from './pages/ApplicationList.tsx';
import ApplicationPage from './pages/ApplicationPage';
import CreateApplication from './pages/CreateApplication.tsx';
import DraftApplication from './pages/draftApplication.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import HandleTokenVerify from './pages/HandleTokenVerify.tsx';
import HomePage from './pages/HomePage';
import LogoutPage from './pages/LogoutPage';
import PendingActions from './pages/PendingActions.tsx';
import SignIn from './pages/SignIn';
import SuccessPage from './pages/SuccessPage';
import VerifyEmail from './pages/VerifyEmail.tsx';
import useUserStore from './store/useUserStore';

function App() {
  const { user } = useUserStore();
  const isAuthenticated = user ? true : false;
  const isAdmin = user?.role === 'admin';
  const isUser = user?.role === 'user';
  const isVerified = user?.isVerified;
  const AuthenticatedRoute = ({
    component: Component,
  }: {
    component: ComponentType;
  }) => {
    return isAuthenticated ? <Component /> : <Navigate to="/signin" replace />;
  };
  const AdminRoute = ({
    component: Component,
  }: {
    component: ComponentType;
  }) => {
    return isVerified ? (
      isAdmin ? (
        <Component />
      ) : (
        <Navigate to="/signin" replace />
      )
    ) : (
      <Navigate to="/verifyemail" replace />
    );
  };
  const UserRoute = ({
    component: Component,
  }: {
    component: ComponentType;
  }) => {
    return isVerified ? (
      isUser ? (
        <Component />
      ) : (
        <Navigate to="/signin" replace />
      )
    ) : (
      <Navigate to="/verifyemail" replace />
    );
  };
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/" element={<AuthenticatedRoute component={HomePage} />} />
        <Route
          path="/create-application"
          element={<UserRoute component={CreateApplication} />}
        />
        <Route
          path="/application/:status"
          element={<UserRoute component={ApplicationList} />}
        />
        <Route
          path="/verifyemail"
          element={<AuthenticatedRoute component={VerifyEmail} />}
        />
        <Route
          path="/applications/application/:id"
          element={<UserRoute component={ApplicationPage} />}
        />
        <Route
          path="/handletokenverify"
          element={<AuthenticatedRoute component={HandleTokenVerify} />}
        />
        <Route
          path="/applications/draft/:id"
          element={<UserRoute component={DraftApplication} />}
        />
        <Route
          path="/admin-application-control/:id"
          element={<AdminRoute component={AdminApplicationControl} />}
        />
        <Route
          path="/pending-actions"
          element={<AdminRoute component={PendingActions} />}
        />
      </Routes>
    </>
  );
}

export default App;
