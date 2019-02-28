export function loadData() {
    return { type: 'LOAD_DATA' };
}

export function addData() {
    return { type: 'ADD_DATA' };
}

export function updateData(row: number, value: string) {
    const result = {
        type: 'UPDATE_DATA',
        row,
        value
    }
    console.log('action updateData:', result);
    return result;
}

