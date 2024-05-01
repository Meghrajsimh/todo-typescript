const registerTitle = document.getElementById("reg") as HTMLHeadingElement;
const registerForm = document.querySelector(".registerForm") as HTMLDivElement;
const loginForm = document.querySelector(".loginForm") as HTMLDivElement;
const inputOne = document.getElementById("inputOne") as HTMLInputElement;
const inputTwo = document.getElementById("inputTwo") as HTMLInputElement;
const loginBtn = document.getElementById("submit") as HTMLButtonElement;
const registeBtn = document.getElementById("rsubmit") as HTMLButtonElement;
const rinputOne = document.getElementById("rinputOne") as HTMLInputElement;
const rinputTwo = document.getElementById("rinputTwo") as HTMLInputElement;
const registerLink = document.querySelector(".registe") as HTMLDivElement;


//open registe page
registerLink.addEventListener('click',():void =>{
   registerForm.classList.add('block');
   loginForm.classList.add("none");
})


interface User {
  userName: string;
  userPass: string;
}

// open login form
registerTitle.addEventListener("click", (): void => {
  registerForm.classList.remove("block");
  loginForm.classList.remove("none");
});

// create user
registeBtn.addEventListener("click", (): void => {
  const userEmail: string = rinputOne.value;
  const userPass: string = rinputTwo.value;
  const userData:User[] = JSON.parse(localStorage.getItem("user") || "[]")
  if (userEmail.includes("@") && userPass.length > 7) {
    const obj: User = {
      userName: userEmail,
      userPass: userPass,
    };
    userData.push(obj);
    const json: string = JSON.stringify(userData);
    localStorage.setItem("user", json);
    alert("User created");
    location.reload();
  } else {
    alert("Invalid email or password");
  }
});


// check user is vaild or not and login
loginBtn.addEventListener("click", (e): void => {
  e.preventDefault();
  let userEmail: string = inputOne.value;
  let userPass: string = inputTwo.value;
  const regUserData: User[] = JSON.parse(localStorage.getItem("user") || "[]");
  console.log(regUserData);
  let findUser: User[] = regUserData.filter(
    (ele) =>
      (userEmail === ele.userName || ele.userName.split('@')[0] == userEmail) && userPass === ele.userPass
  );

  if (findUser.length > 0 && userPass.length > 7) {
    sessionStorage.setItem("loginUser", JSON.stringify(userEmail.split("@")[0]));
    alert("Login successful");
    location.href = "../html/todo.html";
  } else {
    alert("Invalid email or password");
  }
});

document.querySelector('a')?.addEventListener("click",(e):void =>{
  sessionStorage.setItem("forgotPass",inputOne.value);
})

