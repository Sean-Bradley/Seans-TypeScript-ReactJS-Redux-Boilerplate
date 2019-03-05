import { combineReducers } from 'redux';
import Cat from '../models/Cat'
import CatsController from '../controllers/Cat'

const catsController: CatsController = new CatsController();

const data = (state: any[] = [], action: any) => {
    switch (action.type) {
        case 'POST_NEW_DATA':
            return [
                ...state,
                { id: state.length + 1, name: (new Date()).toString() }
            ];
        case 'UPDATE_DATA':
            //console.log('UPDATE_DATA:', action);
            const result = [
                ...state,
            ];
            result[action.row].name = `${action.value} ${(new Date()).toString()}`;
            return result;
        case 'GET_ALL_DATA':
            const data = catsController.getAllData();
            Object.keys(data).forEach((key: string) => {
                data[key].id = key
            })
            return Object.values(data) // catsController.getAllData();
        default:
            return state;
    }
}

const pageSize = (state: number = 10, action: any) => {
    switch (action.type) {
        case 'CHANGE_PAGE_SIZE':
            return action.size;
        default:
            return state;
    }
}

export default combineReducers({
    data,
    pageSize,
});