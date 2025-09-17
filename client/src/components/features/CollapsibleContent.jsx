// client/src/components/features/CollapsibleContent.jsx
import React, { useState } from 'react';

const CollapsibleContent = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="p-3">
            <h3>Collapsible Content</h3>
            <button className="btn btn-primary mb-2" onClick={() => setOpen(!open)}>
                {open ? 'Hide' : 'Show'} Content
            </button>
            {open && (
                <div className="alert alert-info">This is some collapsible content.</div>
            )}
        </div>
    );
};

export default CollapsibleContent;


