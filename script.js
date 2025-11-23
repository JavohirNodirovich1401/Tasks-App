const textbtn_01 = document.getElementById("textbtn_01");
const textbtn_01svg = document.getElementById("textbtn_01svg");
const textbtn_02svg = document.getElementById("textbtn_02svg");

textbtn_01.addEventListener("click", () => {
  if (textbtn_01svg.style.display === "block" || textbtn_01svg.style.display === "") {
    textbtn_01svg.style.display = "none";
    textbtn_02svg.style.display = "block";
    document.body.style.backgroundColor = "#521981";
    document.body.style.color = "#FAF1F8";
  } else {
    textbtn_01svg.style.display = "block";
    textbtn_02svg.style.display = "none";
    document.body.style.backgroundColor = "#FAF1F8";
    document.body.style.color = "#1E1E1E";
  }
});

const matn = document.getElementById("matn");
const select01 = document.getElementById("select01");
const select02 = document.getElementById("select02");
const plus = document.getElementById("plus");
const container = document.getElementById("container");
const tbody = document.getElementById("tbody");

const filterButtons = document.querySelectorAll(".btns button");

let tasks = [];

plus.addEventListener("click", () => {
  const matnVal = matn.value.trim();
  const priorityVal = select01.value;
  const categoryVal = select02.value;

  if (!matnVal) return alert("Matn kiriting!");

  const task = {
    text: matnVal,
    priority: priorityVal,
    category: categoryVal
  };

  tasks.push(task);
  renderTasks(tasks); 

  container.style.display = "block";
  matn.value = "";
});

function renderTasks(list) {
  tbody.innerHTML = ""; 

  list.forEach((task, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${task.text}</td>
      <td>${task.priority}</td>
      <td>${task.category}</td>
      <td>
        <svg class="dalete" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 11v6"></path>
          <path d="M14 11v6"></path>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
          <path d="M3 6h18"></path>
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </td>
    `;

    const delBtn = newRow.querySelector(".dalete");
    delBtn.addEventListener("click", () => {
      tasks.splice(index, 1); 
      renderTasks(tasks); 
    });

    tbody.appendChild(newRow);
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const categoryText = btn.textContent.trim();
    if (categoryText.includes("All")) {
      renderTasks(tasks); 
    } else {
      const filtered = tasks.filter(t => t.category.includes(categoryText.split(" ")[0]));
      renderTasks(filtered);
    }
  });
});
