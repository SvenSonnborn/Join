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
                `<div id="taskContainer-${i}" class="taskContainer-wrapper d-flex-center">
            <div class="taskContainer" id="task-${i}">
                    <div class="assignedTo d-flex-center" >
                        <img id="userImg" src="${currentTask.Assigned.UserImage}" alt="user Image">
                        <div class="userData">
                            <span id="userName">${currentTask.Assigned.Name}</span><br>
                            <span id="userEmail">${currentTask.Assigned.Email}</span>
                        </div>
                    </div>

                    <div class="taskTimeline d-flex-center"> 
                        <span id="dueDate" >
                            <div class="material-icons">event</div>${currentTask.DueDate}
                        </span>

                        <span id="urgency">
                            <div id="dueDate" class="material-icons">av_timer</div>${currentTask.Urgency}
                        </span>
                    </div>
                    <div class="taskDescription d-flex-center">
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
                <button id="btn-edit" onclick="editTask(${i})"><span class="material-icons">
                mode_edit_outline
                </span></button>
            </div>
        </div>`;
            addBorderColors(currentTask, i);
        }
    }
    else {
        showNoteEmptyBacklog();
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

function deleteTask(i){
    let taskToDelete = backlogTasks[i];
    taskToDelete.Status = "archived";
    render();
}

function editTask(i) { 

    console.log('edit', i)

let titleContainer = document.getElementById(`titleContainer-${i}`);
titleContainer.setAttribute("contenteditable","true");
titleContainer.focus();
let textContainer = document.getElementById(`textContainer-${i}`);
textContainer.setAttribute("contenteditable","true");


}

function makeCalEditable(){
    console.log('changeDate')

}

function changeUser(){
    console.log('changeUser')
}

function showNoteEmptyBacklog() {
    let container = document.getElementById('msgEmptyBacklog')
    container.classList.remove('d-none')
}
