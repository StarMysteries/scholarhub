import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../css/app.css';

//Layouts
import DefaultLayout from './Layouts/DefaultLayout';
import HomeStudentLayout from './Layouts/HomeStudentLayout';
import HomeDonorLayout from './Layouts/HomeDonorLayout';

//Pages
import HomeStudent from './Pages/HomeStudent';
import About from './Pages/About';
import HomeDonor from './Pages/HomeDonor';
import Login from './Pages/Login';
import Unauthorized from './Pages/Unauthorized';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Routes using HomeLayout */}
          <Route element={<HomeStudentLayout />}>
            <Route path="/" element={<HomeStudent />} />
          </Route>
          
          {/* Layout without sidebar */}
          <Route element={<DefaultLayout />}>
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Routes using HomeDonor layout */}
          <Route element={<HomeDonorLayout />}>
            <Route path="/donor" element={<HomeDonor />} />
          </Route>

          <Route>
            <Route path="/unauthorized" element={ <Unauthorized /> } />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;

// Mount to root in blade file
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);