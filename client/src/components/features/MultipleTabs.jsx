// client/src/components/features/MultipleTabs.jsx
import React, { useState } from 'react';

const MultipleTabs = () => {
    const [active, setActive] = useState('one');
    return (
        <div className="p-3">
            <h3>Multiple Tabs</h3>
            <div className="btn-group mb-3">
                <button className={`btn btn-${active==='one'?'primary':'outline-primary'}`} onClick={() => setActive('one')}>Tab 1</button>
                <button className={`btn btn-${active==='two'?'primary':'outline-primary'}`} onClick={() => setActive('two')}>Tab 2</button>
            </div>
            {active === 'one' ? (
                <div className="alert alert-secondary">Content for Tab 1</div>
            ) : (
                <div className="alert alert-secondary">Content for Tab 2</div>
            )}
        </div>
    );
};

export default MultipleTabs;


