let Titel;
let DueDate;
let Category;
let Urgency;
let Description;
let UsersSelected = [];
let CurrentUser;
let TestTask = [];

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
  ClearUser();
}

function CreateTask() {
  CreateArray();
  CreateJSON();
  ClearInput();
}

function CreateJSON(){
  for (let i = 0; i < UsersSelected.length; i++) {
    TestTask.push({Titel : Titel, DueDate : DueDate, Category : Category, Urgency : Urgency, Description : Description, Assigned : UsersSelected[i], Status : "backlog"})
  }
}

function CreateArray(){
  CreateTitel();
  CreateDueDate();
  CreateCategory();
  CreateUrgency();
  CreateDescription();
  CreateUsers();
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

function ShowOverlay() {
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
        <div class="UserBox" id="UserBox${i}" onclick="AddUser(${i})">
           <h3>${CurrentUser.Name}</h3>
           <h5>${CurrentUser.Email}</h4>
           <img id="userImg" src="${CurrentUser.UserImage}" alt="user Image">
        </div>
        `;
    }
}

function AddUser(id){
  UsersSelected.push({Name : user[id].Name, Email : user[id].Email, UserImage : user[id].UserImage})
  RenderSelected();
  AllreadySelected(id);
}

function RenderSelected(){
  document.getElementById('Users').innerHTML = ``;
  for (let i = 0; i < UsersSelected.length; i++) {
    let UserShown = document.getElementById('Users');
    UserShown.innerHTML += `
    <img src="${UsersSelected[i].UserImage}" class="marginInBox">
    `;
  }
}

function AllreadySelected(id){
  let Selected = document.getElementById(`UserBox${id}`);
  Selected.innerHTML += `
  <div class="Selected" id="SelectedBox${id}">
    <h3> Allready Selected for this Task </h3>
  </div>
  `;
  removeOnclick(id);
}

function removeOnclick(id){
  document.getElementById(`UserBox${id}`).removeAttribute("onclick");
  document.getElementById(`UserBox${id}`).style.cursor = "auto";
}

function ClearUser(){
  document.getElementById('UserSelection').innerHTML = ``;
  RenderUser();
  document.getElementById('Users').innerHTML = ``;
  UsersSelected = [];
}


