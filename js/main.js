/*
Das soll die Main JS sein :) und gleichzeitig ein Test
*/
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            };
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}
let user = [{
        Name: "Peter Cook",
        Email: "peter@gmail.com",
        UserImage: "./img/profile6.png",
    },
    {
        Name: "Hans Makrone",
        Email: "hans@gmx.de",
        UserImage: "./img/profile3.png",
    },
    {
        Name: "Mila Mantau",
        Email: "mila@web.de",
        UserImage: "./img/profile2.png",
    },
    {
        Name: "Sven Sonnborn",
        Email: "s.sborn@gmail.com",
        UserImage: "./img/profile4.png",
    },
];
let task = [
    {
        Title: "Titel Test 1",
        Category: "Sales", // Options: Sales, Production, Marketing, Designer
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        DueDate: "02 / 03 / 22",
        Urgency: "Mid",
        Assigned: user[1],
        Status: "backlog", // This is where the task is currently loacted: "backlog", "toDo", "inProgress" etc.
    },
    {
        Title: "Titel Test 2",
        Category: "Production",
        Description: "This is a short task description for Task 2 in Project Management",
        DueDate: "02 / 03 / 22",
        Urgency: "Low",
        Assigned: user[2],
        Status: "inProgress",
    },
    {
        Title: "Titel Test 3",
        Category: "Designer",
        Description: "Run a test for your new developed software.",
        DueDate: "02 / 03 / 22",
        Urgency: "High",
        Assigned: user[2],
        Status: "toDo",
    },
    {
        Title: "Titel Test 5",
        Category: "Marketing",
        Description: "This is a short task description for Task 2 in Project Management",
        DueDate: "02 / 03 / 22",
        Urgency: "Low",
        Assigned: user[1],
        Status: "toDo",
    },
    {
        Title: "Titel Test 6",
        Category: "Marketing",
        Description: "Run a test for your new developed software.",
        DueDate: "10 / 03 / 22",
        Urgency: "High",
        Assigned: user[0],
        Status: "inProgress",
    },
    {
        Title: "Titel Test 3",
        Category: "Designer",
        Description: "Run a test for your new developed software.",
        DueDate: "02 / 07 / 22",
        Urgency: "High",
        Assigned: user[1],
        Status: "backlog",
    },
    {
        Title: "Move to another Dimension",
        Category: "Designer",
        Description: "Run a test for your new developed software.",
        DueDate: "02 / 07 / 22",
        Urgency: "High",
        Assigned: user[1],
        Status: "done",
    },
    {
        Title: "Titel Test 7",
        Category: "Designer",
        Description: "This is a short task description for Task 2 in Project Management",
        DueDate: "02 / 03 / 23",
        Urgency: "High",
        Assigned: user[1],
        Status: "toDo",
    },
    {
        Title: "Titel Test 8",
        Category: "Sales",
        Description: "Run a test for your new developed software.",
        DueDate: "02 / 03 / 22",
        Urgency: "High",
        Assigned: user[0],
        Status: "backlog",
    },
];

function deleteTask() {
    backend.deleteItem('tasks');
  }

//function current(id) {
//  if (id === 1) {
//    document.getElementById("AddTask").classList.add("current");
//    document.getElementById("Backlog").classList.remove("current");
//    document.getElementById("Board").classList.remove("current");
//    document.getElementById("Help").classList.remove("current");
//  } else if (id === 2) {
//    document.getElementById("Backlog").classList.add("current");
//    document.getElementById("AddTask").classList.remove("current");
//    document.getElementById("Board").classList.remove("current");
//    document.getElementById("Help").classList.remove("current");
//  } else if (id === 3) {
//    document.getElementById("Board").classList.add("current");
//    document.getElementById("AddTask").classList.remove("current");
//    document.getElementById("Backlog").classList.remove("current");
//    document.getElementById("Help").classList.remove("current");
//  } else if (id === 4) {
//    document.getElementById("Help").classList.add("current");
//    document.getElementById("AddTask").classList.remove("current");document.getElementById("Backlog").classList.remove("current");
//    document.getElementById("Board").classList.remove("current");
//  }
//}