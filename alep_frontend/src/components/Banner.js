import React from 'react';
import logo from './logo.jpg';

const Banner = ({ appName }) => {
    return (
        <div className='banner'>
            <img src={logo} alt={`${appName} Logo`} style={{ width: '35%', height: 'auto' }} />
        </div>
    );
};

export default Banner;
