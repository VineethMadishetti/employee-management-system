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
    handleDelete,
    userRole // Add this new prop
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
                        <th className="sortable-header" onClick={() => handleSort('name')}>
                            Name {renderSortArrow('name')}
                        </th>
                        <th className="sortable-header" onClick={() => handleSort('email')}>
                            Email {renderSortArrow('email')}
                        </th>
                        <th className="sortable-header" onClick={() => handleSort('phone')}>
                            Phone {renderSortArrow('phone')}
                        </th>
                        <th className="sortable-header" onClick={() => handleSort('jobTitle')}>
                            Job Title {renderSortArrow('jobTitle')}
                        </th>
                        <th className="sortable-header" onClick={() => handleSort('department')}>
                            Department {renderSortArrow('department')}
                        </th>
                        <th className="sortable-header" onClick={() => handleSort('status')}>
                            Status {renderSortArrow('status')}
                        </th>
                        {userRole === 'admin' && <th className="text-end">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {paginatedEmployees && paginatedEmployees.length > 0 ? (
                        paginatedEmployees.map((employee) => (
                            <tr key={employee._id}>
                                <td className="align-middle">{getDisplayName(employee.name)}</td>
                                <td className="align-middle">{employee.email}</td>
                                <td className="align-middle">{employee.phone}</td>
                                <td className="align-middle">{employee.jobTitle}</td>
                                <td className="align-middle">{employee.department}</td>
                                <td className="align-middle">
                                    <Badge bg={
                                        employee.status === 'Active' ? 'success' :
                                        employee.status === 'On Leave' ? 'warning' :
                                        'danger'
                                    }>
                                        {employee.status}
                                    </Badge>
                                </td>
                                {userRole === 'admin' && (
                                    <td className="align-middle text-end">
                                        <Button
                                            variant="outline-secondary"
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
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={userRole === 'admin' ? 7 : 6} className="text-center py-4">
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