let backlogTasks;   

/**
 * onload funtion >> get task data from database+ include Navbar
 */
async function init() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem("tasks")) || [];
  
    includeHTML();
    render();
}

/**
 * MAIN RENDER: display all tasks with Status "backlog" 
 */
function render() {
    backlogTasks = 0;
    let mainContainer = document.getElementById('allTasks');
    mainContainer.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        let currentTask = tasks[i];
        if (currentTask.Status === "backlog") {
            backlogTasks++;
            mainContainer.innerHTML += generateTaskHTML(currentTask, i);
            addBorderColor(currentTask, i);
        }
    }
    checkEmptyBacklog();
}

/**
 * Check for need of Note when Backlog is empty 
 */
function checkEmptyBacklog() {
    if (backlogTasks === 0) {
        showMsgEmptyBacklog();
    }
}

function showMsgEmptyBacklog() {
    let container = document.getElementById('msgEmptyBacklog')
    container.classList.remove('d-none')
}

/**
 * @param currentTask from render function
 * @param i {index} from render function
 * check task category and assign CSS-color
 */
function addBorderColor(currentTask, i) {
    if (currentTask.Category == 'Marketing') {
        let taskContainer = document.getElementById(`task-${i}`);
        taskContainer.classList.add('color-marketing');
    }
    if (currentTask.Category == 'Sales') {
        let taskContainer = document.getElementById(`task-${i}`);
        taskContainer.classList.add('color-sales');
    }
    if (currentTask.Category == 'Production') {
        let taskContainer = document.getElementById(`task-${i}`);
        taskContainer.classList.add('color-production');
    }
    if (currentTask.Category == 'Designer') {
        let taskContainer = document.getElementById(`task-${i}`);
        taskContainer.classList.add('color-designer');
    }
}

/**
 * @param i from render function
 * change property "Status" of a task to shift it to value: "board"
 */
function addTaskToBoard(i) {
    let taskToAdd = tasks[i];
    taskToAdd.Status = "toDo";
    changeStatus();
    backlogTasks--;
    render();
}

/**
 * save tasks update in Database
 */
async function changeStatus() {
    await backend.setItem('tasks', JSON.stringify(tasks));
}

/**
 * @param i {index} from render function
 * delete task permantently from database
 */
function deleteTask(i) {
    let taskToDelete = tasks[i];
    taskToDelete.Status = "archived";
    changeStatus();
    backlogTasks--;
    render();
}

/**
 * @param i {index} from render function
 * Make containers editable: Title, Description, DueDate, Urgency
 */
function startEditMode(i) {
    let titleContainer = document.getElementById(`titleContainer-${i}`);
    titleContainer.setAttribute("contenteditable", "true");
    titleContainer.focus();
    let textContainer = document.getElementById(`textContainer-${i}`);
    textContainer.setAttribute("contenteditable", "true");
    let urgencySelector = document.getElementById(`urgency-${i}`);
    urgencySelector.style.appearance = "auto"; //show arrow for dropdown
    urgencySelector.classList.remove('deactivateClick');
    let dueDateOverlay = document.getElementById(`overlayDueDate-${i}`)
    dueDateOverlay.classList.add('d-none')

    createDueDatePicker(i);  // its not possible to have it created with the first render, bc it doesnt create multiple instances of DTSEL, only one at a time.
    btnChangeBgr(i);
    showSaveBtn(i);
}

/**
 * @param i {index} from render function
 * Create new DueDatePicker (see dtsel.js)
 */
function createDueDatePicker(i) {
    inputName = `dateTimePicker${i}`;
    instance = new dtsel.DTS(`input[name=${inputName}]`, {
        direction: 'BOTTOM',
        dateFormat: "dd / mm / yyyy"
    });
}

/**
 * @param i {index} from render function
 * save edited task
 */
function saveTask(i) {
    let titleTask = document.getElementById(`titleContainer-${i}`).innerText;
    let textTask = document.getElementById(`textContainer-${i}`).innerText;
    let dueDate = document.getElementById(`dueDate${i}`).value;
    let urgencyField = document.getElementById(`urgency-${i}`);
    let selectedUrgency = urgencyField.options[urgencyField.selectedIndex].value;
    tasks[i].Title = titleTask;
    tasks[i].Description = textTask;
    tasks[i].Urgency = selectedUrgency;
    tasks[i].DueDate = dueDate;

    showEditBtn(i);
    removeEditMode(i);
    changeStatus();
    render();  // is necessary, so it creates a new Datapicker, when a user want to edit again
}

/**
 * @param i {index}
 * @listens Edit Button clicked
 * button bgr. change on press
 */
function btnChangeBgr(i) {
    let activeEditBtn = document.getElementById(`btn-edit-${i}`);
    activeEditBtn.classList.add('btn-active');
}

/**
 * @param i {index}
 * @listens Edit Button clicked
 * change Edit button to Save Button layout
 */
function showSaveBtn(i) {
    let editBtn = document.getElementById(`btn-edit-${i}`);
    editBtn.classList.add('d-none');

    let saveBtn = document.getElementById(`btn-save-${i}`)
    saveBtn.classList.remove('d-none');
}

/**
 * @param i {index}
 * @listens Save Button clicked
 * change save button to edit button icon and funtionalities 
 */
function showEditBtn(i) {
    let editBtn = document.getElementById(`btn-edit-${i}`);
    let saveBtn = document.getElementById(`btn-save-${i}`)
    saveBtn.classList.add('d-none');
    editBtn.classList.remove('d-none');
}

/**
 * @param i {index}
 * @listens Edit Button clicked
 * change alle Edit functionalities to Save Mode functionalities
 */
function removeEditMode(i) {
    let titleContainer = document.getElementById(`titleContainer-${i}`);
    titleContainer.setAttribute("contenteditable", "false");

    let textContainer = document.getElementById(`textContainer-${i}`);
    textContainer.setAttribute("contenteditable", "false");

    let urgencySelector = document.getElementById(`urgency-${i}`);
    urgencySelector.style.appearance = "none"; //show arrow for dropdown
    urgencySelector.classList.add('deactivateClick');

    let dueDateInput = document.getElementById(`dueDate-${i}`);
    dueDateInput.classList.add('deactivateClick');

    let dueDateOverlay = document.getElementById(`overlayDueDate-${i}`)
    dueDateOverlay.classList.remove('d-none')
}

/**
 * @param i and currentTask from render function
 * @listens Edit Button clicked
 * @returns HTML code for a single Task container with all content
 */
function generateTaskHTML(currentTask, i) {
    return `<div class="taskContainer-wrapper d-flex-center box-shadow">
    <div class="taskContainer containerHeight" id="task-${i}">
            <div class="assignedTo d-flex-center" >
                <img id="userImg" src="${currentTask.Assigned.UserImage}" alt="user Image">
                <div class="userData">
                    <span id="userName">${currentTask.Assigned.Name}</span><br>
                    <span id="userEmail">${currentTask.Assigned.Email}</span>
                </div>
            </div>

            <div class="taskTimeline d-flex-center"> 

                <div id="dueDate-${i}" class="dueDate-container taskTimeline-container">
                    <div id="overlayDueDate-${i}" class="overlay-preventEditing"></div>
                    <div class="material-icons">event</div>
                    <input name="dateTimePicker${i}" id="dueDate${i}" value="${currentTask.DueDate}">
                </div>
                
                <div class= "taskTimeline-container">
                    <div class="material-icons">av_timer</div>      
                    <select id="urgency-${i}" name="Urgency" class="urgencySelector deactivateClick">
                        <option value="${currentTask.Urgency}" selected disabled >${currentTask.Urgency}</option>
                        <option value="High">High</option>
                        <option value="Mid">Mid</option>
                        <option value="Low">Low</option>
                    </select>   
                </div>
            </div>

            <div class="taskDescription ">
                <div id="titleContainer-${i}" class="titleTask">${currentTask.Title}</div>
                <div id="textContainer-${i}" class="textTask">${currentTask.Description}</div>
            </div>
    </div>

    <div class="taskButtons d-flex-center">
        <button id="btn-addBoard" onclick="addTaskToBoard(${i})"><span class="material-icons">
        add
        </span></button>

        <button id="btn-delete" onclick="deleteTask(${i})"><span class="material-icons">
        delete
        </span></button>

        <button id="btn-edit-${i}" class="btn-edit" onclick="startEditMode(${i})"><span class="material-icons">
        mode_edit_outline
        </span></button>

        <button id="btn-save-${i}" class="btn-save d-none" onclick="saveTask(${i})"><span class="material-icons">
        save
        </span></button>

    </div>
</div>`;
}