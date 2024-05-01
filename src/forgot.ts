const userData: { userName: string; userPass: string }[] = JSON.parse(
  localStorage.getItem("user") || "[]"
);
const loginUser = document.querySelector("#userName") as HTMLFormElement;
const changeUser = document.querySelector("#changeUserName") as HTMLFormElement;
const changePasswordForm = document.querySelector(".changePassword") as HTMLDivElement;
const changePass = document.querySelector("#changePass") as HTMLFormElement;
const changePassBtn = document.querySelector("#changeBtn") as HTMLButtonElement;
const userEmail: string = sessionStorage.getItem("forgotPass") || "[]";
let userIndex: number;

//user Email
if(userEmail != '[]') {
loginUser.value = userEmail;
}

document.querySelector("#verify")?.addEventListener("click", (e):void => {
  e.preventDefault();

  //check given email is right or worng
  userIndex = userData.findIndex((ele) => ele.userName == loginUser.value);

  if (userIndex > -1) {
    changePasswordForm.classList.add("block");
    changeUser.value = loginUser.value;
  } else {
    alert("email is not found!!!");
  }
});


//change user password
changePassBtn.addEventListener("click",(e):void =>{
    e.preventDefault();
    if(changePass.value != undefined && changePass.value.length > 7 ) {
       userData[userIndex].userPass = changePass.value;
       localStorage.setItem("user",JSON.stringify(userData));
       sessionStorage.removeItem("forgotPass");
       location.href = "../index.html";
    }else {
        alert("please enter your new password or passwrod lenth must be minimum 8!!!")
    }
})
