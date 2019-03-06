import * as React from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getAllData, addNewData, updateData, deleteData } from './../actions';

interface IProps {
    data: any[]
    loadData(): object
    addData(name: string): object
    updateData(id: string, name: string): object
    deleteData(id: string): object
}
interface IState {
    data: any[]
    editingId: any
    columns: any[]
    addButtonEnabled: Boolean
    catName: ""
    //lastFedDate: Date
}

class Cats extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            data: [],
            editingId: {},
            catName: "",
            addButtonEnabled: false,
            //lastFedDate: new Date(),
            columns: [{
                Header: 'Isadd',
                accessor: 'id'
            }, {
                Header: 'Name',
                accessor: 'id',
                Cell: (row: any) => (
                    !!this.state.editingId[row.original.id] ?
                        <input id={"input_" + row.original.id} type="text" defaultValue={row.original.name} placeholder="Cat Name" />
                        :
                        <span id={"name_" + row.original.id}>{row.original.name}</span>
                )
            }, {
                Header: 'Genus',
                accessor: 'genus'
            }, {
                Header: () => (
                    <div style={{ textAlign: "left" }}>Last Fed Date</div>
                ),
                //id: 'lastFedDate',
                accessor: 'lastFedDate'
                // Cell: (row: any) => (
                //     !!this.state.editingId[row.original.id] ?
                //         <DatePicker id={"lastFedDate_" + row.original.id} selected={new Date(parseInt(row.original.lastFedDate))} onChange={(e) => this.handleLastFedDateChange(e, row.original.id)} />
                //         :
                //         (new Date(parseInt(row.original.lastFedDate)).toDateString())
                // )
            }, {
                id: 'edit',
                accessor: 'id',
                Cell: (row: any) => (
                    !!this.state.editingId[row.original.id] ?
                        <div>
                            <button id={"saveButton_" + row.original.id} className="btn btn-warning" onClick={(e) => this.handleSaveEdit(row.original.id)}>Save</button>&nbsp;
                                 <button id={"cancelButton_" + row.original.id} className="btn btn-secondary" onClick={(e) => this.handleCancelEdit(row.original.id)}>Cancel</button>
                        </div>
                        :
                        <button id={"editButton_" + row.original.id} className="btn btn-success" onClick={(e) => this.handleEditClick(e, row.value)}>Edit</button>
                )
            }, {
                id: 'delete',
                accessor: 'id',
                Cell: ((row: any) => <button className="btn btn-danger" onClick={(e) => this.handleDeleteClick(e, row.value)}>Delete</button>)
            }]
        }
    }
    componentDidMount() {
        this.props.loadData();
    }
    // handleLastFedDateChange = (date: Date, id: string): void => {
    //     console.log(date.toUTCString())
    //     console.log(id)
    //     // const data = this.state.data;
    //     // data.forEach(function (row) {
    //     //     if (row.id === id) {
    //     //         row.lastFedDate = new Date(date).getTime().toString();
    //     //     }
    //     // })
    //     // this.setState({
    //     //     data: data
    //     // });
    // }
    handleEditClick = (e: any, id: any) => {
        const editingId = this.state.editingId;
        editingId[id] = true;
        this.setState({
            editingId,
        });
    }
    handleSaveEdit = (id: any): void => {
        const inputEl: any = document.getElementById("input_" + id);
        const name = inputEl.value;
        this.props.updateData(id, name);
        const editingId = this.state.editingId;
        editingId[id] = false;
        this.setState({ editingId: editingId });
    }
    handleCancelEdit = (id: any): void => {
        const editingId = this.state.editingId;
        editingId[id] = false;
        this.setState({
            editingId,
        });
    }
    handleDeleteClick = (e: any, id: any): void => {
        this.props.deleteData(id)
    }
    handleAddClick = (): void => {
        this.props.addData(this.state.catName)
        this.setState((current) => ({ ...current, catName: '' }), () => { this.props.loadData })
    };
    handleAddChange = (e: any): void => {
        const newCatName = e.target.value;
        let enabled = newCatName.length >= 2 && newCatName.length <= 20;
        this.setState((current) => ({ ...current, catName: newCatName, addButtonEnabled: enabled }))
    }
    render() {
        let addCatOptions;
        if (this.state.addButtonEnabled) {
            addCatOptions = <button onClick={this.handleAddClick} className="btn btn-primary">Add Cat</button>
        } else {
            addCatOptions = <button disabled className="btn btn-primary disabled">Add Cat</button>
        }
        return (
            <div className="container">
                <div className="form-group form-inline">
                    <div>
                        <label htmlFor="catName">Cat Name:</label>
                        <input type="text" name="catName" className="form-control" value={this.state.catName} onChange={this.handleAddChange} placeholder="Cat Name" />
                        {addCatOptions}
                    </div>
                </div>

                {<ReactTable
                    data={this.props.data}
                    columns={this.state.columns}
                    defaultPageSize={5}
                    className="-striped -highlight"
                    onFetchData={(state, instance) => {
                        //console.log("in onFetchData");
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
        dispatch(getAllData())
    },
    addData: (name: string) => {
        dispatch(addNewData(name))
    },
    updateData: (id: string, name: string) => {
        dispatch(updateData(id, name))
    },
    deleteData: (id: string) => {
        dispatch(deleteData(id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cats)