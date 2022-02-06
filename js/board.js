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
    document.getElementById('todo').innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        let currentTask = tasks[i];
        if (currentTask.Status === 'toDo') {
            document.getElementById('todo').innerHTML += `
            <p>
            <h5>${currentTask.Title}</h5>
            <h4>${currentTask.Status}</h4><hr>
            <img src="" alt="picture load fail"</img>
            </p>
            <hr><hr>
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