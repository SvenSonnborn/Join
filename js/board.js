let todoTasks;
let inprogressTasks;
let testTasks;
let doneTasks;

/* function initialStatus() {

    let todoTasks = 0;
    let inprogressTasks = 0;
    let testTasks = 0;
    let doneTasks = 0;
} */

async function init() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem("tasks")) || [];
  
    includeHTML();
    render();
}

function render() {
    /* initialStatus(); */
    document.getElementById('todo').innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        let currentTask = tasks[i];
        if (currentTask.Status === "toDo") {
            document.getElementById('todo').innerHTML += `
            <div>${currentTask.Title}<hr>
            </div>
            `;
        }
        if (currentTask.Status === "inProgress") {
            document.getElementById('inprogress').innerHTML += `
            <div>${currentTask.Title}<hr>
            </div>
            `;
        }
        if (currentTask.Status === "test") {
            document.getElementById('test').innerHTML += `
            <div>${currentTask.Title}<hr>
            </div>
            `;
        }
        if (currentTask.Status === "done") {
            document.getElementById('done').innerHTML += `
            <div>${currentTask.Title}<hr>
            </div>
            `;
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