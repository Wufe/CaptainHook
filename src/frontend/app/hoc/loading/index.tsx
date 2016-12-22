/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component, createClass} from 'react';
import {connect} from 'react-redux';
import {State} from '../../states';
import './style.scss';

const loadingDecorator = function( Subject: any ){
	return class LoadingHOC extends Component<any, any>{
		render(){
			return <Subject {...this.props} />
		}
	}
};

export default loadingDecorator;