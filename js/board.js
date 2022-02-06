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
    let mainContainer = document.getElementById('allTasks');
    mainContainer.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        let currentTask = tasks[i];
        document.getElementById('todo').innerHTML = '';
        if (currentTask.Status === "todo") {
            document.getElementById('todo').innerHTML += currentTask;
            /* mainContainer.innerHTML += generateTaskHTML(currentTask, i); */

            /* addBorderColor(currentTask, i);
            createDueDatePicker(i);    
 */
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