import ToDoItem from "./toDoItem.js";
import ToDoList from "./toDoList.js";

const myToDoList = new ToDoList();
const myToDoItem = new ToDoItem();



document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});

const updatePersistentData = (listArray)=>{
    localStorage.setItem("myToDoList", JSON.stringify(listArray));
};

const buildItem = (item) => {
    const div = document.createElement("div");
    //div.className = "item";
    div.className = "toDoItem"
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = item.getId();
    checkbox.className = "toDoItemCheckbox";
    addClickListenerToCheckbox(checkbox);
    const label = document.createElement("label");
    label.htmlFor = item.getId();
    label.textContent = item.getItem();
    label.className = "toDoItemLabel";
    div.appendChild(checkbox);
    div.appendChild(label);
    const container = document.getElementById("itemList");
    container.appendChild(div);
}


const renderList = () => {
    const list = myToDoList.getList();
    list.forEach((item) => {
        buildItem(item);
    });
}


const refreshThePage = () => {
    clearListDisplay();
    renderList();
    clearItemEntryField();
    setFocusOnItemEntry();
}

const clearItemEntryField = () => {
    document.getElementById("newItemEntry").value = "";
}

const setFocusOnItemEntry = () => {
    document.getElementById("newItemEntry").focus();
}

const deleteContents = (parentElement) => {
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
    clearItemEntryField();
    setFocusOnItemEntry();
}

const clearListDisplay = () => {
    const parent = document.getElementById("itemList");
    deleteContents(parent);
}

const processSubmission = () => {
    const newEntryText = getNewEntry();
    if (!newEntryText.length) return;
    const netxtItemId = getLastId();
    const toDoItem = createNewItem(netxtItemId, newEntryText);
    myToDoList.addItemToList(toDoItem);
    //Update persistant dta
    updatePersistentData(myToDoList.getList());
    refreshThePage();
}

const loadListObject = () =>{
    const storedList = localStorage.getItem("myToDoList");
    if(typeof storedList !== "string") return;
    const parsedList = JSON.parse(storedList);
    parsedList.forEach((item)=>{
        const newToDoItem = createNewItem(item._id,item._item);
        myToDoList.addItemToList(newToDoItem);
    });
}

const initApp = () => {
    //Add listeners
    const itemEntryForm = document.getElementById("itemEntryForm");
    itemEntryForm.addEventListener("submit", (event) => {
        event.preventDefault();
        processSubmission();
    })
    //procedural
    loadListObject();
    refreshThePage();
}

const clearItems = document.getElementById("clearList");
clearItems.addEventListener("click",(event)=>{
    const list = myToDoList.getList();
    if(list.length){
        const confirmed = confirm("Are you Sure you want to delete the entire to-do list?");
        if(confirmed){
            myToDoList.clearList();
            //Update persistant data
            updatePersistentData(myToDoList.getList());
            refreshThePage();
        }
    }
})


const addClickListenerToCheckbox = (checkbox) => {
    checkbox.addEventListener("click", (event) => {
        myToDoList.removeItemFromList(checkbox.id);
        //Remove  from persistant data
        updatePersistentData(myToDoList.getList());
        setTimeout(() => {
            refreshThePage();
        }, 100);
    });
};


const getNewEntry = () => {
    return document.getElementById("newItemEntry").value.trim();
}


// document.getElementById("toDoItemCheckbox").checked = function () {
//     document.getElementById("toDoItemCheckbox").g
// }

const getLastId = () => {
    let nextItemId = 1;
    const list = myToDoList.getList();
    if (list.length > 0) {
        nextItemId = list[list.length - 1].getId() + 1;
    }
    return nextItemId;
}


const createNewItem = (itemId,itemText) =>{
   const toDo = new ToDoItem();
   toDo.setId(itemId);
   toDo.setItem(itemText);
   return toDo;
}

// document.getElementById("addItem").onclick = function addNewItem() {
//     if (document.getElementById("newItemEntry").value.trim() == "") {
//         window.alert("Please provide name for new To Do Item !!")
//     } else {
//         myToDoItem.setId(getLastId());
//         myToDoItem.setItem(document.getElementById("newItemEntry").value)
//         myToDoList.addItemToList(myToDoItem);
//         const div = document.createElement("div")
//         div.className = "toDoItem"
//         const checkbox = document.createElement("input");
//         checkbox.className = "toDoItemCheckbox"
//         checkbox.type = "checkbox"
//         const label = document.createElement("label")
//         label.className = "toDoItemLabel"
//         label.textContent = document.getElementById("newItemEntry").value
//         div.appendChild(checkbox)
//         div.appendChild(label)
//         const newToDoList = document.getElementById("itemList")
//         newToDoList.appendChild(div)
//         console.log(myToDoList.length)
//     }
// }

// document.getElementById("clearList").onclick = function () {
//     const parent = document.getElementById("itemList");
//     deleteContents(parent);
// }
// function deleteContents(parentElement) {
//     let child = parentElement.lastElementChild;
//     while (child) {
//         parentElement.removeChild(child);
//         child = parentElement.lastElementChild;
//     }
//     document.getElementById("newItemEntry").value = "";
//     document.getElementById("newItemEntry").focus();
// }

// document.getElementById("toDoItemCheckbox").checked = function () {
//     document.getElementById("toDoItemCheckbox").g
// }