import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../css/app.css';

import LoadingSpinner from './Pages/General/LoadingSpinner';

// Layouts
import DefaultLayout from './Layouts/DefaultLayout';
import HomeStudentLayout from './Layouts/HomeStudentLayout';
import HomeDonorLayout from './Layouts/HomeDonorLayout';

// Lazy-loading
const HomeStudent = lazy(() => import('./Pages/Student/HomeStudent'));
const About = lazy(() => import('./Pages/General/About'));
const HomeDonor = lazy(() => import('./Pages/Provider/HomeDonor'));
const Login = lazy(() => import('./Pages/General/Login'));
const Unauthorized = lazy(() => import('./Pages/General/Unauthorized'));
const ApplicantStatus = lazy(() => import('./Pages/Provider/ApplicantStatus'));
const ViewMore = lazy(() => import('./Pages/Provider/ViewMore'));
const AcceptedStatus = lazy(() => import('./Pages/Provider/AcceptedStatus'));
const DeclinedStatus = lazy(() => import('./Pages/Provider/DeclinedStatus'));

function App() {
  return (
    <Router>
      <Suspense fallback={ <LoadingSpinner /> }>
        <Routes>
          {/* Routes using HomeStudentLayout */}
          <Route element={<HomeStudentLayout />}>
            <Route path="/" element={<HomeStudent />} />
          </Route>
          
          {/* Routes using DefaultLayout */}
          <Route element={<DefaultLayout />}>
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Routes using HomeDonorLayout */}
          <Route element={<HomeDonorLayout />}>
            <Route path="/donor" element={<HomeDonor />} />
            <Route path="/applicant_status" element={<ApplicantStatus />} />
            <Route path="/view_more" element={<ViewMore />} />
            <Route path="/accepted_status" element={<AcceptedStatus />} />
            <Route path="/declined_status" element={<DeclinedStatus />} />
          </Route>

          {/* Unauthorized route */}
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

// Mount to root in blade file
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);