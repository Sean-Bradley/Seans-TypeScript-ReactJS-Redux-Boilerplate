

export function getAllData() {
    return { type: 'GET_ALL_DATA' };
}

export function postNewData() {
    return { type: 'POST_NEW_DATA' };
}

export function updateData(row: number, value: string) {
    const result = {
        type: 'UPDATE_DATA',
        row,
        value
    }
    //console.log('action updateData:', result);
    return result;
}

