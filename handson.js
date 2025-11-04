const list = document.querySelector('.todolist');
const addButton = document.querySelector('.addButton');
const inputElement = document.querySelector('.inputElement');
const filterButtons = document.querySelectorAll('div button');

let toDoArray = [];
let currentFilter = 'all';

addButton.addEventListener('click', addTodoItems);

function addTodoItems() {
  var input = inputElement.value.trim();
  if (input === '') return;

  toDoArray.push({ text: input, completed: false });
  inputElement.value = '';
  render();
}

function render() {
  list.innerHTML = '';

  var filteredTasks = [];

  if (currentFilter === 'active') {
    for (var i = 0; i < toDoArray.length; i++) {
      if (!toDoArray[i].completed) {
        filteredTasks.push(toDoArray[i]);
      }
    }
  } else if (currentFilter === 'complete') {
    for (var j = 0; j < toDoArray.length; j++) {
      if (toDoArray[j].completed) {
        filteredTasks.push(toDoArray[j]);
      }
    }
  } else {
    filteredTasks = toDoArray.slice(); 
  }

  for (var k = 0; k < filteredTasks.length; k++) {
    var divElement = document.createElement('div');
    var listElement = document.createElement('li');
    var checkbox = document.createElement('input');
    var deleteButton = document.createElement('button');

    checkbox.type = 'checkbox';
    checkbox.checked = filteredTasks[k].completed;
    listElement.textContent = filteredTasks[k].text;
    deleteButton.textContent = 'Delete';

    (function (task) {
      checkbox.addEventListener('change', function () {
        task.completed = checkbox.checked;
        render();
      });

      deleteButton.addEventListener('click', function () {
        var index = toDoArray.indexOf(task);
        if (index > -1) {
          toDoArray.splice(index, 1);
        }
        render();
      });
    })(filteredTasks[k]);

    divElement.appendChild(checkbox);
    divElement.appendChild(listElement);
    divElement.appendChild(deleteButton);
    list.appendChild(divElement);
  }
}

for (var b = 0; b < filterButtons.length; b++) {
  filterButtons[b].addEventListener('click', function () {
    var text = this.textContent.toLowerCase();
    if (text === 'active') {
      currentFilter = 'active';
    } else if (text === 'complete') {
      currentFilter = 'complete';
    } else {
      currentFilter = 'all';
    }
    render();
  });
}