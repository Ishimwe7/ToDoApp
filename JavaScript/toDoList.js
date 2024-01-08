export default class ToDoList{
    constructor(){
        this._list=[]
    }
    getList(){
        return this._list
    }

    addItemToList(item){
        this._list.push(item)
    }

    clearList(){
        this._list=[]
    }

    removeItemFromList(itemId){
        const list = this._list;
        for(let i=0;i<list.length;i++){
            if(list[i]._id==itemId){
                list.splice(i,1);
            }
        }
    }
}