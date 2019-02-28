import { combineReducers } from 'redux';

const data = (state: any[] = [], action: any) => {
    switch (action.type) {
        case 'ADD_DATA':
            return [
                ...state,
                { id: state.length + 1, name: (new Date()).toString() }
            ];
        case 'UPDATE_DATA':
            console.log('UPDATE_DATA:', action);
            const result = [
                ...state,
            ];
            result[action.row].name = `${action.value} ${(new Date()).toString()}`;
            return result;
            break;
        case 'LOAD_DATA':
            return [
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' }
            ];
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