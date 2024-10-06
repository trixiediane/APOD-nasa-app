import React from 'react';

export default function SideBar(props) {
    // Destructure props to get handleToggleModal and data
    const { handleToggleModal, data } = props;
    return (
        <div className='sidebar'>
            {/* Background overlay that closes the modal when clicked */}
            <div onClick={handleToggleModal} className='bgOverlay'></div>
            <div className='sidebarContents'>
                {/* NASA data title */}
                <h2>{data?.title}</h2>
                <div className='descriptionContainer'>
                    {/* Date from the NASA data */}
                    <p className='descriptionTitle'>{data?.date}</p>
                    {/* Explanation or description from NASA */}
                    <p>{data?.explanation}</p>
                </div>
                {/* Button to close the sidebar */}
                <button onClick={handleToggleModal}>
                    <i className="fa-solid fa-arrow-right"></i>  {/* Right arrow icon */}
                </button>
            </div>
        </div>
    );
}
