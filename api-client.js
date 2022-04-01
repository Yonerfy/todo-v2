const baseUrl = `http://localhost:3000/`;

async function getTask() {
  const res = await fetch(baseUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

async function sendTaskApiPost(taskName) {
  const data = {
    description: taskName,
    done: false,
  };
  taskName = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
}

async function deleteTask(id) {
  fetch(`${baseUrl}${id}`, {
    method: "DELETE",
  })
    .then((res) => res.text())
    .then((res) => console.log(res));
}

function updateTask(id, taskStatus) {
  fetch(`${baseUrl}${id}`, {
    method: "PUT",
    body: JSON.stringify({
      done: taskStatus,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

function updateTaskDescription(id, taskDescription) {
  fetch(`${baseUrl}${id}`, {
    method: "PUT",
    body: JSON.stringify({
      description: taskDescription,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}
