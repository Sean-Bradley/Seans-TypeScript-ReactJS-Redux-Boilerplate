import Cat from '../models/cat.js'
import { v4 as uuid } from 'uuid'

class CatController {
    private cats: { [id: string]: Cat; } = {}

    constructor() {
        //persisted in memory for quick setup and demopnstartion. use any persistence model you want, you ahve total freedom to decide. all your api connectivity should be in this file 
        this.cats[uuid()] = { id: null, genus: "feline", name: "Cosmo", isHungry: true, lastFedDate: new Date().toUTCString() }
        this.cats[uuid()] = { id: null, genus: "feline", name: "Emmy", isHungry: true, lastFedDate: new Date().toUTCString() }
    }

    public getAllData(): any {
        return this.cats
    }

    public addNewData(name: string): Cat {
        const newUuid = uuid()
        this.cats[newUuid] = { id: newUuid, genus: "feline", name: name, isHungry: true, lastFedDate: new Date().toUTCString() }
        return this.cats[newUuid]
    }

    public updateData(id: string, name: string) {
        if (!!this.cats[id]) {
            this.cats[id].name = name
        }
        return this.cats
    }

    public deleteData(id: string): any {
        delete this.cats[id]
        return this.cats
    }

}
export default CatController