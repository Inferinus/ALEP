import React from 'react';
import logo from './logo.jpg'; // Ensure the path to the logo is correct

const Banner = ({ appName }) => {
    return (
        <div className='banner'>
            <img src={logo} alt={`${appName} Logo`} style={{ width: '35%', height: 'auto' }} />
        </div>
    );
};

export default Banner;
