let todoTasks;
let inprogressTasks;
let testTasks;
let doneTasks;

async function init() {
  await downloadFromServer();
  tasks = JSON.parse(backend.getItem("tasks")) || []; //Danke Sven :)

  includeHTML();
  render();
}

function render() {
  document.getElementById("todo").innerHTML = "";
  document.getElementById("inProgress").innerHTML = "";
  document.getElementById("test").innerHTML = "";
  document.getElementById("done").innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let currentTask = tasks[i];
    if (currentTask.Status === "toDo") {
      document.getElementById("todo").innerHTML += `
            <div id="task-${i}" class="singleTask">
            <h4>${currentTask.Title}</h4>
            <a onclick="ShowOverlay(${i})">Show detailed</a>
            </div>
            `;
      addBackgroundColor(currentTask, i);
    }
    if (currentTask.Status === "inProgress") {
      document.getElementById("inProgress").innerHTML += `
      <div id="task-${i}" class="singleTask">
      <h4>${currentTask.Title}</h4>
      <a onclick="ShowOverlay(${i})">See more</a>
      </div>
      `;
      addBackgroundColor(currentTask, i);
    }
    if (currentTask.Status === "test") {
      document.getElementById("test").innerHTML += `
      <div id="task-${i}" class="singleTask">
      <h3>${currentTask.Title}</h3>
      <a onclick="ShowOverlay(${i})">See more</a>
      </div>
      `;
      addBackgroundColor(currentTask, i);
    }
    if (currentTask.Status === "done") {
      document.getElementById("done").innerHTML += `
      <div id="task-${i}" class="singleTask">
      <h4>${currentTask.Title}</h4>
      <a onclick="ShowOverlay(${i})">See more</a>
      </div>
      `;
      addBackgroundColor(currentTask, i);
    }
  }
  /* checkEmptyTodo(); */
}

function checkEmptyTodo() {
  if (todoTasks === 0) {
    showMsgEmptyTodo();
  }
}

function showMsgEmptyTodo() {
  return `<div>This Board is Empty</div>`;
}

function addBackgroundColor(currentTask, i) {
  if (currentTask.Category == "Marketing") {
    let taskContainer = document.getElementById(`task-${i}`);
    taskContainer.classList.add("color-marketing");
  }
  if (currentTask.Category == "Sale") {
    let taskContainer = document.getElementById(`task-${i}`);
    taskContainer.classList.add("color-sales");
  }
  if (currentTask.Category == "Production") {
    let taskContainer = document.getElementById(`task-${i}`);
    taskContainer.classList.add("color-production");
  }
  if (currentTask.Category == "Designer") {
    let taskContainer = document.getElementById(`task-${i}`);
    taskContainer.classList.add("color-designer");
  }
}

function ShowOverlay(i) {
  document.getElementById("Descriptionoverlay").classList.remove("d-none");
  RenderDescription(i);
}

function CloseOverlay() {
  document.getElementById("Descriptionoverlay").classList.add("d-none");
  render();
}

function RenderDescription(i) {
  let selection = document.getElementById("Descriptionbox");
  let currentTask = tasks[i];
  selection.innerHTML = `
  <div class="innerDescription">
  <h3 class="whitecolor textCenter"><u>Titel:</u><br></h3> 
  <h4>${currentTask.Title}</h4>
  <h3 class="whitecolor textCenter "><u>Assigned to:</u><br></h3>
  <h4>${currentTask.Assigned.Name}</h4>
  <h3 class="whitecolor textCenter"><u>Due Date:</u><br></h3> 
  <h4>${currentTask.DueDate}</h4>
  <h3 class="whitecolor textCenter"><u>Category:</u><br></h3> 
  <h4>${currentTask.Category}</h4>
  <h3 class="whitecolor textCenter"><u>Urgency:</u><br></h3> 
  <h4>${currentTask.Urgency}</h4>
  <h3 class="whitecolor textCenter"><u>Description</u>:<br></h3> 
  <h4 style="text-align:center">${currentTask.Description}</h4>
  <select name="Status" id="Status" class="inputfield pointer textInBox paddingInBox" value="${currentTask.Status}">
    <option value="toDo">To Do</option>
    <option value="inProgress">In Progress</option>
    <option value="test">Test</option>
    <option value="done">Done</option>
  </select>
  <button class="SaveButton" onclick="UpdateTask(${i})">
    Save Statuschange
  </button>
  </div>
  `;
}

function UpdateTask(i) {
  let StatusChange = document.getElementById("Status").value;
  tasks[i].Status = StatusChange;
  changeStatus();
  CloseOverlay();
  render();
}

async function changeStatus() {
  await backend.setItem("tasks", JSON.stringify(tasks));
}
