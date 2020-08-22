'use strict';
const headerInput = document.querySelector('.header-input'),
   todoControl = document.querySelector('.todo-control'),
   todoList = document.querySelector('.todo-list'),
   todoCompleted = document.querySelector('.todo-completed');


const toDoData = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

const render = function () {

   todoList.textContent = '';
   todoCompleted.textContent = '';
   toDoData.forEach(function (item) {
      const li = document.createElement('li');
      li.classList.add('todo-item');
      li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
         '<div class="todo-buttons">' +
         '<button class="todo-remove"></button>' +
         ' <button class="todo-complete"></button>' +
         '</div>';
      if (item.completed) {
         todoCompleted.append(li);
      } else {
         todoList.append(li);
      }

      // Добавление задач в выполненные и обратно
      const todoComplete = li.querySelector('.todo-complete');
      todoComplete.addEventListener('click', function () {
         item.completed = !item.completed;
         render();
      });

      //Удаление задач 
      const todoRemove = li.querySelector('.todo-remove');
      todoRemove.addEventListener('click', function () {
         let index = toDoData.indexOf(item);
         toDoData.splice(index, 1);
         localStorage.setItem('todos', JSON.stringify(toDoData));
         li.remove();

      });
      localStorage.setItem('todos', JSON.stringify(toDoData));
      const data = JSON.parse(localStorage.getItem('todos'));

   });

};


//Добавление новых задач
todoControl.addEventListener('submit', function (event) {
   event.preventDefault();

   //Проверка на пустую строку
   if (headerInput.value !== '') {
      const newToDo = {
         value: headerInput.value,
         completed: false
      };
      toDoData.push(newToDo);
      headerInput.value = '';
      render();
   } else {
      alert('Заполните пожалуйста поле');
   }

});



render();