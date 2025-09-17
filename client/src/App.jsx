// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import LoginPage from './components/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage'; 
import EmployeeListPage from './components/EmployeeListPage';
import EditEmployeePage from './components/EditEmployeePage';
import MainLayout from './components/common/MainLayout';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import ScrollToTop from './components/ScrollToTop'; 
import AutoComplete from './components/features/AutoComplete';
import CollapsibleContent from './components/features/CollapsibleContent';
import CSSProperties from './components/features/CSSProperties';
import IFrames from './components/features/iFrames';
import Images from './components/features/Images';
import Links from './components/features/Links';
import Menu from './components/features/Menu';
import MultipleTabs from './components/features/MultipleTabs';
import Popups from './components/features/Popups';
import Slider from './components/features/Slider';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('userInfo');
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                
                {/* Private Routes with MainLayout - Landing page with Header, Sidebar, Footer */}
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <MainLayout />
                        </PrivateRoute>
                    }
                >
                    {/* Default route shows HomePage content */}
                    <Route index element={<HomePage />} />
                    <Route path="home" element={<HomePage />} />
                    
                    {/* Employees page */}
                    <Route path="employees" element={<EmployeeListPage />} />
                    <Route path="employees/edit/:id" element={<EditEmployeePage />} />
                    
                    {/* Features */}
                    <Route path="features/autocomplete" element={<AutoComplete />} />
                    <Route path="features/collapsible-content" element={<CollapsibleContent />} />
                    <Route path="features/css-properties" element={<CSSProperties />} />
                    <Route path="features/iframes" element={<IFrames />} />
                    <Route path="features/images" element={<Images />} />
                    <Route path="features/links" element={<Links />} />
                    <Route path="features/menu" element={<Menu />} />
                    <Route path="features/multiple-tabs" element={<MultipleTabs />} />
                    <Route path="features/popups" element={<Popups />} />
                    <Route path="features/slider" element={<Slider />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;