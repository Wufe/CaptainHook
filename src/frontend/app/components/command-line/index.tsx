/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {State, Command} from '../../states';
import {commandsToFormattedCommands, EnhancedCommand} from '../../selectors';
import './style.scss';

export type StateProps = {
	command: EnhancedCommand;
};

export type Props = StateProps;

class CommandLine extends Component<Props, {}>{

	constructor( props: Props, context?: any ){
		super( props, context );
	}

	_commandLine: any;

	componentDidUpdate(){
		let {_commandLine: cl} = this;
		if( cl ){
			cl.scrollTop = cl.scrollHeight;
		}
	}

	render(){
		return (
			<div>
				<div className="commandLineBar">
					<div className="centeredBarContent">Command Line Log</div>
				</div>
				<div className="commandLineContainer">
					<div className="commandLine" ref={f => this._commandLine = f}>
						{/*<div className="commandHeader success">
							[/webhook/1234test1341asd40] - [192.168.1.0]
								<br />
							$ npm install -s
						</div>*/}
						{this.props.command.commands.map( ( command ) => {
							let {messages} = command;
							return messages.map( ( message, i ) => {
								return <div key={`${command.id}_${i}`}>{`[${command.timestamp}] - ${message}`}</div>
							})
						})}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ( state: State ) => {
	return {
		command: commandsToFormattedCommands( state )
	};
}

export default connect( mapStateToProps, null )( CommandLine );