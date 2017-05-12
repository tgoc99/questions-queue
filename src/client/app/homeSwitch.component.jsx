import React from 'react';
import { render } from 'react-dom';

import HomeComponent from './home.component.jsx';
import HomeDesktopComponent from './homeDesktop.component.jsx';

class HomeSwitchComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <HomeComponent/>
      </div>
    );
  }
}

export default HomeSwitchComponent;
