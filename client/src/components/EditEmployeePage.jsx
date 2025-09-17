import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Modal, Form, Button, Alert, Row, Col, Card, Container, Spinner} from 'react-bootstrap';
import axios from 'axios';
import { isEmail, isMobilePhone } from "validator";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const EditEmployeePage = ({ show, handleClose, onEmployeeUpdated, employeeToEdit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [department, setDepartment] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams(); // Get employee ID from the URL if not passed as prop

    // Check if this is a standalone page (has id param) or modal
    const isStandalonePage = !!id;

    // Populate form with existing data
    useEffect(() => {
        if (employeeToEdit) {
            setName(employeeToEdit.name);
            setEmail(employeeToEdit.email);
            setPhone(employeeToEdit.phone);
            setJobTitle(employeeToEdit.jobTitle);
            setDepartment(employeeToEdit.department);
        } else if (id) {
            // Fetch employee data if the component is used on its own page
            const fetchEmployee = async () => {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (!userInfo || !userInfo.token) {
                    navigate('/login');
                    return;
                }
                setLoading(true);
                try {
                    const { data } = await axios.get(`${API_URL}/employees/${id}`, {
                        headers: { Authorization: `Bearer ${userInfo.token}` }
                    });
                    setName(data.name);
                    setEmail(data.email);
                    setPhone(data.phone);
                    setJobTitle(data.jobTitle);
                    setDepartment(data.department);
                } catch (err) {
                    setError(err.response?.data?.message || 'Failed to fetch employee details.');
                } finally {
                    setLoading(false);
                }
            };
            fetchEmployee();
        }
    }, [employeeToEdit, id, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Basic validation
        if (!name || !email || !jobTitle || !department) {
            setError('Please fill in all required fields.');
            setLoading(false);
            return;
        }

        if (!isEmail(email)) {
            setError('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        if (phone && !isMobilePhone(phone, 'any', { strictMode: false })) {
            setError('Please enter a valid phone number.');
            setLoading(false);
            return;
        }
        
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;

        if (!token) {
            setError('You must be logged in to edit an employee.');
            navigate('/login');
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            const employeeId = employeeToEdit?._id || id;
            await axios.put(
                `${API_URL}/employees/${employeeId}`,
                { name, email, phone, jobTitle, department },
                config
            );
            
            if (onEmployeeUpdated) onEmployeeUpdated();
            if (!isStandalonePage) handleClose();
            
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update employee.');
        } finally {
            setLoading(false);
        }
    };

    const modalBody = (
        <>
            {error && <Alert variant="danger">{error}</Alert>}
           <Form onSubmit={submitHandler}>
  <Row>
    <Col md={6}>
      <Form.Group className="mb-3" controlId="editFormName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </Form.Group>
    </Col>
    <Col md={6}>
      <Form.Group className="mb-3" controlId="editFormEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Form.Group>
    </Col>
  </Row>

  <Row>
    <Col md={6}>
      <Form.Group className="mb-3" controlId="editFormPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </Form.Group>
    </Col>
    <Col md={6}>
      <Form.Group className="mb-3" controlId="editFormJobTitle">
        <Form.Label>Job Title</Form.Label>
        <Form.Control type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
      </Form.Group>
    </Col>
  </Row>

  <Row>
    <Col md={6}>
      <Form.Group className="mb-3" controlId="editFormDepartment">
        <Form.Label>Department</Form.Label>
        <Form.Control type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required />
      </Form.Group>
    </Col>
  </Row>

  <Button variant="primary" type="submit" className="w-100" disabled={loading}>
    {loading ? 'Updating...' : 'Update Employee'}
  </Button>
</Form>

        </>
    );

    return isStandalonePage ? (
        <div className="edit-employee-page">
            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card>
                            <Card.Header>
                                <h3 className="text-center">Edit Employee Details</h3>
                            </Card.Header>
                            <Card.Body>
                                {loading ? (
                                    <div className="text-center py-5">
                                        <Spinner animation="border" />
                                    </div>
                                ) : (
                                    modalBody
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <div className="text-center mt-4">
                    <Link to="/employees" className="back-link">
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Employees
                    </Link>
                </div>
            </Container>
        </div>
    ) : (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalBody}</Modal.Body>
        </Modal>
    );
};

export default EditEmployeePage;