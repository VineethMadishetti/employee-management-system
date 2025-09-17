// client/src/components/common/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="premium-footer">
            <div className="footer-content">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <div className="footer-brand">
                                <div className="brand-logo">
                                    <i className="bi bi-shield-check"></i>
                                </div>
                                <div className="brand-text">
                                    <h6 className="mb-1">JALA Academy</h6>
                                    <small>Employee Management System</small>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} className="text-md-end">
                            <div className="footer-links">
                                <a href="http://jalaacademy.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                                    <i className="bi bi-globe me-1"></i>
                                    JALA Academy
                                </a>
                                <span className="footer-separator">•</span>
                                <span className="footer-copyright">
                                    &copy; {new Date().getFullYear()} All rights reserved
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        </footer>
    );
};

export default Footer;