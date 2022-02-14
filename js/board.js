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
  document.getElementById("toDo").innerHTML = "";
  document.getElementById("inProgress").innerHTML = "";
  document.getElementById("test").innerHTML = "";
  document.getElementById("done").innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let currentTask = tasks[i];
    let currentTaskStatus = currentTask.Status;
    if (currentTaskStatus === "archived" || currentTaskStatus === "backlog") {
      console.log('archived or backlog')
    }
    else {
      document.getElementById(currentTaskStatus).innerHTML +=
        `<div draggable="true" ondragstart="drag(event)" id="task-${i}" class="singleTask">
                <h4>${currentTask.Title}</h4>
                <a onclick="ShowOverlay(${i})">Show detailed</a>
            </div>
            `;
      addBackgroundColor(currentTask, i);
    }
  }
}

///////// DRAG AND DROP ////////

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function moveTo(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  let targetDiv = ev.target;
  ev.target.appendChild(document.getElementById(data));  // data is the ID of the element that is dragged, in our case task-${i}
  console.log(ev.target);
  changeStatusAfterDragging(data, targetDiv);
}

function changeStatusAfterDragging(taskName, targetDiv) {
  let indexCurrentTask = taskName.replace(/\D/g,'');  // extracts the number from a string (e.g. taskName is task-1) to get the index >> 1
  let newStatus = targetDiv.id
  tasks[indexCurrentTask].Status = newStatus;
  changeStatus();  // saves to backend
  render();
}
/////////////////


function addBackgroundColor(currentTask, i) {
  let taskContainer = document.getElementById(`task-${i}`);
  if (currentTask.Category == "Marketing") {
    taskContainer.classList.add("color-marketing");
  }
  if (currentTask.Category == "Sale") {
    taskContainer.classList.add("color-sales");
  }
  if (currentTask.Category == "Production") {
    taskContainer.classList.add("color-production");
  }
  if (currentTask.Category == "Designer") {
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





// function checkEmptyTodo() {
//   if (todoTasks === 0) {
//     showMsgEmptyTodo();
//   }
// }

// function showMsgEmptyTodo() {
//   return `<div>This Board is Empty</div>`;
// }