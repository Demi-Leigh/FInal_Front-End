n = new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
document.getElementById("Date").innerHTML = d + "/" + m + "/" + y;

let addNewTask = document.querySelector(".task-container");
let category = document.querySelector(".input-category");
let inputDiv = document.querySelector(".input-task");
let taskDiv = document.querySelector("#taskDiv");
let all = document.querySelector(".allBtn");
let important = document.querySelector(".importantBtn");
let planned = document.querySelector(".plannedBtn");
let button = document.querySelector("#myBtn");

// Adds Task
addNewTask.addEventListener("submit", function (e) {
  e.preventDefault();

  console.log(category.value);
  console.log(inputDiv.value);

  fetch("https://capstone-final-project1.herokuapp.com/add-task/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category: category.value,
      description: inputDiv.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      inputDiv.value = "";
      taskDiv.innerHTML = "";
      getTasks();
    });
});

function showTasks(task) {
  let newTask = document.createElement("li");
  newTask.innerText = task[2];
  taskDiv.appendChild(newTask);
  newTask.setAttribute("class", "task");
  newTask.setAttribute("id", task[0]);
  task = "";

  newTask.addEventListener("dblclick", function () {
    // Delete task
    fetch(
      "https://capstone-final-project1.herokuapp.com/delete-task/" +
        newTask.id +
        "/"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        taskDiv.innerHTML = "";
        getTasks();
      });
  });
}

// views all tasks
function getTasks() {
  fetch("https://capstone-final-project1.herokuapp.com/view-tasks/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      let tasks = data.data;
      tasks.forEach((task) => {
        showTasks(task);
      });
    });
}
taskDiv.innerHTML = "";
getTasks();

function getCategory(category) {
  fetch("https://capstone-final-project1.herokuapp.com/view-tasks/")
    .then((response) => response.json())
    .then((data) => {
      let tasks = data.data;
      let filtered = tasks.filter((task) => task[1] == category);
      taskDiv.innerHTML = "";

      filtered.forEach((task) => {
        showTasks(task);
      });
      console.log(filtered);
    });
}

important.addEventListener("click", function () {
  getCategory("Important");
});

planned.addEventListener("click", function () {
  getCategory("Planned");
});

all.addEventListener("click", function () {
  getTasks();
});
