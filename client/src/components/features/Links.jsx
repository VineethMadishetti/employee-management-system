// client/src/components/features/Links.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Links = () => {
    return (
        <div className="p-3">
            <h3>Links</h3>
            <p>
                <a href="https://google.com" target="_blank" rel="noreferrer">External Link</a>
            </p>
            <p>
                <Link to="/employees">Internal Link to Employees</Link>
            </p>
        </div>
    );
};

export default Links;


