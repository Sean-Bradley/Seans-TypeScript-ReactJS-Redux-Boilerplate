import * as React from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { loadData, addData, updateData } from './../actions';

interface IProps {
    data: any[]
    loadData(): object
    addData(): object
    updateData(row: number, value: string): object
}
interface IState {
    data: any[]
    editingId: {},
    columns: any[]
}

class Cats extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            data: [],//{ id: 1, name: 'ssssadd' }, { id: 2, name: 'Mufasa' }],
            editingId: {},
            // catName: "",
            // addButtonEnabled: false,
            // lastFedDate: new Date(),
            columns: [{
                Header: 'Id',
                accessor: 'id'
            }, {
                Header: 'Name',
                accessor: 'name'
            }]//,// {
        }
    }
    componentDidMount() {
        this.props.loadData();
    }
    updateData = () => {
        const dataLength = this.props.data.length;
        console.log('CustomTable:', { dataLength });
        this.props.updateData(dataLength - 1, 'Updated');
    }
    render() {
        let addCatOptions;
        // if (this.state.addButtonEnabled) {
        //     addCatOptions = <button onClick={this.handleAddClick} className="btn btn-primary">Add Cat</button>
        // } else {
        //     addCatOptions = <button disabled className="btn btn-primary disabled">Add Cat</button>
        // }
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
    //console.log("in mapStateToProps")
    //console.dir(state);
    return {
        data: state.data,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadData: () => {
        dispatch(loadData());
    },
    addData: () => {
        dispatch(addData());
    },
    updateData: (row: number, value: string) => {
        dispatch(updateData(row, value));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cats)