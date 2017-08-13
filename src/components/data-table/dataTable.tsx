import * as React from 'react';

import './dataTable.scss'
import DataTableNavigation from "./navigation/dataTableNavigation";

interface myProps{
	rowData:any,
	columnInfo: any,
	handleClick: any
	totalRows?: number,
	pages?: any[],


}

class DataTable extends React.Component<myProps, any>{
	constructor(props){
		super(props);

		this.state = {
			columnInfo: this.props.columnInfo,
			rowData: this.props.rowData,
			totalRows: 5,
			pages:[],
			currentPage: 0,
			activeDataRow: ''
		};

		// this.setPages = this.setPages.bind(this);
		// this.setPages();
		this.createHeaders = this.createHeaders.bind(this);
		this.createRows = this.createRows.bind(this);
		this.createRowData = this.createRowData.bind(this);
		this.onClick = this.onClick.bind(this);
		this.changeCurrentPage = this.changeCurrentPage.bind(this);
	}

	componentDidMount(){
		let innerCount = this.state.totalRows; //default at 5
		let totalPages = 1;
		let localPages:any[] = [];
		localPages[totalPages - 1] = [];
		this.state.rowData.map((dataObj, index) => {
			localPages[totalPages - 1].push(dataObj);
			if(index === innerCount - 1){
				innerCount += this.state.totalRows;
				totalPages++;
				localPages[totalPages - 1] = [];
			}
		});
		this.setState({pages: localPages});
	}

	createHeaders(){
		return this.state.columnInfo.map(column => <th key={column.header}>{column.header}</th>)
	}

	createRowData(rowObj){
		return this.state.columnInfo.map((column , value) =>{
			return <td  key={`${rowObj._id}${value}`}>{rowObj[column.property]}</td>
		})
	}

	changeCurrentPage(newPage: number | string){
		let currentPage = this.state.currentPage;

		if(typeof newPage === 'string'){
			if(newPage === 'next'){
				console.log("moving forward");
				currentPage += 1;
			} else if(newPage === 'prev'){
				console.log("moving back");
				currentPage -= 1;
			}
			if(currentPage >= 0 && currentPage < this.state.pages.length){
				this.setState({currentPage})
			} else {
				console.log("we blocked from loading a page outside of scope");
			}
		} else {
			this.setState({currentPage: newPage});
		}


	}

	onClick(dataObj, event){
		this.props.handleClick(dataObj);
		this.setState({activeDataRow: dataObj});
	}

	cyclePage(direction){
		console.log("in data table component and we're going:", direction);
	}

	createRows(){

		if(this.state.pages.length <= 0){
			return;
		}

		return this.state.pages[this.state.currentPage].map((rowObj, index) => {
			//TODO need to paginate this component by creating a prop that handles how many pages there should be per data table
			//TODO learn why passing a blank function worked instead of passing rowOBJ in the first parameter
			if(index > this.state.totalRows){
				console.log("we should have created another page!!!");
			}

			return (
				<tr className={rowObj._id  === this.state.activeDataRow._id  ? 'selected' : 'data-row'} key={rowObj._id} onClick={(event) => this.onClick(rowObj, event)}>
					{this.createRowData(rowObj)}
				</tr>
			)
		})
	}

	render(){

		return(
			<div>I'm the DataTable Component
				<table className="data-table">
					<tbody>
						<tr key="headers">
							{this.createHeaders()}
						</tr>
						{this.createRows()}
					</tbody>
				</table>
				<DataTableNavigation
					currentPage={this.state.currentPage}
					totalPages={this.state.pages.length}
					updatePage={this.changeCurrentPage}
				/>
			</div>
		)
	}
}

export default DataTable;