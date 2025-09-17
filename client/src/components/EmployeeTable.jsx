import React from 'react';
import { Table, Card, Spinner, Alert, Form, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EmployeeTable = ({
    loading,
    error,
    paginatedEmployees,
    selectedEmployees,
    handleSelectAll,
    handleSelectEmployee,
    handleSort,
    sortField,
    sortDirection,
    handleEdit,
    handleDelete
}) => {
    const getDisplayName = (name) => name || '';

    if (loading) {
        return (
            <div className="loading-container">
                <Spinner animation="border" role="status" />
                <p className="loading-text">Loading employees...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="error-alert">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
            </Alert>
        );
    }

    const renderSortArrow = (field) => {
        if (sortField === field) {
            return sortDirection === 'asc' ? <i className="bi bi-arrow-up"></i> : <i className="bi bi-arrow-down"></i>;
        }
        return null;
    };

    return (
        <div className="table-responsive">
            <Table hover responsive className="employee-table">
                <thead>
                    <tr>
                        <th>
                            <Form.Check
                                type="checkbox"
                                checked={selectedEmployees.length === paginatedEmployees.length && paginatedEmployees.length > 0}
                                onChange={handleSelectAll}
                            />
                        </th>
                        <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                            Name {renderSortArrow('name')}
                        </th>
                        <th>Email </th>
                        <th>Job Title</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedEmployees.length > 0 ? (
                        paginatedEmployees.map(employee => (
                            <tr key={employee._id}>
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                        checked={selectedEmployees.includes(employee._id)}
                                        onChange={(e) => handleSelectEmployee(e, employee._id)}
                                    />
                                </td>
                                <td>{getDisplayName(employee.name)}</td>
                                <td>{employee.email}</td>
                                <td>{employee.jobTitle}</td>
                                <td>{employee.department}</td>
                                <td>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => handleEdit(employee)}
                                        className="me-2"
                                        title="Edit Employee"
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => handleDelete(employee._id)}
                                        title="Delete Employee"
                                    >
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center py-4">
                                <div>
                                    <i className="bi bi-inbox display-4 text-muted"></i>
                                    <p className="mt-2 text-muted">No employees found.</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default EmployeeTable;