import React from 'react';
import taco from '../media/logo192.png';
export default function Navbar () {
  return (
    <div style={{flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <h1 className="mt-3 m-2">Foodle</h1>

      <img
        src={taco}
        alt="taco logo"
        style={{height: 100, width: 90, opacity: 1, paddingBottom: 20}}
      />
    </div>
  );
}
