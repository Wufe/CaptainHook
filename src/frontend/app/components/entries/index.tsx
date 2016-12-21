/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {connect} from 'react-redux';
import {Component} from 'react';
import './style.scss';
import {entriesFetch} from '../../actions/entry';
import {Entries as EntriesState, State} from '../../states';
import {EntryItem, getEntriesArrayFromObject} from '../../selectors';
import {Loading} from '../../hoc';
const FixedDataTable = require( 'fixed-data-table' );
const {Table, Column, Cell} = FixedDataTable;
import '../../../../../node_modules/fixed-data-table/dist/fixed-data-table.css';

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
}

type Props = EntriesProps & ActionProps & StateProps;

class Entries extends Component<Props, any>{

	// getDefaultProps(){
	// 	return {
	// 		entries: {}
	// 	}
	// }

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
				pipe: 50,
				content_type: 110,
				signature: 140
			},
			widthSum: 1050
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
		this.props.entriesFetch();
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
		const rows: any[] = [];
		for( let id in this.props.entries ){
			rows.push(Object.assign({}, {
				id
			}, this.props.entries[ id ] ) );
		}
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
						headerHeight={37}>
						<Column
							columnKey="id"
							header={<Cell>ID</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<Cell>
									{rows[rowIndex].id}
								</Cell>
							)}
							width={this.state.columnWidth['id']}
							fixed={true}/>
						<Column
							columnKey="name"
							header={<Cell>Name</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<Cell>
									<span title={rows[rowIndex].name}>
										{rows[rowIndex].name}
									</span>
								</Cell>
							)}
							fixed={false}
							isResizable={true}
							width={this.state.columnWidth['name']}/>
						<Column
							columnKey="uri"
							header={<Cell>URI</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<Cell>
									<span title={rows[rowIndex].uri}>
										{rows[rowIndex].uri}
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
									}} title={rows[rowIndex].description}>
										{rows[rowIndex].description}
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
									{rows[rowIndex].method}
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
									{rows[rowIndex].created_at}
								</Cell>
							)}
							fixed={false}
							isResizable={true}
							width={this.state.columnWidth['created']}/>
						<Column
							columnKey="pipe"
							header={<Cell>Pipe</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<Cell>
									{rows[rowIndex].options.pipe ? 'true' : 'false'}
								</Cell>
							)}
							fixed={false}
							isResizable={true}
							width={this.state.columnWidth['pipe']}/>
						<Column
							columnKey="content-type"
							header={<Cell>Content-Type</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<Cell>
									{rows[rowIndex].options.content_type}
								</Cell>
							)}
							fixed={false}
							isResizable={true}
							width={this.state.columnWidth['content_type']}/>
						<Column
							columnKey="x-hub-signature"
							header={<Cell>X-Hub-Signature</Cell>}
							cell={({rowIndex}: {rowIndex: number}) => (
								<Cell>
									{rows[rowIndex].options.x_hub_signature ? 'true' : 'false'}
								</Cell>
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
		entriesFetch: () => dispatch( entriesFetch() )
	}
}

//export default connect( mapStateToProps, mapDispatchToProps )( Entries );
export default Loading<any>( ( state: State ) => state.entries, ( dispatch: any ) => dispatch( entriesFetch() ) )( connect( mapStateToProps, mapDispatchToProps )( Entries ) );