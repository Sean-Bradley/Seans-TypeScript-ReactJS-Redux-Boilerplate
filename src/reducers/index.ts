import { combineReducers } from 'redux';
import CatsController from '../controllers/Cat'

const catsController: CatsController = new CatsController();

const data = (state: any[] = [], action: any) => {
    switch (action.type) {
        case 'DELETE_DATA':
            return Object.values(catsController.deleteData(action.id))
        case 'ADD_NEW_DATA':
            const newDataResult = [
                ...state,
                catsController.addNewData(action.name)
            ];
            return newDataResult
        case 'UPDATE_DATA':
            return Object.values(catsController.updateData(action.id, action.name))
        case 'GET_ALL_DATA':
            const data = catsController.getAllData();
            Object.keys(data).forEach((key: string) => {
                data[key].id = key
            })
            return Object.values(data)
        default:
            return state
    }
}

const pageSize = (state: number = 10, action: any) => {
    switch (action.type) {
        case 'CHANGE_PAGE_SIZE':
            return action.size
        default:
            return state
    }
}

export default combineReducers({
    data,
    pageSize,
});