/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';
import './style.scss';

const FixedDataTable = require( 'fixed-data-table' );
const {Table, Column, Cell} = FixedDataTable;
import '../../../../../node_modules/fixed-data-table/dist/fixed-data-table.css';

const rows: any[][] = [
	[ 1, 'hacking_windler', '/webhook/c8ca', 'Lorem ipsum dolor sit amet. Consectetur adipisicit elit sed do eiusdom.', 'post', 'a day ago', 'a day ago' ],
	[ 2, 'parsing_dooley', '/webhook/ead4', 'Lorem ipsum dolor sit amet. Consectetur adipisicit elit sed do eiusdom.', 'post', 'a day ago', 'a day ago' ],
	[ 3, 'compressing_conroy', '/webhook/d344', 'Lorem ipsum dolor sit amet. Consectetur adipisicit elit sed do eiusdom.', 'post', 'a day ago', 'a day ago' ],
	[ 4, 'programming_okuneva', '/webhook/d4ed', 'Lorem ipsum dolor sit amet. Consectetur adipisicit elit sed do eiusdom.', 'post', 'a day ago', 'a day ago' ],
	[ 5, 'overriding_pagac', '/webhook/04b6', 'Lorem ipsum dolor sit amet. Consectetur adipisicit elit sed do eiusdom.', 'post', 'a day ago', 'a day ago' ]
];

type State = {
	tableWidth: number;
	columnWidth: {
		[key: string]: number;
	},
	widthSum: number;
};

export default class Entries extends Component<{}, State>{

	constructor( props: any ){
		super( props );
		this.onColumnResize = this.onColumnResize.bind( this );
		this.onWindowResize = this.onWindowResize.bind( this );
		this.setNode = this.setNode.bind( this );
		this.state = {
			tableWidth: 0,
			columnWidth: {
				id: 50,
				name: 170,
				uri: 250,
				description: 200,
				method: 70,
				created: 110,
				updated: 110 
			},
			widthSum: 960
		}
	}

	onColumnResize( newColumnWidth: number, columnKey: string ){
		let {tableWidth, columnWidth, widthSum} = this.state;
		newColumnWidth = newColumnWidth < 2 ? 2 : newColumnWidth;
		columnWidth[ columnKey ] = newColumnWidth;
		this.setState({
			tableWidth,
			columnWidth,
			widthSum
		});
	}

	componentWillMount(){
		window.addEventListener( 'resize', this.onWindowResize )
	}

	componentDidMount(){
		this.onWindowResize();
	}

	onWindowResize( event?: any ){
		let {columnWidth, widthSum} = this.state;
		if( this._entries ){
			this.setState({
				tableWidth: this._entries.clientWidth,
				columnWidth,
				widthSum
			});
		}
	}

	setNode( f: HTMLElement ){
		this._entries = f;
	}

	componentWillUnmount(){
		window.removeEventListener( 'resize', this.onWindowResize );
	}

	_entries: any;

	render(){
		return (
			<div className="entriesContainer">
				<div className="entries" style={{
					maxWidth: this.state.widthSum
				}} ref={f => this.setNode( f )}>
					<Table
						rowHeight={37}
						rowsCount={rows.length}
						width={this.state.tableWidth}
						isColumnResizing={false}
						onColumnResizeEndCallback={this.onColumnResize}
						maxHeight={1000}
						headerHeight={50}>
						<Column
							columnKey="id"
							header={<Cell>ID</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<Cell>
									{rows[rowIndex][0]}
								</Cell>
							)}
							width={this.state.columnWidth['id']}
							fixed={true}/>
						<Column
							columnKey="name"
							header={<Cell>Name</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<Cell>
									<span title={rows[rowIndex][1]}>
										{rows[rowIndex][1]}
									</span>
								</Cell>
							)}
							fixed={true}
							isResizable={true}
							width={this.state.columnWidth['name']}/>
						<Column
							columnKey="uri"
							header={<Cell>URI</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<Cell>
									<span title={rows[rowIndex][2]}>
										{rows[rowIndex][2]}
									</span>
								</Cell>
							)}
							fixed={false}
							isResizable={true}
							width={this.state.columnWidth['uri']}/>
						<Column
							columnKey="description"
							header={<Cell>Description</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<Cell>
									<span style={{
										whiteSpace: "nowrap"
									}} title={rows[rowIndex][3]}>
										{rows[rowIndex][3]}
									</span>
									
								</Cell>
							)}
							fixed={false}
							isResizable={true}
							width={this.state.columnWidth['description']}/>
						<Column
							columnKey="method"
							header={<Cell>Method</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<Cell>
									{rows[rowIndex][4]}
								</Cell>
							)}
							fixed={false}
							isResizable={true}
							width={this.state.columnWidth['method']}/>
						<Column
							columnKey="created"
							header={<Cell>Created</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<Cell>
									{rows[rowIndex][5]}
								</Cell>
							)}
							fixed={false}
							isResizable={true}
							width={this.state.columnWidth['created']}/>
						<Column
							columnKey="updated"
							header={<Cell>Updated</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<Cell>
									{rows[rowIndex][5]}
								</Cell>
							)}
							fixed={false}
							isResizable={true}
							width={this.state.columnWidth['updated']}/>
					</Table>
				</div>
			</div>
		);
	}
}


