let todoTasks;
let inprogressTasks;
let testTasks;
let doneTasks;

function initialStatus() {

    let todoTasks = 0;
    let inprogressTasks = 0;
    let testTasks = 0;
    let doneTasks = 0;
}

function initBoard() {
    includeHTML();
    render();
}

function render() {
    initialStatus();
    for (let i = 0; i < tasks.length; i++) {
        let currentTask = tasks[i];
        document.getElementById('todo').innerHTML = '';
        if (currentTask.Status === "todo") {
            document.getElementById('todo').innerHTML += currentTask;
        }
    }
    checkEmptyTodo();
}

function checkEmptyTodo() {
    if (todoTasks === 0) {
        showMsgEmptyTodo();
    }
}

function showMsgEmptyTodo() {
    return `<div>This Board is Empty</div>`;
}