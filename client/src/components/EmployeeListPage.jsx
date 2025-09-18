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

    const departments = useMemo(() => {
        const allDepartments = employees.map(emp => emp.department);
        return [...new Set(allDepartments)].sort();
    }, [employees]);

    // Fetch user role from local storage on component mount
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.role) {
            setUserRole(userInfo.role);
        }
    }, []);

    const fetchEmployees = async () => {
        setLoading(true);
        setError(null);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;

            if (!token) {
                setLoading(false);
                setError('You must be logged in to view employees.');
                navigate('/login');
                return;
            }

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
            setEmployees(data.employees);
            setTotalPages(data.totalPages);
            setTotalCount(data.totalCount);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            const errorMessage = err.response?.data?.message || 'Failed to fetch employees. Please try again.';
            setError(errorMessage);
            console.error(err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [currentPage, itemsPerPage, searchTerm, filterDepartment, filterStatus, sortField, sortDirection]);

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
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const token = userInfo?.token;

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

    // Pagination
    const filteredAndSortedEmployees = useMemo(() => {
        return employees.slice();
    }, [employees]);

    const handleExport = (format) => {
        const employeesToExport = filteredAndSortedEmployees;

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
        }
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
                    employees={filteredAndSortedEmployees}
                    loading={loading}
                    error={error}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    handleSort={setSortField}
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
                            <Button variant="outline-success text" onClick={() => handleExport('csv')}>
                                <i className="bi bi-file-earmark-spreadsheet"></i> Export as CSV
                            </Button>
                            <Button variant="outline-primary" onClick={() => handleExport('json')}>
                                <i className="bi bi-file-earmark-code"></i> Export as JSON
                            </Button>
                        </div>
                        <small className="text-muted mt-2 d-block">
                            {employees.length > 0
                                ? `Exporting all ${employees.length} employees`
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