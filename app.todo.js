const input = document.querySelector(".my-imput");
const button = document.querySelector(".btn-add");
const divTaskHolder = document.querySelector(".task-holder");
const ul = document.querySelector(".task-list");

button.addEventListener("click", (e) => {
  if (e.target.previousElementSibling.value) {
    const taskInput = e.target.previousElementSibling.value;
    sendTaskApiPost(taskInput);
    ul.innerHTML += getTaskHtml(taskInput);
    input.value = "";
  }
});

divTaskHolder.addEventListener("click", (e) => {
  if (e.target.id === "btn-delete") {
    getTask().then((tasks) => {
      tasks.map((task) => {
        if (task.description === e.target.previousElementSibling.value) {
          deleteTask(task._id);
          taskDeleteHtml(e.target.parentElement);
        }
      });
    });
  }
});

divTaskHolder.addEventListener("click", (e) => {
  if (e.target.id === "chk-done") {
    getTask().then((tasks) => {
      tasks.map((task) => {
        if (task.description === e.target.nextElementSibling.value) {
          updateTask(task._id, e.target.checked === true ? true : false);
          e.target.nextElementSibling.classList.toggle("task-complete");
        }
      });
    });
  }
});
divTaskHolder.addEventListener("click", (e) => {
  if (e.target.id === "task-description") {
    let taskName = e.target.value;
    e.target.disabled = false;
    e.target.focus();
    e.target.select();
    ul.addEventListener("change", (e) => {
      getTask().then((tasks) => {
        tasks.map((task) => {
          if (task.description === taskName) {
            updateTaskDescription(task._id, e.target.value);
            e.target.disabled = true;
          }
        });
      });
    });
  }
});

function getTaskHtml(task) {
  return `
        <li>
            <input type="checkbox" id="chk-done" ${task.done ? "checked" : ""}/>
            <input type="text" id="task-description" class="task-description ${
              task.done ? "task-complete" : ""
            }" value=${
    typeof task === "string" ? `'${task}'` : `'${task.description}'`
  } disabled/>
            <button class="delete-i" id="btn-delete">
            </button
        </li>
    `;
}

function taskDeleteHtml(element) {
  element.parentElement.removeChild(element);
}

function addTask(tasks) {
  return (ul.innerHTML += tasks.map((task) => getTaskHtml(task)).join(""));
}
getTask().then((tasks) => {
  addTask(tasks);
});
