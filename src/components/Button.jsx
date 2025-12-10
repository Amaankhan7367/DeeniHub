import React from "react";
import "./";

export default function Button({
    children,
    type = "button",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`deeni-btn ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}