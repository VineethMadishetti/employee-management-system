// client/src/components/common/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Container } from 'react-bootstrap';

const MainLayout = () => {
    return (
        <>
            <Header />
            <div className="main-content">
                <Sidebar />
                <div className="content-area">
                    <Container fluid>
                        <Outlet />
                    </Container>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MainLayout;