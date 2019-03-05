import * as React from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getAllData, postNewData, updateData } from './../actions';
import Cat from '../models/Cat'
import { number, bool } from 'prop-types';

interface IProps {
    data: any[]
    loadData(): object
    addData(): object
    updateData(row: number, value: string): object
}
interface IState {
    data: any[]
    editingId: any
    columns: any[]
    addButtonEnabled: Boolean

}

class Cats extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            data: [],
            editingId: {},
            // catName: "",
            addButtonEnabled: false,
            // lastFedDate: new Date(),
            columns: [{
                Header: 'Id',
                accessor: 'id'
            }, {
                Header: 'Name',
                accessor: 'name'
            }, {
                Header: 'Genus',
                accessor: 'genus'
            }, {
                Header: 'Last Fed',
                accessor: 'lastFedDate'
            }, {
                id: 'edit',
                accessor: 'id',
                Cell: (row: any) => (
                    !!this.state.editingId[row.original.id] ?
                        <div>
                            <button id={"saveButton_" + row.original._id} className="btn btn-warning" onClick={(e) => this.handleSaveEdit(row.original._id)}>Save</button>&nbsp;
                                 <button id={"cancelButton_" + row.original._id} className="btn btn-secondary" onClick={(e) => this.handleCancelEdit(row.original._id)}>Cancel</button>
                        </div>
                        :
                        <button id={"editButton_" + row.original._id} className="btn btn-success" onClick={(e) => this.handleEditClick(e, row.value)}>Edit</button>
                )
            }, {
                id: 'delete',
                accessor: 'id',
                Cell: ((value: any) => <button className="btn btn-danger" onClick={(e) => this.handleDeleteClick(e, value)}>Delete</button>)
            }]
        }
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleCancelEdit = this.handleCancelEdit.bind(this);
        this.handleSaveEdit = this.handleSaveEdit.bind(this);
    }
    componentDidMount() {
        this.props.loadData();
    }
    updateData = () => {
        const dataLength = this.props.data.length;
        this.props.updateData(dataLength - 1, 'Updated');
    }
    handleDeleteClick(e: any, id: any) {
        console.log("in handleDeleteClick " + id.value)
    }
    handleEditClick(e: any, id: any) {
        console.log("in handleEditClick " + id.value)
    }
    handleSaveEdit(id: any) {
        console.log("in handleSaveEdit " + id.value)
        //const name = document.getElementById("input_" + id).value;
        //save data
        //then refresh data
    }

    handleCancelEdit(id: any) {
        console.log("in handleCancelEdit " + id.value)
        // const editingId = this.state.editingId;
        // editingId[id] = false;
        // this.setState({
        //     editingId,
        // });
    }
    handleAddClick() {
        console.log("in handleAddClick")
        // fetch('/api/cats', {
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'Cache-Control': 'no-cache'
        //     },
        //     body: "name=" + this.state.catName
        // }).then(() => {
        //     this.refreshTableData();
        //     this.setState({ catName: '' });
        // })
    };
    render() {
        let addCatOptions;
        if (this.state.addButtonEnabled) {
            addCatOptions = <button onClick={this.handleAddClick} className="btn btn-primary">Add Cat</button>
        } else {
            addCatOptions = <button disabled className="btn btn-primary disabled">Add Cat</button>
        }
        return (
            <div className="container">
                {/* {this.state.data.map(cat => <Cat key={cat.id} {...cat} />)} */}

                <div className="form-group form-inline">
                    <div>
                        <label htmlFor="catName">Cat Name:</label>
                        {/* <input type="text" name="catName" className="form-control" value={this.state.catName} onChange={this.handleAddChange} placeholder="Cat Name" />
                        {addCatOptions} */}
                        <button onClick={() => this.props.addData()}>Add Record</button>
                        <button onClick={this.updateData}>Update Last Record</button>
                    </div>
                </div>

                {<ReactTable
                    data={this.props.data}
                    columns={this.state.columns}
                    defaultPageSize={5}
                    className="-striped -highlight"
                    onFetchData={(state, instance) => {
                        console.log("in onFetchData");
                        //console.log(instance)
                        //this.setState({ loading: true }, this.refreshTableData())
                    }}
                />}
                <hr />
            </div >
        )
    }
}

function mapStateToProps(state: IState) {
    return {
        data: state.data
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadData: () => {
        dispatch(getAllData());
    },
    addData: () => {
        dispatch(postNewData());
    },
    updateData: (row: number, value: string) => {
        dispatch(updateData(row, value));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cats)