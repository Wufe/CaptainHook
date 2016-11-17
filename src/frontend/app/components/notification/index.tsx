/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';
import './style.scss';

interface ComponentProps{
	id: number | string;
	text: string;
	timeout?: number;
	deleteNotification: ( id: number | string ) => any;
}

interface State{}

type Props = ComponentProps;

class Notification extends Component<Props, State>{

	componentWillMount(){}

	componentDidMount(){
		setTimeout(() => {
			this.props.deleteNotification( this.props.id );
		}, this.props.timeout );
	}

	render(){
		return (
			<div
				className="notification">
				<p>{this.props.text}</p>
			</div>
		);
	}

}

export default Notification;