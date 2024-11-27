import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../css/app.css';

import LoadingSpinner from './Pages/General/LoadingSpinner';

// Layouts
import DefaultLayout from './Layouts/DefaultLayout';
import HomeStudentLayout from './Layouts/HomeStudentLayout';
import HomeDonorLayout from './Layouts/HomeDonorLayout';
import AdminLayout from './Layouts/AdminLayout';

// Lazy-loading
const About = lazy(() => import('./Pages/General/About'));

const Admin = lazy(() => import('./Pages/Admin/Admin'));
const Form = lazy(() => import('./Pages/Provider/ScholarshipForm'));

const HomeStudent = lazy(() => import('./Pages/Student/HomeStudent'));
const MoreInfo = lazy(() => import('./Pages/Student/MoreInfo'));
const ScholarshipForm = lazy(() => import('./Pages/Student/ScholarshipForm'));

const Login = lazy(() => import('./Pages/General/Login'));
const Unauthorized = lazy(() => import('./Pages/General/Unauthorized'));
const ForgotPassword = lazy(() => import('./Pages/General/ForgotPassword'));
const SignUp = lazy(() => import('./Pages/General/SignUp'));
const SignUpProvider = lazy(() => import('./Pages/General/SignUpProvider'));
const SignUpStudent = lazy(() => import('./Pages/General/SignUpStudent'));

const HomeDonor = lazy(() => import('./Pages/Provider/HomeDonor'));
const ApplicantStatus = lazy(() => import('./Pages/Provider/ApplicantStatus'));
const ViewMore = lazy(() => import('./Pages/Provider/ViewMore'));
const AcceptedStatus = lazy(() => import('./Pages/Provider/AcceptedStatus'));
const DeclinedStatus = lazy(() => import('./Pages/Provider/DeclinedStatus'));

const Admin = lazy(() => import('./Pages/Admin/Admin'));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Routes using HomeStudentLayout */}
          <Route element={<HomeStudentLayout />}>
            <Route path="/" element={<HomeStudent />} />
            <Route path="/more_info" element={<MoreInfo />} />
            <Route path="/scholarship_form" element={<ScholarshipForm />} />
          </Route>

          {/* Routes using DefaultLayout */}
          <Route element={<DefaultLayout />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signup_student" element={<SignUpStudent />} />
            <Route path="/signup_provider" element={<SignUpProvider />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
          </Route>

          {/* Routes using HomeDonorLayout */}
          <Route element={<HomeDonorLayout />}>
            <Route path="/donor" element={<HomeDonor />} />
            <Route path="/applicant_status" element={<ApplicantStatus />} />
            <Route path="/view_more" element={<ViewMore />} />
            <Route path="/accepted_status" element={<AcceptedStatus />} />
            <Route path="/declined_status" element={<DeclinedStatus />} />
          </Route>

          {/* Routes using AdminLayout */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path="/form" element={<Form />} />

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
