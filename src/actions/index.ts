

export function getAllData() {
    return { type: 'GET_ALL_DATA' }
}

export function addNewData(name: string) {
    const result = {
        type: 'ADD_NEW_DATA',
        name
    }
    return result
}

export function updateData(row: number, value: string) {
    const result = {
        type: 'UPDATE_DATA',
        row,
        value
    }
    return result
}

export function deleteData(id: string) {
    const result = {
        type: 'DELETE_DATA',
        id
    }
    return result
}
