import { remove } from 'lodash';
import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

class NavBar extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	open: false
	    };

	    // Navigation stuff
	    this.openDrawer = this.openDrawer.bind(this);
	    this.handleToggle = this.handleToggle.bind(this);
	    this.handleClose = this.handleClose.bind(this);
	}


	// Navigation 
	openDrawer() {
		console.log("open drawer");
		this.setState({open: true});
	}

	handleToggle() {
		this.setState({open: !this.state.open});
	}

	handleClose() {
		this.setState({open: false});
	}

	render() {
		return (
			<MuiThemeProvider>
			<div>
			<AppBar
			style={{position:'fixed',width:'100%', top:'0'}}
	            title="Question Queue"
	            onLeftIconButtonTouchTap = {this.openDrawer}
	            iconElementRight = {<IconMenu iconButtonElement={
	                <IconButton><MoreVertIcon /></IconButton>
	              }
	              targetOrigin={{horizontal: 'right', vertical: 'top'}}
	              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
	            >
					<MenuItem href="/auth/logout" primaryText="Sign out" />
	            </IconMenu>}
	          />

				<Drawer
				docked={false}
				width={275}
				open={this.state.open}
				onRequestChange={(open) => this.setState({open})}
				>
					<AppBar title="Question Queue" showMenuIconButton={false} />
					<MenuItem href="#/home" onTouchTap={this.handleClose}>
					  <i className="material-icons">home</i> 
					  Home
					</MenuItem>
					<MenuItem href="#/question" onTouchTap={this.handleClose}>
					  <i className="material-icons">speaker_notes</i> 
					  Ask Question
					</MenuItem>
					<MenuItem href="#/profile" onTouchTap={this.handleClose}>
					  <i className="material-icons">account_circle</i> 
					  Profile
					</MenuItem>
					<MenuItem href="#/manage" onTouchTap={this.handleClose}>
					  <i className="material-icons">settings</i> 
					  Manage
					</MenuItem>
					<MenuItem href="#/analytics" onTouchTap={this.handleClose}>
					  <i className="material-icons">show_chart</i> 
					  Analytics
					</MenuItem>
					<MenuItem onTouchTap={this.handleClose}>
					  <i className="material-icons">highlight_off</i>
					  Close
					</MenuItem>
				</Drawer>
			</div>
			</MuiThemeProvider>
		)
	}


}

export default NavBar;
