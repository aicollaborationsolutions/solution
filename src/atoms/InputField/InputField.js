import React from 'react'
import './InputField.css';

export default function InputField({ name, placeholder, handleInputChange, value, classname: className, parentclassname: parentClassName, readonly }) {
    return (
        <div className={parentClassName || "inputFieldOrgDetail"}>
            <div className="inputFieldOrgDetailLabel">{placeholder || "Enter Value"}</div>
            <textarea
                className={className || ""}
                name={name}
                placeholder={placeholder || "Enter Value"}
                value={value}
                onChange={(e) => handleInputChange(e.target.value, name)}
                readOnly={readonly || false}
                rows="12"
                style={{ height: 300 }}
            >{value}</textarea>
        </div>
    )
}
