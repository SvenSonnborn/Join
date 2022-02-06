async function init() {
  await downloadFromServer();
  tasks = JSON.parse(backend.getItem("tasks")) || [];

  includeHTML();
}

let loginForm = document.getElementById("login-form");
let loginButton = document.getElementById("login-form-submit");
let loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  let username = loginForm.username.value;
  let password = loginForm.password.value;

  if (username === "Admin" && password === "Admin") {
    alert("You have successfully logged in as an Admin.");
    location.reload();
    location.href = "./welcome.html";
  } else if (username === "User" && password === "webdev") {
    alert("You have successfully logged in as a User.");
    location.reload();
    location.href = "./welcome.html";
  } else if (username === "Guest" && password === "Guest") {
    alert("You have successfully logged in as a Guest.");
    location.href = "./welcome.html";
  } else {
    loginErrorMsg.style.opacity = 1;
  }
});
