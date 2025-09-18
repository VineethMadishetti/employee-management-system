// client/src/components/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Alert, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            setUser(userInfo);
        }
    }, []);

    return (
        <Container className="my-5 animate-fade-in">
            {/* Hero Section */}
            <header className="text-center mb-5">
                <h1 className="display-4 fw-bold gradient-text mb-3">
                    <i className="bi bi-person-workspace me-3"></i>
                    Employee Management System
                </h1>
                <p className="lead text-secondary">
                    Your all-in-one solution for managing employee data efficiently.
                </p>
            </header>

            {user && (
                <div className="mb-5 animate-slide-down">
                    <Alert variant="success" className="p-4 rounded-xl shadow-sm border-0">
                        <div className="d-flex align-items-center">
                            <i className="bi bi-check-circle-fill me-3 fs-4"></i>
                            <div>
                                <h5 className="mb-1">Welcome, {user.name}!</h5>
                                <p className="mb-0 text-white">
                                    You are logged in as a<span className="fw-bold ms-1 text-info">{user.role}</span>
                                </p>
                            </div>
                        </div>
                    </Alert>
                </div>
            )}

            {/* Main Content Sections */}
            <Row className="g-5 justify-content-center">
                <Col lg={10}>
                    <Card className="p-4 p-md-5">
                        <Card.Body>
                            <h2 className="display-6 fw-bold mb-4 gradient-text">
                                <i className="bi bi-building me-2"></i>
                                About This System
                            </h2>
                            <p className="fs-5 text-secondary">
                                This application is built for managing employee information, from personal details to job roles and department assignments. It provides a clean, user-friendly interface for adding, editing, and deleting employee records.
                            </p>
                            <ul className="list-unstyled mt-4 fs-5 about-list">
                                <li className="mb-2 text-secondary">
                                    <i className="bi bi-check-circle me-2 text-info"></i>
                                    <strong className='text-info'>Centralized Database:</strong> Securely store all employee data.
                                </li>
                                <li className="mb-2 text-white">
                                    <i className="bi bi-check-circle me-2 text-info"></i>
                                    <strong className='text-info'>Admin & Employee Roles:</strong> Granular control with role-based access.
                                </li>
                                <li className="mb-2 text-white">
                                    <i className="bi bi-check-circle me-2 text-info"></i>
                                    <strong className='text-info'>Streamlined Workflow:</strong> Easily manage and search for employees.
                                </li>
                            </ul>
                            <div className="mt-4 text-center text-md-start">
                                <Button as={Link} to="/employees" className="btn-lg px-4 view-employees-btn">
                                    <i className="bi bi-list-check me-2"></i>
                                    View Employees
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            {/* JALA Academy Promotion Section */}
            <div className="text-center mt-5">
                <p className="text-secondary mb-2">
                    This project is a part of the JALA Academy Full Stack Development program.
                </p>
                <a 
                    href="http://jalaacademy.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary"
                >
                    <i className="bi bi-globe me-2"></i>
                    Visit JALA Academy
                </a>
            </div>
        </Container>
    );
};

export default HomePage;