import React from 'react';
import { Card, Button } from 'react-bootstrap';

const EmployeePagination = ({
    currentPage,
    totalPages,
    filteredCount,
    itemsPerPage,
    setCurrentPage
}) => {
    if (totalPages <= 1) return null;

    return (
        <div className="pagination-section">
            <Card className="pagination-card">
                <Card.Body className="pagination-body">
                    <div className="pagination-content">
                        <div className="pagination-info">
                            <i className="bi bi-info-circle me-2"></i>
                            Page {currentPage} of {totalPages} ({filteredCount} total entries)
                        </div>
                        <div className="pagination-controls">
                            <Button
                                variant="outline-primary"
                                size="sm"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className="pagination-btn"
                            >
                                <i className="bi bi-chevron-left"></i> Previous
                            </Button>

                            <div className="page-numbers">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    const pageNum = i + 1;
                                    return (
                                        <Button
                                            key={pageNum}
                                            variant={currentPage === pageNum ? "primary" : "outline-primary"}
                                            size="sm"
                                            onClick={() => setCurrentPage(pageNum)}
                                            className="page-btn"
                                        >
                                            {pageNum}
                                        </Button>
                                    );
                                })}
                            </div>

                            <Button
                                variant="outline-primary"
                                size="sm"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className="pagination-btn"
                            >
                                Next <i className="bi bi-chevron-right"></i>
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default EmployeePagination;