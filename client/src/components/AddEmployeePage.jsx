import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Form, Button, Alert, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import { isEmail, isMobilePhone } from "validator";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AddEmployeePage = ({ show, handleClose, onEmployeeAdded }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [department, setDepartment] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setJobTitle('');
        setDepartment('');
        setError(null);
        setLoading(false);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;

        if (!token) {
            setError('You must be logged in to add an employee.');
            setLoading(false);
            return navigate('/login');
        }

        if (!isEmail(email)) {
            setLoading(false);
            return setError('Please enter a valid email address.');
        }

        if (phone && !isMobilePhone(phone, 'en-IN')) {
             setLoading(false);
             return setError('Please enter a valid Indian mobile number.');
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.post(
                `${API_URL}/employees`,
                { name, email, phone, jobTitle, department },
                config
            );

            onEmployeeAdded(); // Notify parent component to refresh
            handleClose(); // Close modal on success
            resetForm(); // Reset form for next use

        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Failed to add employee. Please try again.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add New Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={submitHandler}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formJobTitle">
                                <Form.Label>Job Title</Form.Label>
                                <Form.Control type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formDepartment">
                                <Form.Label>Department</Form.Label>
                                <Form.Control type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Employee'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddEmployeePage;