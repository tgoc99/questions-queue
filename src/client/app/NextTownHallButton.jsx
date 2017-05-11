import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import HomeComponent from './home.component.jsx';

class NextTownHallButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: props.isAdmin,
      open:false
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleNextTownHall = this.handleNextTownHall.bind(this);
  }

  handleOpen() {
    this.setState({open: true})
  }
  handleClose() {
    this.setState({ open: false })
  }
  handleNextTownHall() {
    this.props.handleNextTownHall();
    this.handleClose();
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Next TownHall"
        primary={true}
        onTouchTap={this.handleNextTownHall}
      />,
    ];

    return (
      !this.state.showButton ? <div></div> : (
        <div className>                                            
          <RaisedButton 
            className="town-hall-button" 
            onTouchTap={this.handleOpen} 
            label='NEXT TOWNHALL' />
          <Dialog
            title="Next Town Hall"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            Are you sure you want to move to the Next Town Hall?  All questions without the "KEEP" flag enabled will be still be accessable, but will not show up by default.  Please "KEEP" any questions you want to roll over to the next Town Hall
          </Dialog>
        </div>
      )
    )
  }
}

export default NextTownHallButton;