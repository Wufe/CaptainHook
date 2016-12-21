/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../../typings/react-particles-js/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import Particles from 'react-particles-js';
import {loginSend} from '../../actions/login'
import {Auth} from '../../states/app';
import './style.scss';

const particlesConfig = {
	particles: {
		number:{
			value: 30
		},
		line_linked: {
			color: "#FFF",
			opacity: 0.8,
			shadow: {
				enable: false
			}
		},
		move: {
			speed: 3
		},
		size: {
			value: 2
		},
		retina_detect: false
	}
};

interface LoginProps{}

interface ActionProps{
	sendLogin: ( username: string, password: string ) => void;
}

interface StateProps{
	auth: Auth;
}

type Props = LoginProps & ActionProps & StateProps;

type State = {
	credentials: {
		username: string;
		password: string;
	}
}

class Login extends Component<Props, State>{

	_passwordField: any;

	constructor( props: Props ){
		super( props );
		this.onUsernameKeyDown = this.onUsernameKeyDown.bind( this );
		this.onPasswordKeyDown = this.onPasswordKeyDown.bind( this );
		this.onUsernameChange = this.onUsernameChange.bind( this );
		this.onPasswordChange = this.onPasswordChange.bind( this );
		this.state = {
			credentials: {
				username: "",
				password: ""
			}
		};
	}

	onUsernameKeyDown( proxy: any ){
		let {keyCode: code} = proxy;
		if( code == 13 ){
			if( this._passwordField )
				this._passwordField.focus();
		}
	}

	onPasswordKeyDown( proxy: any ){
		let {keyCode: code} = proxy;
		if( code == 13 ){
			if( !this.props.auth.logging ){
				let {credentials} = this.state;
				this.setState({
					credentials
				}, () => {
					this.props.sendLogin( credentials.username, credentials.password );
				});
			}
		}
	}

	onUsernameChange( event: any ){
		let {target} = event;
		let value = target.value;
		let {credentials} = this.state;
		credentials.username = value;
		this.setState({
			credentials
		});
	}

	onPasswordChange( event: any ){
		let {target} = event;
		let value = target.value;
		let {credentials} = this.state;
		credentials.password = value;
		this.setState({
			credentials
		});
	}

	render(){
		return (
			<div>
				<div className="particlesContainer">
					<Particles params={particlesConfig}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						zIndex: 0
					}}
					width="100%"
					height="100%" />
				</div>
				<div className="loginContainer">
					<div className="loginBox">
						<div className="header">
							Captain Hook
						</div>
						<div className="subheader">
							Login
						</div>
						<input
							type="text"
							placeholder="Username"
							onKeyDown={this.onUsernameKeyDown}
							onChange={this.onUsernameChange}
							value={this.state.credentials.username}/>
							<br />
						<input
							type="password"
							ref={f => this._passwordField = f}
							placeholder="Password"
							onKeyDown={this.onPasswordKeyDown}
							onChange={this.onPasswordChange}
							value={this.state.credentials.password}/>
							<br />
						<button>
							Login
						</button>
					</div>
				</div>
			</div>
			
		);
	}

}

let mapStateToProps = ( state: any ) => {
	return {
		auth: state.app.auth
	}
}

let mapDispatchToProps = ( dispatch: any ) => {
	return {
		sendLogin: ( username: string, password: string ) => dispatch( loginSend( username, password ) )
	};
};

export default connect( mapStateToProps, mapDispatchToProps )( Login );