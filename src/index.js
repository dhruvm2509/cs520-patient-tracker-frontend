import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import DoctorHome from './view/DoctorHome';
import DoctorPatientProfile from './view/DoctorPatientProfile';
import DoctorProfile from './view/DoctorProfile';
import DoctorSelectAppointments from './view/DoctorSelectAppointments';
import AddProfile from './view/AddProfile.js';
import { UserProvider } from './model/UserContext.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider><App /></UserProvider>
  },
  {
    path: '/login',
    element: <UserProvider><App /></UserProvider>
  },
  {
    path: '/signup',
    element: <UserProvider><AddProfile /></UserProvider>
  },
  {
    path: '/doctor-home',
    element: <UserProvider><DoctorHome /></UserProvider>
  },
  {
    path: '/doctor-patient-profile',
    element: <UserProvider><DoctorPatientProfile /></UserProvider>
  },
  {
    path: '/doctor-profile',
    element: <UserProvider><DoctorProfile /></UserProvider>
  },
  {
    path: '/doctor-select-appointments',
    element: <UserProvider><DoctorSelectAppointments /></UserProvider>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
