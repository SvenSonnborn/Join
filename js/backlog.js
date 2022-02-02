let backlogTasks = [];

function initBacklog() {
    includeHTML();
    render();

}

function render() {
    let mainContainer = document.getElementById('allTasks')
    backlogTasks = tasks.filter((task) => { return task.Status === "backlog" })
    mainContainer.innerHTML = '';


    if (backlogTasks.length > 0) {
        for (let i = 0; i < backlogTasks.length; i++) {
            let currentTask = backlogTasks[i];
            mainContainer.innerHTML +=
                `<div id="taskContainer-c" class="taskContainer-wrapper d-flex-center box-shadow">
            <div class="taskContainer" id="task-${i}">
                    <div class="assignedTo d-flex-center" >
                        <img id="userImg" src="${currentTask.Assigned.UserImage}" alt="user Image">
                        <div class="userData">
                            <span id="userName">${currentTask.Assigned.Name}</span><br>
                            <span id="userEmail">${currentTask.Assigned.Email}</span>
                        </div>
                    </div>

                    <div class="taskTimeline d-flex-center"> 
                        <span id="dueDate-${i}" onclick="changeDueDate(${i})">
                            <div class="material-icons">event</div><input name="input${i}" placeholder="${currentTask.DueDate}"/>
                        </span>
                        

                        <span>
                            <div class="material-icons">av_timer</div>
                            
                            <select id="urgency-${i}" name="Urgency" class="urgencySelector">
                                <option value="none" selected disabled >${currentTask.Urgency}</option>
                                <option value="High">High</option>
                                <option value="Mid">Mid</option>
                                <option value="Low">Low</option>
                            </select>
                            
                        </span>
                    </div>
                    <div class="taskDescription ">
                        <div id="titleContainer-${i}" class="titleTask">${currentTask.Title}</div>
                        <div id="textContainer-${i}">${currentTask.Description}</div>
                    </div>
            </div>

            <div class="taskButtons d-flex-center">
                <button id="btn-addBoard" onclick="addTaskToBoard(${i})"><span class="material-icons">
                add
                </span></button>

                <button id="btn-delete" onclick="deleteTask(${i})"><span class="material-icons">
                delete
                </span></button>

                <button id="btn-edit-${i}" class="btn-edit" onclick="editTask(${i})"><span class="material-icons">
                mode_edit_outline
                </span></button>

                <button id="btn-save-${i}" class="btn-save d-none" onclick="saveTask(${i})"><span class="material-icons">
                save
                </span></button>

            </div>
        </div>`;
            addBorderColors(currentTask, i);
        }
    }
    else {
        showMsgEmptyBacklog();
    }
}


function addBorderColors(currentTask, i) {
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

function addTaskToBoard(i) {
    let taskToAdd = backlogTasks[i];
    taskToAdd.Status = "toDo";
    render();
}

function deleteTask(i) {
    let taskToDelete = backlogTasks[i];
    taskToDelete.Status = "archived";
    render();
}

function editTask(i) {

    let titleContainer = document.getElementById(`titleContainer-${i}`);
    titleContainer.setAttribute("contenteditable", "true");
    titleContainer.focus();
    let textContainer = document.getElementById(`textContainer-${i}`);
    textContainer.setAttribute("contenteditable", "true");
    let urgencySelector = document.getElementById(`urgency-${i}`);
    urgencySelector.style.appearance = "auto"; //show arrow for dropdown

    btnChangeBgr(i);
    showSaveBtn(i);
}

function changeDueDate(i) {
    let inputfield = document.getElementById(`dueDate-${i}`)
    inputfield.removeAttribute("onclick");
    instance = new dtsel.DTS(`input[name="input${i}"]`, {
        direction: 'BOTTOM',
        dateFormat: "dd / mm / yyyy"
    });
    if (inputfield.value) {
        inputfield.setAttribute("onclick", "showDatapicker(${i})")
    }
}

function changeUser() {
    console.log('changeUser')
}

function showMsgEmptyBacklog() {
    let container = document.getElementById('msgEmptyBacklog')
    container.classList.remove('d-none')
}


function saveAfterEdit() {
    console.log('save after edit');
}

// when edit-btn is clicked
function btnChangeBgr(i) {
    let activeEditBtn = document.getElementById(`btn-edit-${i}`);
    activeEditBtn.classList.add('btn-active');
}

function showSaveBtn(i) {
    let editBtn = document.getElementById(`btn-edit-${i}`);
    editBtn.classList.add('d-none');

    let saveBtn = document.getElementById(`btn-save-${i}`)
    saveBtn.classList.remove('d-none')
}