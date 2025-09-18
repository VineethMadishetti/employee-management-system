// client/src/components/EmployeeFilters.jsx
import React from 'react';
import { Card, Form, InputGroup, Row, Col, Button } from 'react-bootstrap';

const EmployeeFilters = ({
    searchTerm,
    setSearchTerm,
    filterDepartment,
    setFilterDepartment,
    filterStatus,
    setFilterStatus,
    itemsPerPage,
    setItemsPerPage,
    departments,
    handleClearFilters
}) => {
    return (
        <div className="search-filter-section">
            <Card className="filter-card mt-3">
                <Card.Header className="filter-header">
                    <h5 className="filter-title d-flex align-items-center">
                        <i className="bi bi-funnel me-2"></i>
                        Search & Filter
                    </h5>
                    <Button variant="link" className="clear-filters-btn" onClick={handleClearFilters}>
                        Clear Filters
                    </Button>
                </Card.Header>
                <Card.Body className="filter-body">
                    <Row className="g-3 align-items-end">
                        {/* Search on left */}
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label className="filter-label">
                                    <i className="bi bi-search me-1"></i>
                                    Search Employees
                                </Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder="Search by name, email, or job title..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="search-input"
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        {/* Filters on right */}
                        <Col md={6} className="d-flex justify-content-end align-items-end flex-wrap gap-3">
                            <Form.Group style={{ minWidth: "120px" }}>
                                <Form.Label className="filter-label">
                                    <i className="bi bi-list-check me-1"></i>
                                    Status
                                </Form.Label>
                                <Form.Select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="Active">Active</option>
                                    <option value="On Leave">On Leave</option>
                                    <option value="Terminated">Terminated</option>
                                </Form.Select>
                            </Form.Group>
                            
                            <Form.Group style={{ minWidth: "160px" }}>
                                <Form.Label className="filter-label">
                                    <i className="bi bi-building me-1"></i>
                                    Department
                                </Form.Label>
                                <Form.Select
                                    value={filterDepartment}
                                    onChange={(e) => setFilterDepartment(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Departments</option>
                                    {departments.map((dept, index) => (
                                        <option key={index} value={dept}>{dept}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group style={{ minWidth: "120px" }}>
                                <Form.Label className="filter-label">
                                    <i className="bi bi-list me-1"></i>
                                    Per Page
                                </Form.Label>
                                <Form.Select
                                    value={itemsPerPage}
                                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                    className="filter-select"
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default EmployeeFilters;