/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
const FixedDataTable = require( 'fixed-data-table' );
const {Table, Column, Cell} = FixedDataTable;

export const getTouchableCell = ( onTouchOffset: any ) => {
	return React.createClass({
		touching: false,
		startingPoint: {
			x: 0,
			y: 0
		},
		movingPoint: {
			x: 0,
			y: 0
		},
		componentWillMount(){
			let supportsPassive = false
			    try{
			      const opts = Object.defineProperty({}, 'passive', {
			        get: () => { supportsPassive = true },
			      })
			      window.addEventListener('test', null, opts)

			    }catch (e) {}
			window.addEventListener( 'touchmove',
				this.onWindowScroll,
				false );
		},
		componentWillUnmount(){
			window.removeEventListener( 'touchmove', this.onWindowScroll );
		},
		onWindowScroll( event?: any ){
			if( this.touching ){
				event.preventDefault();
				event.returnValue = false;
			}
		},
		onTouchEvent( event: any ){
			if( event.type == 'touchstart' ){
				if( event.targetTouches && event.targetTouches[ 0 ] ){
					let {clientX: x, clientY: y} = event.targetTouches[ 0 ];
					this.startingPoint = { x, y };
				}
				this.touching = true;
			}else if( event.type == 'touchend' ){
				this.touching = false;
			}else if( event.type == 'touchmove' ){
				if( event.targetTouches && event.targetTouches[ 0 ] ){
					let {clientX: x, clientY: y} = event.targetTouches[ 0 ];
					this.movingPoint = { x, y };
				}
				let {x, y} = this.movingPoint;
				let delta = {
					x: x - this.startingPoint.x,
					y: y - this.startingPoint.y
				};
				this.startingPoint = { x, y };
				onTouchOffset( delta );
			}
		},
		render(){
			return (
				<Cell
					onTouchStart={this.onTouchEvent}
					onTouchMove={this.onTouchEvent}
					onTouchEnd={this.onTouchEvent}
					{...this.props} />
			);
		}
	});
};