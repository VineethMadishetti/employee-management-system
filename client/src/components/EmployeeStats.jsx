// client/src/components/EmployeeStats.jsx
import React from 'react';

const EmployeeStats = ({ employees, filteredCount }) => {
    const departmentCount = new Set(employees.map(emp => emp.department)).size;

    return (
        <div className="stats-cards">
            <div className="stat-card">
                <div className="stat-icon">
                    <i className="bi bi-people"></i>
                </div>
                <div className="stat-content">
                    <div className="stat-number">{employees.length}</div>
                    <div className="stat-label">Total Employees</div>
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-icon">
                    <i className="bi bi-funnel"></i>
                </div>
                <div className="stat-content">
                    <div className="stat-number">{filteredCount}</div>
                    <div className="stat-label">Filtered Results</div>
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-icon">
                    <i className="bi bi-building"></i>
                </div>
                <div className="stat-content">
                    <div className="stat-number">{departmentCount}</div>
                    <div className="stat-label">Departments</div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeStats;