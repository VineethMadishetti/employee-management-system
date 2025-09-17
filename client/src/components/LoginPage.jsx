// client/src/components/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { data } = await axios.post(`${API_URL}/users/login`, {
                email,
                password,
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-bg-elements">
                <div className="bg-element bg-element-1"></div>
                <div className="bg-element bg-element-2"></div>
                <div className="bg-element bg-element-3"></div>
            </div>
            <Container className="d-flex justify-content-center align-items-center vh-100 position-relative">
                <div className="login-container animate-scale-in">
                    <div className="text-center mb-4">
                        <h1 className="login-main-title">
                            <i className="bi bi-shield-check me-3"></i>
                            JALA Academy
                        </h1>
                        <p className="login-subtitle">Employee Management System</p>
                    </div>
                    <Card className="login-card">
                        <Card.Body className="p-4">
                            <div className="text-center mb-3">
                                <h3 className="login-form-title">Welcome Human !</h3>
                                <p className="text-muted">Sign in to your account</p>
                            </div>
                            {error && (
                                <Alert variant="danger" className="animate-slide-down">
                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                    {error}
                                </Alert>
                            )}
                            <Form onSubmit={submitHandler} className="mt-3">
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label className="form-label-custom">
                                        <i className="bi bi-envelope me-2"></i>Email Address
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control-custom"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label className="form-label-custom">
                                        <i className="bi bi-lock me-2"></i>Password
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control-custom"
                                        required
                                    />
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 login-btn mb-3"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Signing In...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-box-arrow-in-right me-2"></i>
                                            Sign In
                                        </>
                                    )}
                                </Button>
                            </Form>
                            <div className="login-links text-center">
                                <Link to="/forgot-password" className="login-link me-3">
                                    <i className="bi bi-question-circle me-1"></i>
                                    Forgot Password?
                                </Link>
                                <Link to="/register" className="login-link me-3">
                                    <i className="bi bi-person-plus me-1"></i>
                                    Create Account
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

export default LoginPage;