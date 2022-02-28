import React from 'react'
const Mailto = ({ email, subject, body, children }) => {
    return (
        <>
        <a href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>{email}</a>
        </>
    )
};

export default Mailto