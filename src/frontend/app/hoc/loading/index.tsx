/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component, createClass} from 'react';
import {connect} from 'react-redux';
import {State} from '../../states';
import './style.scss';

const loadingDecorator = function <T>( getStateFunction: ( state: State ) => T, actionToDispatchOnWillMount?: ( dispatch: any ) => any, customStyle: { [key: string]: any; } = {} ){
	return ( Subject: any ) => {

		class LoadingHOC extends Component<{ selectedState: any, selectedAction?: any }, any>{

			componentWillMount(){
				if( this.props.selectedAction )
					this.props.selectedAction();
			}

			render(){
				console.log( this.props );
				let empty = true;
				if( this.props.selectedState instanceof Array ){
					if( this.props.selectedState.length > 0 ){
						empty = false;
					}
				}else if( Object.keys( this.props.selectedState ).length > 0 ){
					empty = false;
				}
				if( !empty )
					return <Subject {...this.props} />
				return <div className="loadingWrapper" style={customStyle}>Loading</div>
			}
		}

		const mapStateToProps = ( state: State ) => {
			return {
				selectedState: getStateFunction( state )
			};
		};

		const mapDispatchToProps = ( dispatch: any ) => {
			return actionToDispatchOnWillMount ? 
				{
					selectedAction: () => actionToDispatchOnWillMount( dispatch )
				} : {};
		};

		return connect( mapStateToProps, mapDispatchToProps )( LoadingHOC );
	};
};

export default loadingDecorator;