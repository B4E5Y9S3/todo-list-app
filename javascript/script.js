"strict mode";
import ToDo from "./todoApp.js";
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

const NewList = new ToDo();

const handleBtnAdd = function (e) {
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
};

window.addEventListener("click", function (e) {
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
btnAdd.addEventListener("click", handleBtnAdd);

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
