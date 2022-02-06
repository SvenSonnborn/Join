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
    Name: "Peter Cook",
    Email: "peter@gmail.com",
    UserImage: "./img/profile1.png",
  },
  {
    Name: "Hans Makrone",
    Email: "hans@gmx.de",
    UserImage: "./img/profile2.png",
  },
  {
    Name: "Mila Mantau",
    Email: "mila@web.de",
    UserImage: "./img/profile3.png",
  },
  {
    Name: "Sven Sonnborn",
    Email: "s.sborn@gmail.com",
    UserImage: "./img/profile4.png",
  },
  {
    Name: "Mandy Markov",
    Email: "Markovki@gmail.com",
    UserImage: "./img/profile5.png",
  },
  {
    Name: "Lyam Lanzero",
    Email: "DieLanze@gmail.com",
    UserImage: "./img/profile6.png",
  },
];

function deleteTasks() {
  backend.deleteItem("tasks");
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
