// client/src/components/common/Header.jsx
import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userName = userInfo?.name || 'Guest';

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <Navbar expand="lg" className="premium-navbar">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
                    <div className="brand-logo">
                        <i className="bi bi-shield-check"></i>
                    </div>
                    <div className="brand-text">
                        <span className="brand-name">JALA Academy</span>
                        <small className="brand-subtitle">Employee Management</small>
                    </div>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle-custom">
                    <span></span>
                    <span></span>
                    <span></span>
                </Navbar.Toggle>
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <div className="user-info me-3">
                            <div className="user-avatar">
                                <i className="bi bi-person-square"></i>
                            </div>
                            <div className="user-details">
                                <span className="user-name">Vineeth</span>
                                <small className="user-role">Administrator</small>
                            </div>
                        </div>

                        <div className="user-info me-3">
                            <div className="user-avatar">
                                <i className="bi bi-person-circle"></i>
                            </div>
                            <div className="user-details">
                                <span className="user-name">{userName}</span>
                                <small className="user-role">User</small>
                            </div>
                        </div>
                        
                        <div className="navbar-actions">
                            <Button 
                                variant="outline-primary" 
                                onClick={handleLogout}
                                className="logout-btn"
                            >
                                <i className="bi bi-box-arrow-right me-2"></i>
                                Logout
                            </Button>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    );
};

export default Header;