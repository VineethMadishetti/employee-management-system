// client/src/components/features/iFrames.jsx
import React from 'react';

const IFrames = () => {
    return (
        <div className="p-3">
            <h3>iFrames</h3>
            <div className="ratio ratio-16x9">
                <iframe title="example" src="https://jalaacademy.com/" />
            </div>
        </div>
    );
};

export default IFrames;


