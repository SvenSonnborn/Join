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
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

let tasks = [{
    "Titel": "Mangement",
    "Category": "Doe",
    "Description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    "Due Date": "02.03.22",
    "Urgency": "High",
    "Assigned": "Peter",
    "Email": "peter@gmail.com",
    "UserImage": "img/profile4.png",
    "Status": "backlog" // >> Locaction of current task"backlog", "ToDo", "inProgress", "testing", "done"  
    //        "placed":"backlog"  >> we can change that into "status" (see above)
},
{
    "Titel": "Social Media",
    "Category": "Marketing",
    "Description": "This is a short task description for Task 2 in Project Management",
    "Due Date": "02.07.22",
    "Urgency": "Low",
    "Assigned": "Hans",
    "Email": "hans@gmx.de",
    "UserImage": "img/profile3.png",
    "Status": "backlog" // >> Locaction of current task"backlog", "ToDo", "inProgress", "testing", "done"  

    //      "placed":"backlog"
},
{
    "Titel": "Mangement",
    "Category": "Doe",
    "Description": "Run a test for your new developed software.",
    "Due Date": "12.10.22",
    "Urgency": "Medium",
    "Assigned": "Vilia",
    "Email": "vilia@web.de",
    "UserImage": "img/profile1.png",
    "Status": "backlog" // >> Locaction of current task"backlog", "ToDo", "inProgress", "testing", "done"  

    //      "placed":"backlog"
}

]