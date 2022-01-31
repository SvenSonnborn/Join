function initBacklog() {
    render();
}

function render() {
    let mainContainer = document.getElementById('allTasks')
    // mainContainer.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].Status === "backlog") {
            mainContainer.innerHTML +=
                `<div class="taskContainer-wrapper d-flex-center">
            <div class="taskContainer" id="task-${i}">
                    <div class="assignedTo d-flex-center" >
                        <img id="userImg" src="${tasks[i].UserImage}" alt="user Image">
                        <div class="userData">
                            <span id="userName">${tasks[i].Assigned}</span><br>
                            <span id="userEmail">${tasks[i].Email}</span>
                        </div>
                    </div>

                    <div class="taskTimeline d-flex-center"> 
                        <span id="dueDate">
                        <span class="material-icons">event</span>${tasks[i]["Due Date"]}</span>
                    </div>
                    <div class="taskDescription d-flex-center">${tasks[i].Description}</div>
            </div>

            <div class="taskButtons d-flex-center">
                <button id="btn-addBoard" onclick="addTaskToBoard(${i})"><span class="material-icons">
                add
                </span></button>
                <button id="btn-edit" onclick="editTask(${i})"><span class="material-icons">
                mode_edit_outline
                </span></button>
            </div>

        </div>`;
            addBorderColors(i);
        }
    }
}


function addBorderColors(i) {
    if (tasks[i].Category == 'Marketing') {
        let taskContainer = document.getElementById(`task-${i}`);
        taskContainer.classList.add('border-green');
    }

    if (tasks[i].Category == 'Doe') {
        let taskContainer = document.getElementById(`task-${i}`);
        taskContainer.classList.add('border-lila');
    }
}

function addTaskToBoard(i) {
    let currentTask =tasks[i];
    currentTask.Status = "toDo";
    console.log('addTask', i, currentTask);
}


function editTask(i) {
    let currentTask =tasks[i];
    console.log('editTask', i,currentTask);
}