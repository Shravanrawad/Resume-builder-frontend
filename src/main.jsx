import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signin from './auth/sign-in/signin.jsx';
import Home from './home/home.jsx';
import Dashboard from './dashboard/dashboard.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import Edit from './dashboard/componant/resume/[resumeid]/edit/edit.jsx';
import View from './my-resume/[resumeid]/view/view.jsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/dashboard/resume/:resumeid/edit',
        element: <Edit/>
      }
    ]
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth/sign-in',
    element: <Signin />
  },
  {
    path: '/my-resume/:resumeid/view',
    element: <View/>
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>,
);
