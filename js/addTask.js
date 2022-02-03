let Titel;
let DueDate;
let Category;
let Urgency;
let Description;
let Users = [];
let CurrentUser;

function load() {
  includeHTML();
  RenderUser();
}
function ClearInput() {
  document.getElementById("Titel").value = "";
  document.getElementById("Category").value = "Marketing";
  document.getElementById("DueDate").value = "";
  document.getElementById("Urgency").value = "High";
  document.getElementById("Description").value = "";
  document.getElementById("Users").value = "";
}
function CreateTask() {
  CreateTitel();
  CreateDueDate();
  CreateCategory();
  CreateUrgency();
  CreateDescription();
  CreateUsers();

  ClearInput();
}
function CreateTitel() {
  Titel = document.getElementById("Titel").value;
}

function CreateDueDate() {
  DueDate = document.getElementById("DueDate").value;
}

function CreateCategory() {
  Category = document.getElementById("Category").value;
}

function CreateUrgency() {
  Urgency = document.getElementById("Urgency").value;
}

function CreateDescription() {
  Description = document.getElementById("Description").value;
}

function CreateUsers() {}

function AddUser() {
  document.getElementById("UserOverlay").classList.remove("d-none");
}
function CloseOverlay() {
  document.getElementById("UserOverlay").classList.add("d-none");
}
function RenderUser(){
   let selection = document.getElementById("UserSelection");
   for (let i = 0; i < user.length; i++) {
      let CurrentUser = user[i];
      selection.innerHTML += `
        <div class="UserBox" id="UserBox">
           <h3>${CurrentUser.Name}</h3>
           <h4>${CurrentUser.Email}</h4>
           <img id="userImg" src="${CurrentUser.UserImage}" alt="user Image">
        </div>
        `;
    }
}
