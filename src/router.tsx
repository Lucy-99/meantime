import { Suspense } from 'react';
import {
  Await,
  createBrowserRouter,
  createRoutesFromElements,
  defer,
  Route,
  useLoaderData,
  useOutlet,
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Upload from './pages/Upload';
import UserProfile from './pages/UserProfile';
import { ProtectedRoute } from './ProtectedRoute';

export const AuthLayout = () => {
  const outlet = useOutlet();
  //@ts-ignore
  const { userPromise } = useLoaderData();
  return (
    <Suspense>
      <Await
        resolve={userPromise}
        children={(user) => <AuthProvider>{outlet}</AuthProvider>}
      />
    </Suspense>
  );
};

const getUserData = () =>
  new Promise((resolve) => {
    const user = localStorage.getItem('token');
    resolve(user);
  });

export const RootRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/profile/:address"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      ></Route>
       <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        }
      ></Route>
    </Route>
  )
);
