import React, { useState, useEffect } from 'react';
import { Container, Button, Alert, Modal, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EmployeeStats from './EmployeeStats';
import EmployeeFilters from './EmployeeFilters';
import EmployeeTable from './EmployeeTable';
import EmployeePagination from './EmployeePagination';
import AddEmployeePage from './AddEmployeePage';
import EditEmployeePage from './EditEmployeePage';
import '../styles/pages/employee.css';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const EmployeeListPage = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState(null);
    const [showExportModal, setShowExportModal] = useState(false);
    const [userRole, setUserRole] = useState(null);

    // Filter and pagination state
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    // Fetch user role and validate token
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        if (userInfo && userInfo.role && userInfo.token) {
            setUserRole(userInfo.role);
        } else {
            console.error('No valid userInfo or token found in localStorage');
            setError('Please log in to view employees.');
            navigate('/login');
        }
    }, [navigate]);

    const fetchEmployees = async () => {
        setLoading(true);
        setError(null);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const token = userInfo?.token;

            if (!token) {
                console.error('No token found, redirecting to login');
                setLoading(false);
                setError('You must be logged in to view employees.');
                navigate('/login');
                return;
            }

            console.log('Fetching employees with token:', token.substring(0, 10) + '...'); // Debug log
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    page: currentPage,
                    limit: itemsPerPage,
                    search: searchTerm,
                    department: filterDepartment,
                    status: filterStatus,
                    sortBy: sortField,
                    sortOrder: sortDirection,
                },
            };
            
            const { data } = await axios.get(`${API_URL}/employees`, config);
            console.log('API response:', data); // Debug log
            setEmployees(data.employees || []);
            setDepartments(data.departments || []);
            setTotalPages(data.totalPages || 1);
            setTotalCount(data.totalEmployees || 0);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            const errorMessage = err.response?.status === 401 
                ? 'Unauthorized: Please log in again.'
                : err.response?.data?.message || 'Failed to fetch employees. Please try again.';
            setError(errorMessage);
            setEmployees([]);
            console.error('Fetch error:', err.response || err);
            if (err.response?.status === 401) {
                localStorage.removeItem('userInfo'); // Clear invalid token
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        if (userRole) fetchEmployees(); // Only fetch if userRole is set
    }, [currentPage, itemsPerPage, searchTerm, filterDepartment, filterStatus, sortField, sortDirection, userRole]);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
        setCurrentPage(1);
    };

    const handleAddClick = () => setShowAddModal(true);
    const handleCloseAddModal = () => setShowAddModal(false);
    
    const handleEmployeeAdded = () => {
        handleCloseAddModal();
        fetchEmployees();
    };

    const handleEdit = (employee) => {
        setEmployeeToEdit(employee);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEmployeeToEdit(null);
    };

    const handleEmployeeUpdated = () => {
        handleCloseEditModal();
        fetchEmployees();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
                const token = userInfo?.token;

                if (!token) {
                    setError('Please log in to perform this action.');
                    navigate('/login');
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                await axios.delete(`${API_URL}/employees/${id}`, config);
                fetchEmployees();
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete employee.');
            }
        }
    };

    const handleExport = (format) => {
        const employeesToExport = employees;

        if (employeesToExport.length === 0) {
            alert('No data to export.');
            return;
        }

        if (format === 'csv') {
            const header = Object.keys(employeesToExport[0]).join(',');
            const body = employeesToExport.map(row => Object.values(row).join(',')).join('\n');
            const csv = header + '\n' + body;
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', url);
            a.setAttribute('download', 'employees.csv');
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } else if (format === 'json') {
            const json = JSON.stringify(employeesToExport, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', url);
            a.setAttribute('download', 'employees.json');
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }
        setShowExportModal(false);
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setFilterDepartment('all');
        setFilterStatus('all');
        setSortField('name');
        setSortDirection('asc');
        setCurrentPage(1);
    };

    return (
        <div className="employee-page-container">
            <Container fluid className="px-md-5">
                <Row className="mb-4 align-items-center">
                    <Col>
                        <h2 className="page-title">Employee Dashboard</h2>
                    </Col>
                    <Col xs="auto" className="text-end">
                        {userRole === 'admin' && (
                            <Button variant="primary" onClick={handleAddClick} className="add-employee-btn">
                                <i className="bi bi-person-plus me-2"></i>
                                Add Employee
                            </Button>
                        )}
                        <Button variant="outline-primary" onClick={() => setShowExportModal(true)} className="export-btn ms-2">
                            <i className="bi bi-download me-2"></i>
                            Export
                        </Button>
                    </Col>
                </Row>

                {error && (
                    <Alert variant="danger" className="mb-3">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        {error}
                    </Alert>
                )}

                <EmployeeStats employees={employees} filteredCount={totalCount} />
                <EmployeeFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterDepartment={filterDepartment}
                    setFilterDepartment={setFilterDepartment}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    departments={departments}
                    handleClearFilters={handleClearFilters}
                />

                <EmployeeTable
                    employees={employees}
                    loading={loading}
                    error={error}
                    handleSort={handleSort}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    userRole={userRole}
                />

                <EmployeePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    filteredCount={totalCount}
                    itemsPerPage={itemsPerPage}
                    setCurrentPage={setCurrentPage}
                />

                <AddEmployeePage
                    show={showAddModal}
                    handleClose={handleCloseAddModal}
                    onEmployeeAdded={handleEmployeeAdded}
                />
                
                {showEditModal && (
                    <EditEmployeePage
                        show={showEditModal}
                        handleClose={handleCloseEditModal}
                        onEmployeeUpdated={handleEmployeeUpdated}
                        employeeToEdit={employeeToEdit}
                    />
                )}

                <Modal show={showExportModal} onHide={() => setShowExportModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Export Employee Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Choose the export format for your employee data:</p>
                        <div className="d-grid gap-2">
                            <Button variant="outline-success" onClick={() => handleExport('csv')}>
                                <i className="bi bi-file-earmark-spreadsheet"></i> Export as CSV
                            </Button>
                            <Button variant="outline-primary" onClick={() => handleExport('json')}>
                                <i className="bi bi-file-earmark-code"></i> Export as JSON
                            </Button>
                        </div>
                        <small className="text-muted mt-2 d-block">
                            {employees.length > 0
                                ? `Exporting ${employees.length} employees`
                                : `No data to export`
                            }
                        </small>
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    );
};

export default EmployeeListPage;