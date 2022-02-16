let todoTasks;
let inprogressTasks;
let testTasks;
let doneTasks;

/**
 * Get data from storage 
 */
async function init() {
  await downloadFromServer();
  tasks = JSON.parse(backend.getItem("tasks")) || [];
  includeHTML();
  render();
}

/**
 * Save data to storage 
 */
 async function changeStatus() {
  await backend.setItem("tasks", JSON.stringify(tasks));
}

/**
 * MAIN RENDER: display all tasks according to status 
 */
function render() {
  document.getElementById("toDo").innerHTML = "";
  document.getElementById("inProgress").innerHTML = "";
  document.getElementById("test").innerHTML = "";
  document.getElementById("done").innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let currentTask = tasks[i];
    let currentTaskStatus = currentTask.Status;
    if (currentTaskStatus === "toDo" || currentTaskStatus === "inProgress" || currentTaskStatus === "test" || currentTaskStatus === "done") {
          document.getElementById(currentTaskStatus).innerHTML += generateTaskHTML(i);
        ;
      addBackgroundColor(currentTask, i);
    }
  }
}

function generateTaskHTML(i){
return `<div draggable="true" ondragstart="drag(event)" id="task-${i}" class="singleTask">
<h4>${tasks[i].Title}</h4>
<a onclick="ShowOverlay(${i})">Show detailed</a>
</div>
`}


/**
 * Drag and Drop functions adapted from W3schools
 * 
 */
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
  changeStatusAfterDragging(data, targetDiv);
}


/**
 * Update Status after task is dragged into another column
 * @taskName is the Id of the HTML Element of the current task (this id consists of a string, attached to an index)
 * @targetDiv is the Board column as a DIV element,where the current taks is dropped
 */
function changeStatusAfterDragging(taskName, targetDiv) {
  let indexCurrentTask = taskName.replace(/\D/g,'');  // extracts the number from a string (e.g. taskName is task-1) to get the index >> 1
  let newStatus = targetDiv.id;
  tasks[indexCurrentTask].Status = newStatus;
  changeStatus();  // saves to backend
  render();
}


/**
 * Update Status after task is dragged into another column
 * @currentTask {object}
 * @i {number}
 */
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

/**
 * Show task in detail view --> Overlay creating 
 * @i {number}
 */
function ShowOverlay(i) {
  document.getElementById("Descriptionoverlay").classList.remove("d-none");
  RenderDescription(i);
}
/**
 * Hide task in detail view --> Overlay closing 
 * @i {number}
 */
function CloseOverlay() {
  document.getElementById("Descriptionoverlay").classList.add("d-none");
  render();
}

/**
 * Show task in detail view  
 * @i {number}
 */
function RenderDescription(i) {
  let selection = document.getElementById("Descriptionbox");
  selection.innerHTML = generateDetailTaskHTML(i);
}

function generateDetailTaskHTML(i){
  let currentTask = tasks[i];
return`
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

/**
 * Update Task after StatusChange on ButtonClick inside detail view of task is opened
 * @i {number}
 *  */
function UpdateTask(i) {
  let StatusChange = document.getElementById("Status").value;
  tasks[i].Status = StatusChange;
  changeStatus();
  CloseOverlay();
  render();
}




