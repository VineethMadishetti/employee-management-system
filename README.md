# JALA Academy - Advanced Employee Management System

A comprehensive full-stack employee management system built with React, Node.js, Express, and MongoDB. This project showcases advanced business logic, modern UI/UX, and enterprise-level features.

## 🚀 Features

### Frontend (React + Vite)
- **Advanced Employee Management**: Full CRUD operations with search, filtering, and pagination
- **Real-time Analytics Dashboard**: Comprehensive data visualization and insights
- **Modern UI/UX**: Bootstrap 5 with custom styling and responsive design
- **Advanced Search & Filtering**: Multi-field search with department and status filters
- **Bulk Operations**: Select multiple employees for batch operations
- **Data Export**: Export employee data in CSV and JSON formats
- **Sortable Tables**: Click column headers to sort data
- **Pagination**: Efficient data loading with customizable page sizes
- **Role-based Access Control**: Different views for admin and employee users
- **Interactive Features**: Tooltips, modals, and dynamic content

### Backend (Node.js + Express)
- **RESTful API**: Well-structured API endpoints with proper HTTP methods
- **Advanced Database Queries**: MongoDB aggregation pipelines for analytics
- **Server-side Pagination**: Efficient data handling for large datasets
- **Search Functionality**: Full-text search across multiple fields
- **Bulk Operations API**: Batch delete and update operations
- **JWT Authentication**: Secure token-based authentication
- **Password Reset**: Email-based password recovery system
- **Input Validation**: Comprehensive data validation and sanitization
- **Error Handling**: Proper error responses and logging
- **CORS Configuration**: Cross-origin resource sharing setup

### Database (MongoDB)
- **Optimized Schemas**: Well-designed data models with relationships
- **Indexing**: Database indexes for improved query performance
- **Aggregation Pipelines**: Complex data analysis and reporting
- **Data Validation**: Schema-level validation rules

## 🛠️ Technologies Used

### Frontend
- React 19 with Hooks
- Vite (Build Tool)
- React Router DOM (Routing)
- Bootstrap 5 (UI Framework)
- Bootstrap Icons (Icon Library)
- Axios (HTTP Client)
- React Bootstrap (Components)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (Authentication)
- Bcryptjs (Password Hashing)
- Nodemailer (Email Service)
- CORS (Cross-Origin Requests)

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd employee-management-system
```

### 2. Backend Setup
```bash
cd server
npm install
```

### 3. Environment Configuration
Create a `.env` file in the server directory:
```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/employee-management

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (for password reset)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=5000

# Environment
NODE_ENV=development
```

### 4. Frontend Setup
```bash
cd client
npm install
```

### 5. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### 6. Run the Application

#### Start Backend Server
```bash
cd server
npm start
```

#### Start Frontend Development Server
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📊 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `POST /api/users/forgot-password` - Request password reset
- `PUT /api/users/reset-password/:token` - Reset password

### Employees
- `GET /api/employees` - Get all employees (with pagination, search, filters)
- `GET /api/employees/analytics` - Get analytics data
- `GET /api/employees/:id` - Get single employee
- `POST /api/employees` - Create new employee (Admin only)
- `PUT /api/employees/:id` - Update employee (Admin only)
- `DELETE /api/employees/:id` - Delete employee (Admin only)
- `DELETE /api/employees/bulk` - Bulk delete employees (Admin only)
- `PUT /api/employees/bulk/status` - Bulk update status (Admin only)

## 🎯 Key Features Demonstrated

### Business Logic
- Advanced search and filtering algorithms
- Complex data aggregation and analytics
- Efficient pagination and sorting
- Bulk operations for data management
- Real-time data processing

### Technical Skills
- Modern React patterns (Hooks, Context, Custom Hooks)
- Advanced JavaScript (ES6+, Async/Await, Promises)
- Database optimization and query performance
- RESTful API design and implementation
- Authentication and authorization
- Error handling and validation
- Responsive design and UX

### Enterprise Features
- Role-based access control
- Data export functionality
- Analytics and reporting
- Bulk operations
- Advanced search capabilities
- Performance optimization

## 👥 User Roles

### Admin
- Full CRUD access to employee data
- Access to analytics dashboard
- Bulk operations
- User management

### Employee
- View employee information
- Limited access to features
- Profile management

## 🔧 Development Features

- Hot reloading (Frontend)
- ESLint configuration
- Modular component architecture
- Reusable UI components
- Error boundaries
- Loading states
- Form validation

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile devices

## 🚀 Deployment Ready

The application is production-ready with:
- Environment configuration
- Error handling
- Security measures
- Performance optimizations
- Scalable architecture

## 📈 Performance Features

- Client-side pagination
- Server-side filtering
- Optimized database queries
- Lazy loading
- Efficient state management
- Minimal re-renders

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Role-based access control
- Secure API endpoints

This project demonstrates advanced full-stack development skills suitable for enterprise-level applications and showcases modern web development best practices.
