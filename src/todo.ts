const loginUserName = document.querySelector(".name") as HTMLParagraphElement;
const inputFormBtn = document.querySelector("#add") as HTMLButtonElement;
const inputForm = document.querySelector(".inputForm") as HTMLDivElement;
const submitBtn = document.querySelector("#submit") as HTMLButtonElement;
const title = document.querySelector("#title") as HTMLInputElement;
const description = document.querySelector("#description") as HTMLTextAreaElement;
const displayArea = document.querySelector(".tableData") as HTMLDivElement;
const updateForm = document.querySelector(".updateDataArea") as HTMLDivElement;
const updateTitle = document.querySelector("#updateInput") as HTMLInputElement;
const updateDes = document.querySelector("#updateDis") as HTMLTextAreaElement;
const updateBtn = document.querySelector("#update") as HTMLButtonElement;
const completeBtn = document.querySelector("#btnComplete") as HTMLButtonElement;
const completeList = document.querySelector(".completeList") as HTMLDivElement;
const displayCompleteList = document.querySelector("#complete") as HTMLTableElement;
const logOut = document.querySelector("#logOut") as HTMLButtonElement;
const serach = document.querySelector("#searchInput") as HTMLInputElement;
const loader = document.querySelector('.loader')  as HTMLDivElement;
const notification = document.querySelector('.notification') as HTMLDivElement;
const closeCompleteAre = document.querySelector(".closeBtn") as HTMLDivElement;


//todo interfase
interface userTodoData {
  userName: string | null;
  title: string;
  description: string;
  color: string;
  date: string;
  time: string;
}

//log out btn
logOut.addEventListener("click", ():void => {
  sessionStorage.removeItem("loginUser");
  location.reload();
});

//close the completeTable area 
closeCompleteAre.addEventListener("click",():void =>{
  completeList.classList.remove('block');
})
// get data from localstroage
function getTodoData(storage:string): userTodoData[] {
  return JSON.parse(localStorage.getItem(`${storage}`) || "[]");
}

// get user name
const userName: string | null = JSON.parse(sessionStorage.getItem("loginUser") || "");

if (userName != null) {
  loginUserName.textContent = userName[0].toUpperCase() + userName.slice(1);
}

// open and close input form
inputFormBtn.addEventListener("click", (): void => {
  inputForm.classList.toggle("block");
});

// add todo on localstorage
submitBtn.addEventListener("click", (): void => {
  const userTitle: string = title.value;
  const userDescription: string = description.value;

  const userTodo: userTodoData[] = getTodoData('todoData');
  let color: string = bgColor();
  // check all fildes are fill or not
  let date = new Date();
  let time = date.getHours()+":"+ date.getMinutes()+":" + date.getSeconds();
  if (userTitle != "" && userDescription != "") {
    const newTodo: userTodoData = {
      userName: userName,
      title: (userTitle[0].toUpperCase() + userTitle.slice(1)),
      description: userDescription,
      color: color,
      date: date.toLocaleDateString(),
      time : time
    };

    userTodo.push(newTodo);
    localStorage.setItem("todoData", JSON.stringify(userTodo));
    title.value = "";
    description.value = "";
    inputForm.classList.remove("block");
    loader.style.display = 'block';
    setTimeout(()=>{
      loader.style.display = 'none';
      printTodo();
    },500);
  } else {
    alert("please fill all fildes!!!");
  }
});

// dispaly user todo
function printTodo(serchVal: string = "") {
  let userData:userTodoData[] = getTodoData('todoData');
  let display: string = "";
  
  if(serach.value != '') {
    let filterData:userTodoData[] = userData.filter((ele)=> ele.title.toLowerCase().includes(serchVal.toLowerCase()))
    userData = filterData;
  }
  if(userData.length > 0) {
  userData.forEach((ele: userTodoData, index: number) => {
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
}else {
  displayArea.innerHTML = 'No data Found';
  displayArea.style.color = 'white';
}
}
setTimeout(():void=>{
  loader.style.display = 'none';
  printTodo();
},1000);

//delete Todo
function deleteData(index: number) {
  let todoData:userTodoData[] = getTodoData('todoData');
  todoData.splice(index, 1);
  localStorage.setItem("todoData", JSON.stringify(todoData));
  printTodo();
}

//update Data
function updateData(index: number): void {
  updateForm.style.display = "block";

  let boxId = document.getElementById(`box${index}`) as HTMLDivElement;
  boxId.style.visibility = "hidden";
  let todoData: userTodoData[] = getTodoData('todoData');
  let todo: userTodoData = todoData[index];
  updateTitle.value = todo.title;
  updateDes.value = todo.description;
  let date = new Date();
  let time = date.getHours()+":"+ date.getMinutes()+":" + date.getSeconds();
  updateBtn.addEventListener("click", (e): void => {
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
function completeTask(id: number) {
  let todoData:userTodoData[] = getTodoData('todoData');
  notification.classList.add('block');
  let completeDataArr:userTodoData[] = getTodoData('completeTodo');
  completeDataArr.push(todoData[id]);
  localStorage.setItem("completeTodo", JSON.stringify(completeDataArr));
  todoData.splice(id, 1);
  localStorage.setItem("todoData", JSON.stringify(todoData));
  printTodo();
}

//open or close complete todo area
completeBtn.addEventListener("click", (): void => {
  completeList.classList.toggle("block");
  notification.classList.remove('block');
  printCompleteTodo();
});

//display complete todos
function printCompleteTodo() {
 
  let completeTodo: userTodoData[] = getTodoData('completeTodo');
  let displayCompleteData: string = "";
  let count: number = 1;
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
function deleteCompleteData(id: number) {
  let completeTodo: userTodoData[] =getTodoData('completeTodo');
  completeTodo.splice(id, 1);
  localStorage.setItem("completeTodo", JSON.stringify(completeTodo));
  printCompleteTodo();
}

//do complete task to uncomplete task
function unCompleteTask(id: number) {
  let completeTodo: userTodoData[] = getTodoData('completeTodo');
  let todoData: userTodoData[] = getTodoData('todoData');

  todoData.push(completeTodo[id]);
  localStorage.setItem("todoData", JSON.stringify(todoData));
  deleteCompleteData(id);
  printTodo();
}

//search todo
serach.addEventListener("keyup", (): void => {
  let searchValue: string = serach.value;
  loader.style.display = 'block';
  setTimeout(():void =>{
    loader.style.display = 'none';
    printTodo(searchValue);
  },500);
});

// get rendom color
function bgColor(): string {
  let color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)},0.5)`;
  return color;
}
