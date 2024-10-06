import React from 'react';

export default function Footer(props) {
    // Destructure props to get showModal, handleToggleModal, and data
    const { showModal, handleToggleModal, data } = props;
    return (
        <footer>
            <div className='bgGradient'></div>
            <div>
                {/* Project Title */}
                <h1>APOD PROJECT</h1>
                {/* Title from the NASA data */}
                <h2>{data?.title}</h2>
            </div>
            {/* Button to open the sidebar */}
            <button onClick={handleToggleModal}>
                <i className='fa-solid fa-circle-info'></i>  {/* Info icon */}
            </button>
        </footer>
    );
}
