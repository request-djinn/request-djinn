import React from 'react';
import ReactDOM from 'react-dom/client';
import {  createBrowserRouter, RouterProvider } from 'react-router-dom';

import setLocalStorage from './dev/setLS';

import Home from './routes/root'
import ErrorPage from './routes/error-page';
import Requests from './routes/requests';
import Bins from './routes/bins';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/bins',
    element: <Bins />,
    errorElement: <ErrorPage/>
  },
  {
    path: '/requests/:binkey',
    element: <Requests />,
    errorElement: <ErrorPage/>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  // <React.StrictMode>
   <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
