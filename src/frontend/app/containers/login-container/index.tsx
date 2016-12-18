/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';
import Particles from 'react-particles-js';
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

interface LoginContainerProps{}

export default class LoginContainer extends Component<LoginContainerProps, any>{

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
						<input type="text" placeholder="Username" />
							<br />
						<input type="password" placeholder="Password" />
					</div>
				</div>
			</div>
			
		);
	}

}