import React from 'react';
import taco from '../../media/logo192.png';

export default function Navbar({label, backgroundColor, color}) {
  return (
    <nav
      className="navbar justify-content-between "
      style={{
        flexDirection: 'row',
        backgroundColor: backgroundColor || 'rgba(0,0,0,0.5)',
      }}
    >

      <div className="p-4">
        <i
          className="fa-solid fa-bars m-2 pointer"
          style={{color: color && color}}
        />
        <i
          className="fa-regular fa-circle-question pointer"
          style={{color: color && color}}
        />
      </div>
      <div>
        <h1 className="mt-3 m-2 " style={{color: color && color}}>
          {label || 'Word Foodle'}
        </h1>
        <img
          src={taco}
          alt="taco logo"
          style={{height: 100, width: 90, opacity: 1, paddingBottom: 20}}
        />
      </div>
      <div className="p-4">
        <i
          className="fa-solid fa-chart-simple m-2 pointer"
          style={{color: color && color}}
        />
        <i
          className="fa-solid fa-gear m-2 pointer"
          style={{color: color && color}}
        />
      </div>
    </nav>
  );
}
