// server/routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Get all employees with advanced filtering, searching, and pagination
// @route   GET /api/employees
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            department = '',
            status = '',
            sortBy = 'name',
            sortOrder = 'asc'
        } = req.query;

        // Build query object
        let query = {};
        
        // Search functionality
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { jobTitle: { $regex: search, $options: 'i' } }
            ];
        }
        
        // Filter by department
        if (department && department !== 'all') {
            query.department = department;
        }
        
        // Filter by status
        if (status && status !== 'all') {
            query.status = status;
        }

        // Build sort object
        const sortObj = {};
        sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Execute query with pagination and sorting
        const employees = await Employee.find(query)
            .sort(sortObj)
            .skip(skip)
            .limit(parseInt(limit));
            
        const totalEmployees = await Employee.countDocuments(query);
        const departments = await Employee.distinct('department');

        // Debug log
        console.log(`Fetched ${employees.length} employees for query:`, { page, limit, search, department, status });

        res.json({
            employees: employees || [],
            totalPages: Math.ceil(totalEmployees / parseInt(limit)),
            currentPage: parseInt(page),
            totalEmployees,
            departments: departments || [],
        });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @desc    Add a new employee
// @route   POST /api/employees
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    
    console.log('Received employee data:', req.body);

    const { name, email, phone, jobTitle, department } = req.body;

    // Check for required fields
    if (!name || !email || !jobTitle || !department) {
        return res.status(400).json({ message: 'Please enter all required fields' });
    }

    try {
        // Check if employee with this email already exists
        const employeeExists = await Employee.findOne({ email });
        if (employeeExists) {
            return res.status(400).json({ message: 'Employee with this email already exists' });
        }

        const employee = await Employee.create({
            name,
            email,
            phone,
            jobTitle,
            department,
            user: req.user._id,
        });

        res.status(201).json(employee);
    } catch (error) {
        console.error('Error adding new employee:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @desc    Update an employee by ID
// @route   PUT /api/employees/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const { name, email, phone, jobTitle, department, status } = req.body;

        const employee = await Employee.findById(req.params.id);

        if (employee) {
            // Update fields
            employee.name = name || employee.name;
            employee.email = email || employee.email;
            employee.phone = phone || employee.phone;
            employee.jobTitle = jobTitle || employee.jobTitle;
            employee.department = department || employee.department;
            employee.status = status || employee.status;

            const updatedEmployee = await employee.save();
            res.json(updatedEmployee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @desc    Delete an employee
// @route   DELETE /api/employees/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (employee) {
            await employee.deleteOne();
            res.json({ message: 'Employee removed' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @desc    Bulk delete employees (kept for future, not used in frontend)
// @route   DELETE /api/employees/bulk
// @access  Private/Admin
router.delete('/bulk', protect, admin, async (req, res) => {
    try {
        const { employeeIds } = req.body;

        if (!employeeIds || !Array.isArray(employeeIds) || employeeIds.length === 0) {
            return res.status(400).json({ message: 'Employee IDs array is required' });
        }

        const result = await Employee.deleteMany({
            _id: { $in: employeeIds }
        });

        res.json({
            message: `${result.deletedCount} employees deleted successfully`,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @desc    Bulk update employee status (kept for future, not used in frontend)
// @route   PUT /api/employees/bulk/status
// @access  Private/Admin
router.put('/bulk/status', protect, admin, async (req, res) => {
    try {
        const { employeeIds, status } = req.body;
        
        if (!employeeIds || !Array.isArray(employeeIds) || employeeIds.length === 0) {
            return res.status(400).json({ message: 'Employee IDs array is required' });
        }

        if (!status || !['Active', 'On Leave', 'Terminated'].includes(status)) {
            return res.status(400).json({ message: 'Valid status is required' });
        }

        const result = await Employee.updateMany(
            { _id: { $in: employeeIds } },
            { status }
        );

        res.json({
            message: `${result.modifiedCount} employees updated successfully`,
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;