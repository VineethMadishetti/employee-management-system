// client/src/components/features/Slider.jsx
import React, { useState } from 'react';

const Slider = () => {
    const [value, setValue] = useState(50);
    return (
        <div className="p-3">
            <h3>Slider</h3>
            <input type="range" className="form-range" min="0" max="100" value={value} onChange={(e) => setValue(Number(e.target.value))} />
            <div>Value: {value}</div>
        </div>
    );
};

export default Slider;


