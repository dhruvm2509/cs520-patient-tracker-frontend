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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <App />
  },
  {
    path: '/signup',
    element: <AddProfile />
  },
  {
    path: '/doctor-home',
    element: <DoctorHome />
  },
  {
    path: '/doctor-patient-profile',
    element: <DoctorPatientProfile />
  },
  {
    path: '/doctor-profile',
    element: <DoctorProfile />
  },
  {
    path: '/doctor-select-appointments',
    element: <DoctorSelectAppointments />
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
