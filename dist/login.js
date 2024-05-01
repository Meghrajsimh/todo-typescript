"use strict";
const registerTitle = document.getElementById("reg");
const registerForm = document.querySelector(".registerForm");
const loginForm = document.querySelector(".loginForm");
const inputOne = document.getElementById("inputOne");
const inputTwo = document.getElementById("inputTwo");
const loginBtn = document.getElementById("submit");
const registeBtn = document.getElementById("rsubmit");
const rinputOne = document.getElementById("rinputOne");
const rinputTwo = document.getElementById("rinputTwo");
const registerLink = document.querySelector(".registe");
//open registe page
registerLink.addEventListener('click', () => {
    registerForm.classList.add('block');
    loginForm.classList.add("none");
});
// open login form
registerTitle.addEventListener("click", () => {
    registerForm.classList.remove("block");
    loginForm.classList.remove("none");
});
// create user
registeBtn.addEventListener("click", () => {
    const userEmail = rinputOne.value;
    const userPass = rinputTwo.value;
    const userData = JSON.parse(localStorage.getItem("user") || "[]");
    if (userEmail.includes("@") && userPass.length > 7) {
        const obj = {
            userName: userEmail,
            userPass: userPass,
        };
        userData.push(obj);
        const json = JSON.stringify(userData);
        localStorage.setItem("user", json);
        alert("User created");
        location.reload();
    }
    else {
        alert("Invalid email or password");
    }
});
// check user is vaild or not and login
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let userEmail = inputOne.value;
    let userPass = inputTwo.value;
    const regUserData = JSON.parse(localStorage.getItem("user") || "[]");
    console.log(regUserData);
    let findUser = regUserData.filter((ele) => (userEmail === ele.userName || ele.userName.split('@')[0] == userEmail) && userPass === ele.userPass);
    if (findUser.length > 0 && userPass.length > 7) {
        sessionStorage.setItem("loginUser", JSON.stringify(userEmail.split("@")[0]));
        alert("Login successful");
        location.href = "../html/todo.html";
    }
    else {
        alert("Invalid email or password");
    }
});
document.querySelector('a')?.addEventListener("click", (e) => {
    sessionStorage.setItem("forgotPass", inputOne.value);
});
