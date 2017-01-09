/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {connect} from 'react-redux';
import {Component} from 'react';
import './style.scss';
import {getTouchableCell} from './touchableCell';
import {entriesFetch} from '../../actions/entry';
import {commandsFetch} from '../../actions/command';
import {Entries as EntriesState, State} from '../../states';
import {EntryItem, getEntriesArrayFromObject} from '../../selectors';
import {Loading} from '../../hoc';
const FixedDataTable = require( 'fixed-data-table' );
const {Table, Column, Cell} = FixedDataTable;
import '../../style/fixed-data-table.css';

const ROW_HEIGHT = 37;

type ComponentState = {
	tableWidth: number;
	columnWidth: {
		[key: string]: number;
	},
	widthSum: number;
};

interface EntriesProps{}

interface StateProps{
	entries: EntryItem[];
}

interface ActionProps{
	entriesFetch: () => void;
	commandsFetch: ( snapshot?: string ) => void;
}

type Props = EntriesProps & ActionProps & StateProps;

class Entries extends Component<Props, any>{

	TouchableCell: any;

	constructor( props: any ){
		super( props );
		this.onColumnResize = this.onColumnResize.bind( this );
		this.onWindowResize = this.onWindowResize.bind( this );
		this.onTouchOffset = this.onTouchOffset.bind( this );
		this.setNode = this.setNode.bind( this );
		this.state = {
			scrollLeft: 0,
			scrollTop: 0,
			tableWidth: 0,
			columnWidth: {
				id: 50,
				name: 170,
				uri: 250,
				description: 200,
				method: 80,
				created: 110,
				pipe: 50,
				content_type: 130,
				signature: 140
			},
			widthSum: 1080
		}
		this.TouchableCell = getTouchableCell( this.onTouchOffset );
	}

	onTouchOffset({x, y}: { x: number; y: number }){
		let {columnWidth, scrollLeft, scrollTop} = this.state;
		let maxWidth = 0;
		for( let key in columnWidth )
			maxWidth += columnWidth[ key ];
		let maxHeight = 0;
		if( this.props.entries )
			maxHeight = this.props.entries.length * ROW_HEIGHT;
		scrollLeft = scrollLeft + x*-1;
		scrollTop = scrollTop + x*-1;
		if( scrollLeft < 0 )
			scrollLeft = 0;
		if( scrollLeft > maxWidth )
			scrollLeft = maxWidth;
		if( scrollTop < 0 )
			scrollTop = 0;
		if( scrollTop > maxHeight )
			scrollTop = maxHeight;
		this.setState({
			scrollLeft,
			scrollTop
		});
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
		this.props.entriesFetch();
		this.props.commandsFetch();
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
		const {TouchableCell} = this;
		const rows: any[] = [];
		for( let id in this.props.entries ){
			rows.push(Object.assign({}, {
				id
			}, this.props.entries[ id ] ) );
		}
		return (
			<div className="entriesContainer">
				<div className="entries" style={{
					maxWidth: this.state.widthSum,
					overflow: 'hidden'
				}} ref={f => this.setNode( f )}>
					<Table
						scrollLeft={this.state.scrollLeft}
						scrollTop={this.state.scrollTop}
						rowHeight={ROW_HEIGHT}
						rowsCount={rows.length}
						width={this.state.tableWidth}
						isColumnResizing={false}
						onColumnResizeEndCallback={this.onColumnResize}
						maxHeight={5000}
						headerHeight={ROW_HEIGHT}
						>
						<Column
							columnKey="id"
							header={<Cell>ID</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<TouchableCell>
									{rows[rowIndex].id}
								</TouchableCell>
							)}
							width={this.state.columnWidth['id']}
							fixed={true}/>
						<Column
							columnKey="name"
							header={<Cell>Name</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<TouchableCell>
									<span style={{
										whiteSpace: "nowrap"
									}} title={rows[rowIndex].name}>
										{rows[rowIndex].name}
									</span>
								</TouchableCell>
							)}
							fixed={false}
							isResizable={true}
							width={this.state.columnWidth['name']}/>
						<Column
							columnKey="uri"
							header={<Cell>URI</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<TouchableCell>
									<span style={{
										whiteSpace: "nowrap"
									}} title={rows[rowIndex].uri}>
										{rows[rowIndex].uri}
									</span>
								</TouchableCell>
							)}
							fixed={false}
							isResizable={true}
							width={this.state.columnWidth['uri']}/>
						<Column
							columnKey="description"
							header={<Cell>Description</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<TouchableCell>
									<span style={{
										whiteSpace: "nowrap"
									}} title={rows[rowIndex].description}>
										{rows[rowIndex].description}
									</span>
									
								</TouchableCell>
							)}
							fixed={false}
							isResizable={true}
							width={this.state.columnWidth['description']}/>
						<Column
							columnKey="method"
							header={<Cell>Method</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<TouchableCell>
									{rows[rowIndex].method}
								</TouchableCell>
							)}
							fixed={false}
							isResizable={true}
							width={this.state.columnWidth['method']}/>
						<Column
							columnKey="created"
							header={<Cell>Created</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<TouchableCell>
									<span style={{
										whiteSpace: "nowrap"
									}}>{rows[rowIndex].created_at}</span>
								</TouchableCell>
							)}
							fixed={false}
							isResizable={true}
							width={this.state.columnWidth['created']}/>
						<Column
							columnKey="pipe"
							header={<Cell>Pipe</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<TouchableCell>
									<span style={{
										whiteSpace: "nowrap"
									}}>{rows[rowIndex].options.pipe ? 'true' : 'false'}</span>
								</TouchableCell>
							)}
							fixed={false}
							isResizable={true}
							width={this.state.columnWidth['pipe']}/>
						<Column
							columnKey="content_type"
							header={<Cell>Content-Type</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<TouchableCell>
									{rows[rowIndex].options.content_type}
								</TouchableCell>
							)}
							fixed={false}
							isResizable={true}
							width={this.state.columnWidth['content_type']}/>
						<Column
							columnKey="signature"
							header={<Cell>X-Hub-Signature</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<TouchableCell>
									{rows[rowIndex].options.x_hub_signature ? 'true' : 'false'}
								</TouchableCell>
							)}
							fixed={false}
							isResizable={true}
							width={this.state.columnWidth['signature']}/>
					</Table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ( state: any ) => {
	return {
		entries: getEntriesArrayFromObject( state )
	};
}

const mapDispatchToProps = ( dispatch: any ) => {
	return {
		entriesFetch: () => dispatch( entriesFetch() ),
		commandsFetch: ( snapshot?: string ) => dispatch( commandsFetch( snapshot ) )
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( Entries );