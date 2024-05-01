"use strict";
const loginUserName = document.querySelector(".name");
const inputFormBtn = document.querySelector("#add");
const inputForm = document.querySelector(".inputForm");
const submitBtn = document.querySelector("#submit");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const displayArea = document.querySelector(".tableData");
const updateForm = document.querySelector(".updateDataArea");
const updateTitle = document.querySelector("#updateInput");
const updateDes = document.querySelector("#updateDis");
const updateBtn = document.querySelector("#update");
const completeBtn = document.querySelector("#btnComplete");
const completeList = document.querySelector(".completeList");
const displayCompleteList = document.querySelector("#complete");
const logOut = document.querySelector("#logOut");
const serach = document.querySelector("#searchInput");
const loader = document.querySelector('.loader');
const notification = document.querySelector('.notification');
const closeCompleteAre = document.querySelector(".closeBtn");
//log out btn
logOut.addEventListener("click", () => {
    sessionStorage.removeItem("loginUser");
    alert("you are logout!!!");
    location.reload();
});
//close the completeTable area 
closeCompleteAre.addEventListener("click", () => {
    completeList.classList.remove('block');
});
// get data from localstroage
function getTodoData(storage) {
    return JSON.parse(localStorage.getItem(`${storage}`) || "[]");
}
// get user name
const userName = JSON.parse(sessionStorage.getItem("loginUser") || "");
if (userName != null) {
    loginUserName.textContent = userName[0].toUpperCase() + userName.slice(1);
}
// open and close input form
inputFormBtn.addEventListener("click", () => {
    inputForm.classList.toggle("block");
});
// add todo on localstorage
submitBtn.addEventListener("click", () => {
    const userTitle = title.value;
    const userDescription = description.value;
    const userTodo = getTodoData('todoData');
    let color = bgColor();
    // check all fildes are fill or not
    let date = new Date();
    let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    if (userTitle != "" && userDescription != "") {
        const newTodo = {
            userName: userName,
            title: (userTitle[0].toUpperCase() + userTitle.slice(1)),
            description: userDescription,
            color: color,
            date: date.toLocaleDateString(),
            time: time
        };
        userTodo.push(newTodo);
        localStorage.setItem("todoData", JSON.stringify(userTodo));
        title.value = "";
        description.value = "";
        inputForm.classList.remove("block");
        loader.style.display = 'block';
        setTimeout(() => {
            loader.style.display = 'none';
            printTodo();
        }, 500);
    }
    else {
        alert("please fill all fildes!!!");
    }
});
// dispaly user todo
function printTodo(serchVal = "") {
    let userData = getTodoData('todoData');
    let display = "";
    if (serach.value != '') {
        let filterData = userData.filter((ele) => ele.title.toLowerCase().includes(serchVal.toLowerCase()));
        userData = filterData;
    }
    if (userData.length > 0) {
        userData.forEach((ele, index) => {
            if (ele.userName === userName) {
                display += `
            <div class="box"id="box${index}" style="background-color:${ele.color} ;">
            <h2>${ele.title}</h2>
            <div  class='date'>
            <input type="checkbox" class="complete" onchange="completeTask(${index})"/>
            <p class="createData">Created: <span>${ele.date} ${ele.time}</span></p>
            </div>
          <div class="info"> 
        <div id="todoDesc">${ele.description}</div>
        </div>
        <div class="button">
        <button class="btn btn-primary"  onclick="updateData(${index})">Edit</button>
        <button class="btn btn-danger"  onclick="deleteData(${index})">Delete</button>
        
        </div> 
    </div>
    `;
            }
        });
        displayArea.innerHTML = display;
    }
    else {
        displayArea.innerHTML = 'No data Found';
        displayArea.style.color = 'white';
    }
}
setTimeout(() => {
    loader.style.display = 'none';
    printTodo();
}, 1000);
//delete Todo
function deleteData(index) {
    let todoData = getTodoData('todoData');
    todoData.splice(index, 1);
    localStorage.setItem("todoData", JSON.stringify(todoData));
    printTodo();
}
//update Data
function updateData(index) {
    updateForm.style.display = "block";
    let boxId = document.getElementById(`box${index}`);
    boxId.style.visibility = "hidden";
    let todoData = getTodoData('todoData');
    let todo = todoData[index];
    updateTitle.value = todo.title;
    updateDes.value = todo.description;
    let date = new Date();
    let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    updateBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        todoData[index].title = updateTitle.value;
        todoData[index].description = updateDes.value;
        todoData[index].date = date.toLocaleDateString();
        todoData[index].time = time;
        localStorage.setItem("todoData", JSON.stringify(todoData));
        printTodo();
        updateForm.style.display = "none";
        boxId.style.display = "block";
    });
}
//complete todo
function completeTask(id) {
    let todoData = getTodoData('todoData');
    notification.classList.add('block');
    let completeDataArr = getTodoData('completeTodo');
    completeDataArr.push(todoData[id]);
    localStorage.setItem("completeTodo", JSON.stringify(completeDataArr));
    todoData.splice(id, 1);
    localStorage.setItem("todoData", JSON.stringify(todoData));
    printTodo();
}
//open or close complete todo area
completeBtn.addEventListener("click", () => {
    completeList.classList.toggle("block");
    notification.classList.remove('block');
    printCompleteTodo();
});
//display complete todos
function printCompleteTodo() {
    let completeTodo = getTodoData('completeTodo');
    let displayCompleteData = "";
    let count = 1;
    // display complete todo
    completeTodo.forEach((ele, index) => {
        if (ele.userName == userName) {
            displayCompleteData += `
        <tr >
          <td><input type="checkbox" checked onchange='unCompleteTask(${index})' /></td>
          <td>${count}</td>
          <td>${ele.title}</td>
          <td>${ele.description}</td>
          <td><button onclick="deleteCompleteData(${index})" class="btn btn-danger">Delete</button></td>
        </tr>
      `;
            count++;
        }
    });
    displayCompleteList.innerHTML = displayCompleteData;
}
printCompleteTodo();
//delete complete todo
function deleteCompleteData(id) {
    let completeTodo = getTodoData('completeTodo');
    completeTodo.splice(id, 1);
    localStorage.setItem("completeTodo", JSON.stringify(completeTodo));
    printCompleteTodo();
}
//do complete task to uncomplete task
function unCompleteTask(id) {
    let completeTodo = getTodoData('completeTodo');
    let todoData = getTodoData('todoData');
    todoData.push(completeTodo[id]);
    localStorage.setItem("todoData", JSON.stringify(todoData));
    deleteCompleteData(id);
    printTodo();
}
//search todo
serach.addEventListener("keyup", () => {
    let searchValue = serach.value;
    loader.style.display = 'block';
    setTimeout(() => {
        loader.style.display = 'none';
        printTodo(searchValue);
    }, 500);
});
// get rendom color
function bgColor() {
    let color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)},0.5)`;
    return color;
}
