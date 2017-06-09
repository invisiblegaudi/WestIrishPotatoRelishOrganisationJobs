import React from 'react';
import {bindActionCreators} from 'redux';

import {connect} from 'react-redux'

//actions
import {logInUser} from '../../actions/authActions';

//components
import LoginComponent from './logInComponent';
import './styles/loginComponent.scss';

class LoginContainer extends React.Component{
	constructor(props){
		super(props);
		
		this.sendLogInInfo = this.sendLogInInfo.bind(this);
	}
	
	sendLogInInfo(user){
		this.props.logInUser(user);
	}
	
	
	render(){
		console.log("logincontainer props", this.props);
		return(
			<div>
				I'm the loginContainer
				<LoginComponent logInUser={this.sendLogInInfo} errorMessage={this.props.user.error}/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {user: state.user}
}

function mapDsipatchToProps(dispatch) {
	return bindActionCreators({logInUser}, dispatch);
}

export default connect(mapStateToProps, mapDsipatchToProps)(LoginContainer);