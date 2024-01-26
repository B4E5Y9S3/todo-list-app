"strict mode";
const btnAddNew = document.querySelector(".btn-add-new");
const formMain = document.querySelector(".form-main");
const todoListUl = document.querySelector(".app-todo__list-ul");
const btnCancel = document.querySelector(".btn-cancel");
// * Form elements
const btnAdd = document.querySelector(".btn-add__todo-list");
const inputTime = document.querySelector(".input-time");
const inputActivity = document.querySelector(".input-activity");
const inputDescription = document.querySelector(".input-description");
const inputPriority = document.querySelector(".input-priority");
class ToDo {
  /*#todoList = [
    {
      time: "12:30 PM",
      activity: "cycling",
      description: `i wanna ride cylce to `,
    },
    {
      time: "12:30 PM",
      activity: "cycling",
      description: `i wanna ride cylce to loose  weight`,
    },
    {
      time: "12:30 PM",
      activity: "cycling",
      description: `i wanna ride cylce to loose some weight non stop`,
    },
    {
      time: "12:30 PM",
      activity: "cycling",
      description: `i wanna ride cylce to loose some weight`,
    },
    {
      time: "12:30 PM",
      activity: "cycling",
      description: `i wanna ride cylce to loose some weight`,
    },
    {
      time: "12:30 PM",
      activity: "cycling",
      description: `i wanna ride cylce to loose some weight`,
    },
  ];*/
  #todoList = [];

  constructor() {
    this.#syncLocalStorage();
    this.#todoList.forEach((el) => console.log(el));

    this.#renderToDoList();
  }

  #saveLocalStorage = function () {
    localStorage.setItem("todoList", JSON.stringify(this.#todoList));
  };
  #syncLocalStorage = function () {
    if (!localStorage.getItem("todoList")) return;
    console.log(...JSON.parse(localStorage.getItem("todoList")));
    this.#todoList.push(...JSON.parse(localStorage.getItem("todoList")));
  };
  #renderToDoList() {
    if (!this.#todoList.length) return;

    todoListUl.innerHTML = "";
    this.#todoList.forEach((el, i) => {
      const html = ` 
      <li data-list-num="${i}" style="border-color:${el.priority};" class="app-todo__list-li">
      <div>
          <div class="app-todo__list-top">
              <p class="app-todo__list-time margin-right-little">${el?.time}
              <i class="styled-line"></i>
                </p>
                <p class="app-todo__list-activity">${el?.activity}</p>
            </div>
            <div class="app-todo__list-description">
             <p title="description">${el?.description}</p>
              </div>
            </div>
            <div class="del app-todo__list-delete"><button class="btn btn-delete del"><svg class="app-todo__list-delete-icon del" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path class="del" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button></div>

        </li>`;
      todoListUl.insertAdjacentHTML("afterbegin", html);
    });
  }

  addNewTask(time, activity, description, priority) {
    this.#todoList.push({ time, activity, description, priority });
    this.#renderToDoList();
    this.#saveLocalStorage();
  }

  deleteTask(index) {
    this.#todoList.splice(index, 1);
    this.#renderToDoList();
    this.#saveLocalStorage();
  }
}

const NewList = new ToDo();
// NewList.addNewTask("12:30 PM", "running", "wanna be running");

window.addEventListener("click", function (e) {
  // formMain.classList.remove("fade-down");

  if (e.target === btnAddNew) {
    formMain.classList.remove("fade-down");
    formMain.style.animation = "fadeIn 600ms";
  }
  if (e.target === btnCancel) {
    formMain.style.animation = "fadeOut 600ms";
    formMain.classList.add("fade-down");
  }
});

btnAdd.addEventListener("click", function (e) {
  e.preventDefault();
  if (!inputTime.value || !inputActivity.value || !inputDescription.value)
    return;
  NewList.addNewTask(
    inputTime.value,
    inputActivity.value,
    inputDescription.value,
    inputPriority.options[inputPriority.options.selectedIndex].dataset.color
  );

  inputTime.value = inputActivity.value = inputDescription.value = "";
  formMain.style.animation = "fadeOut 600ms";
  formMain.classList.add("fade-down");
});
todoListUl.addEventListener("click", function (e) {
  if (!e.target.classList.contains("del")) return;
  const deleteTaskIndex =
    e.target.closest(".app-todo__list-li").dataset.listNum;
  NewList.deleteTask(deleteTaskIndex);
  if (todoListUl.innerHTML === "") todoListUl.innerHTML = "Empty todo list";
});
