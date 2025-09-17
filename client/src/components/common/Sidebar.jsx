// client/src/components/common/Sidebar.jsx
import React, { useState } from 'react';
import { Nav, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [openFeatures, setOpenFeatures] = useState(false);

    return (
        <Nav className="flex-column p-3 sidebar">
            <div className="sidebar-heading">Navigation</div>
            <Nav.Link as={Link} to="/" className="sidebar-nav-link">
                Home
            </Nav.Link>
            <Nav.Link as={Link} to="/employees" className="sidebar-nav-link">
                <i className="bi bi-people"></i> Employees
            </Nav.Link>
            
            <Nav.Link onClick={() => setOpenFeatures(!openFeatures)} aria-controls="features-collapse-text" aria-expanded={openFeatures} className="sidebar-nav-link">
                <i className="bi bi-gear"></i> Features
            </Nav.Link>
            <Collapse in={openFeatures}>
                <div id="features-collapse-text" className="features-submenu">
                    <Nav.Link as={Link} to="/features/multiple-tabs" className="sidebar-nav-link">Multiple Tabs</Nav.Link>
                    <Nav.Link as={Link} to="/features/menu" className="sidebar-nav-link">Menu</Nav.Link>
                    <Nav.Link as={Link} to="/features/autocomplete" className="sidebar-nav-link">Autocomplete</Nav.Link>
                    <Nav.Link as={Link} to="/features/collapsible-content" className="sidebar-nav-link">Collapsible Content</Nav.Link>
                    <Nav.Link as={Link} to="/features/images" className="sidebar-nav-link">Images</Nav.Link>
                    <Nav.Link as={Link} to="/features/slider" className="sidebar-nav-link">Slider</Nav.Link>
                    <Nav.Link as={Link} to="/features/popups" className="sidebar-nav-link">Popups</Nav.Link>
                    <Nav.Link as={Link} to="/features/links" className="sidebar-nav-link">Links</Nav.Link>
                    <Nav.Link as={Link} to="/features/css-properties" className="sidebar-nav-link">CSS Properties</Nav.Link>
                    <Nav.Link as={Link} to="/features/iframes" className="sidebar-nav-link">iFrames</Nav.Link>
                </div>
            </Collapse>

            {/* Settings menu removed */}
        </Nav>
    );
};

export default Sidebar;