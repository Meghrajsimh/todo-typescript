"use strict";
const userData = JSON.parse(localStorage.getItem("user") || "[]");
const loginUser = document.querySelector("#userName");
const changeUser = document.querySelector("#changeUserName");
const changePasswordForm = document.querySelector(".changePassword");
const changePass = document.querySelector("#changePass");
const changePassBtn = document.querySelector("#changeBtn");
const userEmail = sessionStorage.getItem("forgotPass") || "[]";
let userIndex;
//user Email
loginUser.value = userEmail;
document.querySelector("#verify")?.addEventListener("click", (e) => {
    e.preventDefault();
    //check given email is right or worng
    userIndex = userData.findIndex((ele) => ele.userName == loginUser.value);
    if (userIndex > -1) {
        changePasswordForm.classList.add("block");
        changeUser.value = loginUser.value;
    }
    else {
        alert("email is not");
    }
});
//change user password
changePassBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (changePass.value != undefined) {
        userData[userIndex].userPass = changePass.value;
        localStorage.setItem("user", JSON.stringify(userData));
        sessionStorage.removeItem("forgotPass");
        location.href = "../index.html";
    }
    else {
        alert("please enter your new password!!!");
    }
});
