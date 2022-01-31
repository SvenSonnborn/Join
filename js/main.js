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
            xhttp.onreadystatechange = function () {
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
let user = [
    {
        Name: "Peter Wurst",
        Email: "peter@gmail.com",
        UserImage: "img/profile4.png",
    },
    {
        Name: "Hans Makrone",
        Email: "hans@gmx.de",
        UserImage: "img/profile3.png",
    },
    {
        Name: "Vilia Terminal",
        Email: "vilia@web.de",
        UserImage: "img/profile1.png",
    },
];
let tasks = [
    {
        Title: "Titel Test 1",
        Category: "Sales",
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        DueDate: "02 / 03 / 22",
        Urgency: "Mid",
        Assigned: user[0],
        Status: "backlog", // >> Locaction of current task"backlog", "ToDo", "inProgress", "testing", "done"
    },
    {
        Title: "Titel Test 2",
        Category: "Production",
        Description: "This is a short task description for Task 2 in Project Management",
        DueDate: "02 / 03 / 22",
        Urgency: "Low",
        Assigned: user[1],
        Status: "backlog", // >> Locaction of current task"backlog", "ToDo", "inProgress", "testing", "done"
    },
    {
        Title: "Titel Test 3",
        Category: "Design",
        Description: "Run a test for your new developed software.",
        DueDate: "02 / 03 / 22",
        Urgency: "High",
        Assigned: user[2],
        Status: "backlog", // >> Locaction of current task"backlog", "ToDo", "inProgress", "testing", "done"
    },
    {
        Title: "Titel Test 4",
        Category: "Marketing",
        Description: "This is a short task description for Task 2 in Project Management",
        DueDate: "02 / 03 / 22",
        Urgency: "Low",
        Assigned: user[1],
        Status: "backlog", // >> Locaction of current task"backlog", "ToDo", "inProgress", "testing", "done"
    },
    {
        Title: "Titel Test 5",
        Category: "Sales",
        Description: "Run a test for your new developed software.",
        DueDate: "02 / 03 / 22",
        Urgency: "High",
        Assigned: user[2],
        Status: "backlog", // >> Locaction of current task"backlog", "ToDo", "inProgress", "testing", "done"
    }
];
