import React from 'react';

export default function CommonInput({
    label,
    id,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    error = '',
    required = false,
}) {
    return (
        <div className="flex flex-col mb-4">
            <label htmlFor={id} className="mb-1 font-semibold text-white">
                {label}{required && ' *'}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`p-2 rounded ${error ? 'border-red-500 border-2' : 'border border-gray-300'}`}
            />
            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
    );
}
