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
  document.getElementById("inprogress").innerHTML = "";
  document.getElementById("test").innerHTML = "";
  document.getElementById("done").innerHTML = "";


  for (let i = 0; i < tasks.length; i++) {
    let currentTask = tasks[i];
    if (currentTask.Status === "toDo") {
      document.getElementById("todo").innerHTML += `
            <div id="task-${i}" class="singleTask">
            <h4>Titel: ${currentTask.Title}</h4>
            <h5>Assigned to: ${currentTask.Assigned.Name}</h5>
            <a onclick="ShowOverlay(${i})">See more</a>
            </div>
            `;
      addBackgroundColor(currentTask, i);
    }
    if (currentTask.Status === "inProgress") {
      document.getElementById("inprogress").innerHTML += `
      <div id="task-${i}" class="singleTask">

      <h4>Titel: ${currentTask.Title}</h4>
      <h5>Assigned to: ${currentTask.Assigned.Name}</h5>
      <a onclick="ShowOverlay(${i})">See more</a>
      </div>
      `;
      addBackgroundColor(currentTask, i);
    }
    if (currentTask.Status === "test") {
      document.getElementById("test").innerHTML += `
      <div id="task-${i}" class="singleTask">

      <h4>Titel: ${currentTask.Title}</h4>
      <h5>Assigned to: ${currentTask.Assigned.Name}</h5>
      <a onclick="ShowOverlay(${i})">See more</a>
      </div>
      `;
      addBackgroundColor(currentTask, i);
    }
    if (currentTask.Status === "done") {
      document.getElementById("done").innerHTML += `
      <div id="task-${i}" class="singleTask">

      <h4>Titel: ${currentTask.Title}</h4>
      <h5>Assigned to: ${currentTask.Assigned.Name}</h5>
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
    taskContainer.classList.add('color-marketing-background');
  }
  if (currentTask.Category == "Sale") {
    let taskContainer = document.getElementById(`task-${i}`);
    taskContainer.classList.add("color-sales-background");
  }
  if (currentTask.Category == "Production") {
    let taskContainer = document.getElementById(`task-${i}`);
    taskContainer.classList.add("color-production-background");
  }
  if (currentTask.Category == "Designer") {
    let taskContainer = document.getElementById(`task-${i}`);
    taskContainer.classList.add("color-designer-background");
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
  <h4>Titel: ${currentTask.Title}</h4>
  <h5>Assigned to: ${currentTask.Assigned.Name}</h5>
  <h5>Due Date : ${currentTask.DueDate}</h5>
  <h5>Category : ${currentTask.Category}</h5>
  <h5>Urgency : ${currentTask.Urgency}</h5>
  <h5>Description : ${currentTask.Description}</h5>
  <select name="Status" id="Status" class="inputfield pointer textInBox paddingInBox" value="${currentTask.Status}">
    <option value="toDo">To Do</option>
    <option value="inProgress">In Progress</option>
    <option value="test">Test</option>
    <option value="done">Done</option>
  </select>
  <button class="SaveButton" onclick="UpdateTask(${i})">
    Save Statuschange
  </button>
  `;
}

function UpdateTask(i) {
  let StatusChange = document.getElementById("Status").value;
  tasks[i].Status = StatusChange;
  changeStatus();
  CloseOverlay()
  render();
}

async function changeStatus() {
  await backend.setItem("tasks", JSON.stringify(tasks));
}
