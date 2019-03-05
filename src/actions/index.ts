

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

export function updateData(id: string, name: string) {
    const result = {
        type: 'UPDATE_DATA',
        id,
        name
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
