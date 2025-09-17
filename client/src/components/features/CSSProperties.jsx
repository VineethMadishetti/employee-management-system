// client/src/components/features/CSSProperties.jsx
import React from 'react';

const CSSProperties = () => {
    return (
        <div className="p-3">
            <h3>CSS Properties</h3>
            <div style={{
                background: 'linear-gradient(135deg, #6f86d6 0%, #48c6ef 100%)',
                color: '#fff',
                padding: '16px',
                borderRadius: 8
            }}>Inline styled box</div>
        </div>
    );
};

export default CSSProperties;


