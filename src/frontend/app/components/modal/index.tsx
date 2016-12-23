/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component, ReactChildren} from 'react';
import './style.scss';

export type Props = {
	children?: ReactChildren;
	display?: boolean;
	style?: { [prop: string]: string | number; };
}

export default class Modal extends Component<Props, any>{

	constructor( props: Props ){
		super( props );
	}

	static defaultProps = {
		display: true
	};

	render(){
		return (
			<div className='modalContainer' style={
					this.props.display ? {
						display: 'block',
						opacity: 1
					} :
					{
						display: 'none',
						opacity: 0
					}
				}>
				<div className="modalContent" style={this.props.style}>
					{this.props.children}
				</div>
			</div>
		);
	}

}