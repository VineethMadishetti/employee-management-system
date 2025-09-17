// client/src/components/features/Popups.jsx
import React, { useState } from 'react';

const Popups = () => {
    const [show, setShow] = useState(false);
    return (
        <div className="p-3">
            <h3>Popups</h3>
            <button className="btn btn-primary" onClick={() => setShow(true)}>Open Popup</button>
            {show && (
                <div className="modal d-block" tabIndex="-1" onClick={() => setShow(false)}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Simple Modal</h5>
                                <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                            </div>
                            <div className="modal-body">Hello from a simple popup!</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShow(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Popups;


