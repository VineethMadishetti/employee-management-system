import React, { useState, useEffect, useMemo } from 'react';
import { Container, Button, Alert, Modal, Row, Col, Spinner } from 'react-bootstrap';
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState(null);
    const [showExportModal, setShowExportModal] = useState(false);

    // Filter and pagination state
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    
    const [totalPages, setTotalPages] = useState(1);

    const initialRender = React.useRef(true);

    const fetchEmployees = async () => {
        setLoading(true);
        setError(null);
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;

        if (!token) {
            setError('Not authorized, no token found.');
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.get(
                `${API_URL}/employees?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}&department=${filterDepartment}&status=${filterStatus}&sortBy=${sortField}&sortOrder=${sortDirection}`,
                config
            );
            
            setEmployees(data.employees);
            setTotalPages(data.totalPages);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching employees');
            setLoading(false);
            if (err.response?.status === 401) {
                localStorage.removeItem('userInfo');
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            fetchEmployees();
        }
    }, [currentPage, itemsPerPage, sortField, sortDirection, filterDepartment, filterStatus, searchTerm]);

    const filteredAndSortedEmployees = useMemo(() => {
        const sorted = [...employees].sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [employees, sortField, sortDirection]);

    const paginatedEmployees = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredAndSortedEmployees.slice(start, end);
    }, [filteredAndSortedEmployees, currentPage, itemsPerPage]);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allEmployeeIds = filteredAndSortedEmployees.map(emp => emp._id);
            setSelectedEmployees(allEmployeeIds);
        } else {
            setSelectedEmployees([]);
        }
    };

    const handleSelectEmployee = (e, employeeId) => {
        if (e.target.checked) {
            setSelectedEmployees([...selectedEmployees, employeeId]);
        } else {
            setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId));
        }
    };
    
    const handleDelete = async (employeeId) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const token = userInfo?.token;
    
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
    
                await axios.delete(`${API_URL}/employees/${employeeId}`, config);
                fetchEmployees(); 
            } catch (err) {
                setError(err.response?.data?.message || 'Error deleting employee');
            }
        }
    };
    
    const handleBulkDelete = async () => {
        if (selectedEmployees.length === 0) {
            alert('Please select at least one employee to delete.');
            return;
        }
    
        if (window.confirm(`Are you sure you want to delete ${selectedEmployees.length} selected employees?`)) {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const token = userInfo?.token;
    
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
    
                await axios.post(`${API_URL}/employees/bulk/delete`, { employeeIds: selectedEmployees }, config);
                setSelectedEmployees([]);
                fetchEmployees();
            } catch (err) {
                setError(err.response?.data?.message || 'Error performing bulk delete');
            }
        }
    };

    const handleEdit = (employee) => {
        setEmployeeToEdit(employee);
        setShowEditModal(true);
    };

    // MODIFIED: Restrict sorting to only the 'name' field
    const handleSort = (field) => {
        if (field === 'name') {
            const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
            setSortField(field);
            setSortDirection(newDirection);
            setCurrentPage(1);
        }
    };
    
    const departments = useMemo(() => {
        const allDepartments = employees.map(emp => emp.department);
        return ['all', ...new Set(allDepartments)];
    }, [employees]);

    const handleExport = (format) => {
        const exportData = selectedEmployees.length > 0
            ? employees.filter(emp => selectedEmployees.includes(emp._id))
            : filteredAndSortedEmployees;

        if (format === 'csv') {
            const csvData = [
                ['Name', 'Email Address', 'Contact', 'Job Title', 'Department'],
                ...exportData.map(emp => [emp.name, emp.email, emp.phone, emp.jobTitle, emp.department])
            ].map(e => e.join(",")).join("\n");
            
            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', 'employees.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else if (format === 'json') {
            const jsonData = JSON.stringify(exportData, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', 'employees.json');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        setShowExportModal(false);
    };

    return (
        <div className="employee-list-page">
            <Container>
                <Row className="mb-4 align-items-center">
                    <Col>
                        <h1 className="page-title">
                            <i className="bi bi-person-lines-fill me-2"></i>
                            Employee Management
                        </h1>
                    </Col>
                    <Col xs="auto" className="text-end d-flex align-items-center">
                       
                        <Button
                            variant="primary"
                            onClick={() => setShowAddModal(true)}
                            className="add-employee-btn mx-2"
                            title="Add Employee"
                        >
                            <i className="bi bi-person-plus me-1"></i> Add Employee
                        </Button>

                         <Button
                            variant="success"
                            onClick={() => setShowExportModal(true)}
                            className="me-2 export-btn"
                            title="Export Data"
                        >
                            <i className="bi bi-download me-1"></i> Export
                        </Button>
                    </Col>
                </Row>
                
                <EmployeeStats
                    employees={employees}
                    filteredCount={filteredAndSortedEmployees.length}
                />

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
                />
                
                {loading ? (
                    <div className="loading-container">
                        <Spinner animation="border" role="status" />
                        <p className="loading-text">Loading employees...</p>
                    </div>
                ) : error ? (
                    <Alert variant="danger" className="error-alert">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        {error}
                    </Alert>
                ) : (
                    <>
                        <EmployeeTable
                            loading={loading}
                            error={error}
                            paginatedEmployees={paginatedEmployees}
                            selectedEmployees={selectedEmployees}
                            handleSelectAll={handleSelectAll}
                            handleSelectEmployee={handleSelectEmployee}
                            handleSort={handleSort}
                            sortField={sortField}
                            sortDirection={sortDirection}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />

                        <EmployeePagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            filteredCount={filteredAndSortedEmployees.length}
                            itemsPerPage={itemsPerPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </>
                )}

                {/* Modals */}
                <AddEmployeePage
                    show={showAddModal}
                    handleClose={() => setShowAddModal(false)}
                    onEmployeeAdded={fetchEmployees}
                />

                {showEditModal && (
                    <EditEmployeePage
                        show={showEditModal}
                        handleClose={() => setShowEditModal(false)}
                        onEmployeeUpdated={fetchEmployees}
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
                            <Button variant="outline-success text" onClick={() => handleExport('csv')}>
                                <i className="bi bi-file-earmark-spreadsheet"></i> Export as CSV
                            </Button>
                            <Button variant="outline-primary" onClick={() => handleExport('json')}>
                                <i className="bi bi-file-earmark-code"></i> Export as JSON
                            </Button>
                        </div>
                        <small className="text-muted mt-2 d-block">
                            {selectedEmployees.length > 0
                                ? `Exporting ${selectedEmployees.length} selected employees`
                                : `Exporting all ${filteredAndSortedEmployees.length} filtered employees`
                            }
                        </small>
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    );
};

export default EmployeeListPage;