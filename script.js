const inputBox = document.getElementById("input-box")
const listContainerAll = document.getElementById("list-container-all")
const listContainerToday = document.getElementById("list-container-today")

function addTask(){
    if(inputBox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value
        listContainerAll.appendChild(li);

        // adding the 'x' button - as a span element
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        // adding exclamation button - as a span element
        let span1 = document.createElement("span");
        li.appendChild(span1);

    }
    inputBox.value = ''
    saveData();
}

inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

[listContainerAll, listContainerToday].forEach(function(listContainer) {
    listContainer.addEventListener("click", function(e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            saveData();
        } else if (e.target.tagName === "SPAN" && 
                   e.target === e.target.parentElement.firstElementChild
        ) {
            e.target.parentElement.remove();
            saveData();
        } else if (e.target.tagName === "SPAN" && 
                   e.target === e.target.parentElement.children[1] &&
                   document.querySelector('.all-tasks').contains(e.target)
        ) {
            const row = e.target.parentElement;
            const todaysTaskContainer = document.querySelector('.todays-tasks ul');
            todaysTaskContainer.appendChild(row);
            e.target.style.backgroundImage = "url('images/down-arrow.jpg')";
            saveData();
        } else if (e.target.tagName === "SPAN" &&
                   e.target === e.target.parentElement.children[1] &&
                   document.querySelector('.todays-tasks').contains(e.target)
        ) { 
            console.log('success');
            const row = e.target.parentElement;
            const todaysTaskContainer = document.querySelector('.all-tasks ul');
            todaysTaskContainer.appendChild(row);
            e.target.style.backgroundImage = "url('images/exclamation.png')";
            saveData();
        }
    }, false);
});

function saveData() {
    localStorage.setItem("allTasksData", listContainerAll.innerHTML)
    localStorage.setItem("todaysTasksData", listContainerToday.innerHTML)
}

function showTask() {
    listContainerAll.innerHTML = localStorage.getItem("allTasksData");
    listContainerToday.innerHTML = localStorage.getItem("todaysTasksData");
}
showTask();

// Placeholder, typed text "Add your task!"
const text = "Add your task!";
const typedTextElement = document.getElementById('input-box');
let index = 0;

function typeText() {
    if (index < text.length) {
        typedTextElement.placeholder += text.charAt(index);
        index++;
        setTimeout(typeText, 100);
    }
}
window.onload = typeText;

// Re-order tasks through dragging
const todaysTasks = document.querySelector('.todays-tasks ul');
const allTasks = document.querySelector('.all-tasks ul');
new Sortable(todaysTasks, {
    animation: 150,
    ghostClass: 'dragging'
});
new Sortable(allTasks, {
    animation: 150,
    ghostClass: 'dragging'
});