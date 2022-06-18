/* eslint-disable import/extensions */
import './style.css';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons/faArrowsRotate';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import {
  addTask, removeTask, getTasks, checkTask,
} from './modules/task.js';

import { updateStorage } from './modules/localStorage.js';

const taskContainer = document.querySelector('.task-list');
const taskInput = document.querySelector('.task-input');
const taskEnter = document.querySelector('.task-enter');
const taskClear = document.querySelectorAll('.task-completed');

const taskClearArr = [...taskClear];

const task = {};

library.add(faCheck, faTrash, faArrowRight, faBars, faArrowsRotate, faEllipsisVertical);

dom.watch();

let taskArr = getTasks();

const renderElements = (arr, container) => {
  container.innerHTML = '';
  arr.forEach((element) => {
    const task = document.createElement('div');
    task.classList.add('bg-secondary');
    task.classList.add('task-item');
    task.setAttribute('draggable', true);
    task.setAttribute('id', element.index);
    task.innerHTML = `
                            <input type="checkbox" id="${element.index}" class="task-check" data-id="${element.index}" value="${element.completed}"> 
                            <input type="input" for="${element.index}" class="task-edit" value="${element.description}">
                            <button class="rm-btn-default clr-primary task-delete"><i class="fa-solid fa-trash"></i></button> 
                            <button class="rm-btn-default clr-primary task-drag"><i class="fa-solid fa-ellipsis-vertical"></i> </button>
                         `;
    container.appendChild(task);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const taskItem = document.querySelectorAll('.task-item');

  function getDragAfterElement(container, y) {
    const draggableElement = [...container.querySelectorAll('.task-item:not(dragging)')];

    return draggableElement.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  taskItem.forEach((element) => {
    element.addEventListener('dragstart', (e) => {
      e.target.classList.add('draggable');
    });

    element.addEventListener('dragend', (e) => {
      e.target.classList.remove('draggable');
    });
  });

  taskContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggable = document.querySelector('.draggable');
    const afterElement = getDragAfterElement(taskContainer, e.clientY);
    if (afterElement === null) {
      taskContainer.appendChild(draggable);
    } else {
      taskContainer.insertBefore(draggable, afterElement);
    }
  });
});

renderElements(taskArr, taskContainer);

taskInput.addEventListener('input', (e) => {
  task.index = getTasks().length + 1;
  task.completed = false;
  task.description = e.target.value;
});

taskEnter.addEventListener('click', (e) => {
  e.preventDefault();
  addTask(task);
  taskInput.value = '';
  renderElements(getTasks(), taskContainer);
});

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    taskEnter.click();
  }
});

taskContainer.addEventListener('click', (e) => {
  const taskDelete = e.target.closest('.task-delete');
  const taskEdit = e.target.closest('.task-edit');
  const taskCheck = e.target.closest('.task-check');

  if (taskCheck) {
    const index = taskCheck.getAttribute('data-id');
    checkTask(taskCheck, index, taskArr);
  }
  if (taskDelete) {
    const index = taskDelete.previousElementSibling.previousElementSibling.getAttribute('data-id');
    removeTask(index);
    renderElements(getTasks(), taskContainer);
  }
  if (taskEdit) {
    const index = taskEdit.previousElementSibling.getAttribute('data-id');
    taskEdit.addEventListener('change', (e) => {
      taskArr.forEach((element) => {
        if (element.index === parseInt(index, 10)) {
          element.description = e.target.value;
          updateStorage('taskArr', taskArr);
        }
      });
      renderElements(getTasks(), taskContainer);
    });
  }
});

taskClearArr.forEach((element) => {
  element.addEventListener('click', () => {
    taskArr = getTasks();
    taskArr = taskArr.filter((element) => element.completed === false);
    taskArr = taskArr.map((element, index) => {
      element.index = index + 1;
      return element;
    });
    localStorage.setItem('taskArr', JSON.stringify(taskArr));
    renderElements(taskArr, taskContainer);
  });
});
