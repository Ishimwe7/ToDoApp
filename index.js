// const addItem = document.getElementById("addItem");
// addItem.addEventListener("click", function(){
//     const div =document.createElement("div")
//     div.className="toDoItem"
//     const checkbox = document.createElement("input");
//     checkbox.className="toDoItemCheckbox"
//     checkbox.type="checkbox"
//     const label = document.createElement("label")
//     label.className="toDoItemLabel"
//     label.textContent=document.getElementById("newItemEntry").value
//     div.appendChild(checkbox)
//     div.appendChild(label)
//     const toDoList = document.getElementById("itemList")
//     toDoList.appendChild(div)
// })

// console.log(document.getElementById("cleareList").textContent)
// document.getElementById("clearList").textContent="Hello Einstein"
// console.log("Hello World")
class toDoItem{
    constructor(){
        
    }
}

function addNewItem(){
    if(document.getElementById("newItemEntry").value.trim() ==""){
       window.alert("Please provide name for new To Do Item !!")
    }else{
        const div =document.createElement("div")
        div.className="toDoItem"
        const checkbox = document.createElement("input");
        checkbox.className="toDoItemCheckbox"
        checkbox.type="checkbox"
        const label = document.createElement("label")
        label.className="toDoItemLabel"
        label.textContent=document.getElementById("newItemEntry").value
        div.appendChild(checkbox)
        div.appendChild(label)
        const toDoList = document.getElementById("itemList")
        toDoList.appendChild(div)
       // console.log(toDoList.length())
    }
    document.getElementById("newItemEntry").value=""
    document.getElementById("newItemEntry").focus()
    
}


clear = () => {

}