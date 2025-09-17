// client/src/components/features/AutoComplete.jsx
import React, { useState } from 'react';

const AutoComplete = () => {
    const [query, setQuery] = useState('');
    const options = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry', 'Grape', 'Orange'];
    const filtered = options
        .filter(option => option.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);

    return (
        <div className="p-3">
            <h3>Autocomplete</h3>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Type to filter..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <ul className="list-group">
                {filtered.map(item => (
                    <li key={item} className="list-group-item">{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default AutoComplete;

 