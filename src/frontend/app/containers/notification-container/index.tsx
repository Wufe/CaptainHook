/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {App as AppState} from '../../states';
import {Notification} from '../../components';
import {Dispatch} from 'redux';
import {deleteNotification} from '../../actions/app';
import './style.scss';

interface DispatchProps{
	deleteNotification?: ( id: number | string ) => any
}

interface StateProps{
	app?: AppState
}

type Props = DispatchProps & StateProps;

class NotificationContainer extends Component<Props, any>{
	render(){
		let {notifications} = this.props.app;
		let notificationComponents: any[] = notifications.map( notification => {
			return (
				<Notification
					key={notification.id}
					id={notification.id}
					text={notification.text}
					timeout={5000}
					deleteNotification={this.props.deleteNotification.bind(this)}/>
				);
		});

		return (
			<div className="notificationContainer">
				{notificationComponents}
			</div>
		);
	}
}

let mapStateToProps: ( state: any ) => any 
	= ( state ) => {
		return {
			app: state.app
		}
	};

let mapDispatchToProps: ( dispatch: Dispatch<AppState> ) => any =
	( dispatch ) => {
		return {
			deleteNotification: ( id: number | string ) => dispatch( deleteNotification( id ) )
		}
	}

export default connect( mapStateToProps, mapDispatchToProps )( NotificationContainer );