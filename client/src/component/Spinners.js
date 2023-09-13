import React from 'react';
import { MoonLoader } from 'react-spinners';

const Spinners = () => {
  return (
    <div className="d-flex justify-content-center spinner">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">
          <MoonLoader color="#36d7b7" />
        </span>
      </div>
    </div>
  );
}

export default Spinners;
