let backlogTasks = [];

function initBacklog() {
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
                `<div class="taskContainer-wrapper d-flex-center">
            <div class="taskContainer" id="task-${i}">
                    <div class="assignedTo d-flex-center" >
                        <img id="userImg" src="${currentTask.UserImage}" alt="user Image">
                        <div class="userData">
                            <span id="userName">${currentTask.Assigned}</span><br>
                            <span id="userEmail">${currentTask.Email}</span>
                        </div>
                    </div>

                    <div class="taskTimeline d-flex-center"> 
                        <span id="dueDate">
                        <span class="material-icons">event</span>${currentTask["Due Date"]}</span>
                    </div>
                    <div class="taskDescription d-flex-center">${currentTask.Description}</div>
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
            addBorderColors(currentTask,i);
        }
    }
    else {
        alert('keie Tasks vorhanden');
    }
}


function addBorderColors(currentTask,i) {
    if (currentTask.Category == 'Marketing') {
        let taskContainer = document.getElementById(`task-${i}`);
        taskContainer.classList.add('border-green');
    }

    if (currentTask.Category == 'Doe') {
        let taskContainer = document.getElementById(`task-${i}`);
        taskContainer.classList.add('border-lila');
    }
}

function addTaskToBoard(i) {
    let taskToAdd = backlogTasks[i];

    taskToAdd.Status = "toDo";
        render();
        console.log('addTask', taskToAdd);
    }
    
    
//     function editTask(currentTask) {
//         console.log('editTask', currentTask);
//         // render();
//     }

// function addTaskToBoard(currentTask) {
//     console.log('currentTask', currentTask);

//     // currentTask.Status = "toDo";
//     console.log('addTask', currentTask);
//     // render();
// }


// function editTask(currentTask) {
//     console.log('currentTask', currentTask);

//     console.log('editTask', currentTask);
//     // render();
// }