function initBacklog(){
    render();
    addBorderColors();
}

function render(){
    let mainContainer = document.getElementById('allTasks')
    // mainContainer.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        mainContainer.innerHTML += 
        `<div class="taskContainer">
                <div class="assignedTo d-flex-center">
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
`
;    
    }
}


function addBorderColors() {
console.log('here');
}