const PAGE = {
    main: 'main',
    add: 'add',
    modify: 'modify'
},
    ERROR = {
        done: 'Error! You can\'t edit already done item',
        exist: 'Error! You can\'t add already exist item',
        notChanged: 'Error! You have not made changes'
    };
let todoItems = [],
    tasks = document.getElementById('tasks');
taskFromLocal();
function taskFromLocal() {
    tasks.innerHTML = '';
    if (localStorage.getItem('todo')) {
        todoItems = JSON.parse(localStorage.getItem('todo'));
    }
    if (todoItems.length) {
        todoItems.forEach(item => makeList(item));
    } else {
        let emptyElement = document.createElement('li'),
            emptyText = document.createElement('p');
        emptyElement.className = 'empty';
        emptyText.innerText = 'TODO is empty';
        emptyElement.appendChild(emptyText);
        tasks.appendChild(emptyElement);
    }
}
function showPage(pageId, elemId) {
    location.hash = `/${pageId}`;
    let page = document.getElementById(pageId);
    if (page.id === PAGE.modify) {
        location.hash += `/:${elemId}`;
    }
    let pages = document.querySelectorAll('.page');
    pages.forEach(element => {
        element.hidden = true;
    });
    page.hidden = false;
}
document.addEventListener('DOMContentLoaded', showPage(PAGE.main));
function makeList(task) {
    let li = document.createElement('li'),
        checkBox = document.createElement('div'),
        deleteButton = document.createElement('div'),
        t = document.createElement('p');
    li.setAttribute('id', task.id);
    t.innerText = task.description;
    checkBox.className = task.isDone ? 'done' : 'todo';
    li.className = task.isDone ? 'task-done' : '';
    deleteButton.className = 'remove';
    checkBox.setAttribute('data-action', 'check');
    deleteButton.setAttribute('data-action', 'del');
    t.setAttribute('data-action', 'change');
    li.appendChild(checkBox);
    li.appendChild(t);
    li.appendChild(deleteButton);
    tasks.appendChild(li);
}
function EditTask(button) {
    this.add = function () {
        showPage(PAGE.add);
    };
    this.save = function () {
        let input = document.getElementById('taskInput'),
            taskText = input.value,
            counter = 1;
        if (!taskText) {
            return;
        }
        let task = {};
        task.isDone = false;
        while (!task.id) {
            if (todoItems.every(item => item.id !== counter)) {
                task.id = counter;
            } else {
                counter++;
            }
        }
        while (!task.description) {
            if (todoItems.every(item => item.description !== taskText)) {
                task.description = taskText;
            } else {
                alert(ERROR.exist);
                hideError();
                return;
            }
        }
        if (todoItems.length) {
            for (let i = 0; i < todoItems.length; i++) {
                if (todoItems[i].isDone) {
                    todoItems.splice(i, 0, task);
                    break;
                }
                if (i === todoItems.length - 1) {
                    todoItems[todoItems.length] = task;
                    break;
                }
            }
        } else {
            todoItems[todoItems.length] = task;
        }
        input.value = '';
        if (document.querySelector('.empty')) {
            document.querySelector('.empty').remove();
        }
        localStorage.setItem('todo', JSON.stringify(todoItems));
        taskFromLocal();
        showPage(PAGE.main);
    };
    this.change = () => {
        let task = event.target;
        let li = task.parentElement;
        let id = +li.getAttribute('id');
        let canEdit = true;
        todoItems.forEach(item => {
            if (item.id === id && item.isDone) {
                alert(ERROR.done);
                hideError();
                canEdit = false;
            }
        });
        if (canEdit) {
            let taskText = task.innerText;
            let input = document.getElementById('modifyInput');
            input.setAttribute('value', taskText);
            input.value = taskText;
            showPage(PAGE.modify, id);
        }
    };
    this.saveChange = () => {
        let input = document.getElementById('modifyInput'),
            changedText = '';
        let temp = location.hash.split(':');
        let id = Number(temp.pop());
        let notChanged = false;
        todoItems.forEach(item => {
            if (item.id === id && item.description === input.value) {
                notChanged = true;
            }
        });
        if (!input.value || notChanged) {
            alert(ERROR.notChanged);
            hideError();
            return;
        }
        while (!changedText) {
            if (todoItems.every(item => item.description !== input.value)) {
                changedText = input.value;
                todoItems.forEach(item => {
                    if (item.id === id) {
                        item.description = changedText;
                        localStorage.setItem('todo', JSON.stringify(todoItems));
                        taskFromLocal();
                        return;
                    }
                });
            } else {
                alert(ERROR.exist);
                hideError();
                return;
            }
        }
        showPage(PAGE.main);
    };
    this.cancel = () => showPage(PAGE.main);
    this.check = () => {
        let checkBox = event.target;
        let li = checkBox.parentElement;
        let id = +li.getAttribute('id');
        for (let i = 0; i < todoItems.length; i++) {
            if (todoItems[i].id === id) {
                todoItems[i].isDone = !todoItems[i].isDone;
                if (todoItems[i].isDone) {
                    let lastItem = todoItems.splice(i, 1);
                    todoItems.push(lastItem[0]);
                } else {
                    for (let j = 0; j < todoItems.length; j++) {
                        if (todoItems[j].isDone) {
                            if (i === j - 1) {
                                break;
                            }
                            let elem = todoItems.splice(i, 1);
                            todoItems.splice(j, 0, elem[0]);
                            break;
                        }
                    }
                }
                break;
            }
        }
        localStorage.setItem('todo', JSON.stringify(todoItems));
        taskFromLocal();
    };
    this.del = () => {
        let del = event.target;
        let li = del.parentElement;
        let id = +li.getAttribute('id');
        for (let i = 0; i < todoItems.length; i++) {
            if (todoItems[i].id === id) {
                todoItems.splice(i, 1);
                localStorage.setItem('todo', JSON.stringify(todoItems));
                taskFromLocal();
                break;
            }
        }
    };
    let self = this;
    button.onclick = function (event) {
        let target = event.target;
        let action = target.getAttribute('data-action');
        if (action) {
            self[action]();
        }
    };
}
let editButtons = new EditTask(document);
function notRepeated(value1, value2) {
    return value1 !== value2;
}
window.alert = function (message) {
    let err = document.createElement('div'),
        root = document.getElementById('root'),
        p = document.createElement('p'),
        errorLength = 6,
        firstPart = message.substr(0, errorLength),
        secondPart = message.substr(errorLength),
        browser = navigator.userAgent;
    p.innerHTML = firstPart;
    p.style.fontWeight = 'bold';
    p.style.marginBottom = '10px';
    err.appendChild(p);
    err.innerHTML += secondPart;
    err.className = 'alert';
    if (!~browser.indexOf('Chrome')) {
        err.style.right = '10px';
    } else {
        err.style.left = '10px';
    }
    root.appendChild(err);
}
function hideError () {
    const TTL_ERROR = 2000;
    setTimeout(() => {
        let al = document.querySelectorAll('.alert');
        al.forEach(item => item.remove());                      
    }, TTL_ERROR);
}