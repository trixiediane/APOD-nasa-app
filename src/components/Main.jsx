import React from 'react';

export default function Main(props) {
    // Destructure props to get data
    const { data } = props;
    return (
        <div className='imgContainer'>
            {/* Display the image from NASA API */}
            <img src={data.hdurl} alt={data.title || 'bg-img'} className='bgImage' />
        </div>
    );
}
