"strict mode";

// Selected elements for interaction with the UI
const btnAddNew = document.querySelector(".btn-add-new");
const formMain = document.querySelector(".form-main");
const todoListUl = document.querySelector(".app-todo__list-ul");
const btnCancel = document.querySelector(".btn-cancel");
const btnClearAll = document.querySelector(".btn-clear-all");
// * Form elements
const btnAdd = document.querySelector(".btn-add__todo-list");
const inputTime = document.querySelector(".input-time");
const inputActivity = document.querySelector(".input-activity");
const inputDescription = document.querySelector(".input-description");
const inputPriority = document.querySelector(".input-priority");

class ToDo {
  // stores todo list details in array as an object which later on used to render to the UI
  #todoList = [];

  constructor() {
    this.#syncLocalStorage();
    this.#renderToDoList();
  }
  // this method saves todolist array into the local Storage
  #saveLocalStorage = function () {
    localStorage.setItem("todoList", JSON.stringify(this.#todoList));
    return this;
  };

  // this method sync from the local storage if only exist
  #syncLocalStorage = function () {
    if (!localStorage.getItem("todoList")) return this;
    this.#todoList.push(...JSON.parse(localStorage.getItem("todoList")));
    return this;
  };

  // this method to render the todo-list to the UI from the todolist array
  #renderToDoList() {
    if (!this.#todoList.length) {
      todoListUl.innerHTML = "Empty List";
      return this;
    }

    todoListUl.innerHTML = "";
    this.#todoList.forEach((el, i) => {
      const html = ` 
      <li data-list-num="${i}" style="border-color:${el.priority};" class="app-todo__list-li">
      <div class="app-todo__list-li-content">
          <div class="app-todo__list-top" style="background-color:${el.priority};">
              <p class="app-todo__list-time margin-right-little">${el?.time}
              <i class="styled-line"></i>
                </p>
                <p class="app-todo__list-activity">${el?.activity}</p>
            </div>
            <div class="app-todo__list-description">
             <p title="description">${el?.description}</p>
              </div>
            </div>
            <div class="del app-todo__list-delete"><button class="btn btn-delete del"><svg class="app-todo__list-delete-icon del" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path class="del" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button></div></li>`;
      todoListUl.insertAdjacentHTML("afterbegin", html);
    });
    return this;
  }
  // add new task details into the todolist array then render it to the UI
  addNewTask(time, activity, description, priority) {
    this.#todoList.push({ time, activity, description, priority });
    this.#renderToDoList().#saveLocalStorage();
    return this;
  }

  // delete a specific task by getting the index number of that task from the elements data attribute
  deleteTask(index) {
    setTimeout(() => {
      this.#todoList.splice(index, 1);
      this.#renderToDoList().#saveLocalStorage();
      return this;
    }, 400);
  }
  // clear all task
  clearAll() {
    const listLiAll = document.querySelectorAll(".app-todo__list-li");
    listLiAll.forEach((el) => (el.style.animation = "movingRight 550ms"));
    setTimeout(() => {
      this.#todoList = [];
      this.#saveLocalStorage().#renderToDoList();
    }, 450);
    return this;
  }
}

const NewList = new ToDo();

window.addEventListener("click", function (e) {
  // formMain.classList.remove("fade-down");

  // Adding animation if Add new button is clicked
  if (e.target === btnAddNew) {
    formMain.style.display = "flex";
    formMain.style.animation = "fadeIn 500ms";
    formMain.classList.remove("fade-down");
  }
  // Adding animation if Cancel button is clicked
  if (e.target === btnCancel) {
    formMain.style.animation = "fadeOut 500ms";
    formMain.classList.add("fade-down");
    setTimeout(() => {
      formMain.style.display = "none";
    }, 600);
  }
});

// On Form Add Button. NOTE: not the AddNew button
btnAdd.addEventListener("click", function (e) {
  e.preventDefault();
  if (!inputTime.value || !inputActivity.value) return;
  NewList.addNewTask(
    inputTime.value,
    inputActivity.value,
    inputDescription.value.trim() === ""
      ? inputActivity.value
      : inputDescription.value,
    inputPriority.options[inputPriority.options.selectedIndex].dataset.color
  );

  // resetting the form
  inputTime.value = inputActivity.value = inputDescription.value = "";
  formMain.style.animation = "fadeOut 500ms";
  formMain.classList.add("fade-down");
});
todoListUl.addEventListener("click", function (e) {
  if (!e.target.classList.contains("del")) return;
  e.target.closest(".app-todo__list-li").style.animation = "movingRight 500ms";
  const deleteTaskIndex =
    e.target.closest(".app-todo__list-li").dataset.listNum;
  NewList.deleteTask(deleteTaskIndex);
  if (todoListUl.innerHTML === "") todoListUl.innerHTML = "Empty todo list";
});

btnClearAll.addEventListener("click", function () {
  NewList.clearAll();
});
