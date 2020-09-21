import React from 'react';

import './styles.css';

const Launcher = () => (
  <div className="launcher-body">
    <div className="logo-container">
      <div className="logo mb-1em">
        <img src="/img/logo.png" width={250} height={250} alt="react" />
      </div>
      <div className="logo-text">
        <h4>Yükleniyor ...</h4>
      </div>
    </div>
  </div>
);

export default Launcher;
