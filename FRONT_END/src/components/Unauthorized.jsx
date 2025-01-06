import React from 'react';

const Unauthorized = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Unauthorized Access</h1>
            <p style={styles.message}>You do not have permission to view this page.</p>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
    },
    title: {
        fontSize: '2rem',
        color: '#e74c3c',
    },
    message: {
        fontSize: '1.2rem',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#3498db',
        color: '#fff',
        cursor: 'pointer',
    },
};

export default Unauthorized;
