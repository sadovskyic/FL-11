let rootNode = document.getElementById('root');
const MATERIAL_ICONS = {
    'check-box': '<i class="material-icons check-box">check_box_outline_blank</i>',
    'cheked': '<i class="material-icons check-box">check_box</i>',
    'create': '<i class="material-icons">create</i>',
    'delete': '<i class="material-icons">delete</i>',
    'save': '<i class="material-icons">save</i>'
},
    maxTasks = 10;
let currentTasks = document.getElementsByTagName('li').length;
function makeList(item) {
    let list;
    if (item) {
        list = document.querySelectorAll('li:last-child');
    } else {
        list = document.getElementsByTagName('li');
    }
    for (let j = 0; j < list.length; j++) {
        let text = list[j].innerText;
        list[j].innerHTML = '';
        let span = document.createElement('span'),
            divLeft = document.createElement('div'),
            divDelete = document.createElement('div');
        divLeft.className = 'left-side';
        divLeft.innerHTML = MATERIAL_ICONS['check-box'];
        span.innerText = text;
        divLeft.appendChild(span);
        divLeft.innerHTML += MATERIAL_ICONS.create;
        divDelete.className = 'delete';
        divDelete.innerHTML = MATERIAL_ICONS.delete;
        list[j].appendChild(divLeft);
        list[j].appendChild(divDelete);
        list[j].classList.add('action');
        list[j].setAttribute('draggable', 'true');
        let actions = document.getElementsByClassName('action');
        [].forEach.call(actions, addDnDHandlers);
    }
}
function addAction() {
    let input = document.getElementById('taskInput');
    let task = input.value;
    if (!task) {
        return;
    }
    let li = document.createElement('li');
    let t = document.createTextNode(task);
    li.appendChild(t);
    document.getElementById('task').appendChild(li);
    document.getElementById('taskInput').value = '';
    makeList(li);
    ++currentTasks;
    let button = document.querySelector('.create');
    button.classList.remove('active');
    if (currentTasks >= maxTasks) {
        if (!document.querySelector('h1 .warning')) {
            let h1 = document.querySelector('h1');
            let warning = document.createElement('div');
            warning.innerText = 'Maximum item per list are created';
            warning.className = 'warning';
            h1.appendChild(warning);
            input.setAttribute('disabled', 'disabled');
        }
        return;
    }
}
function listEventsHandler(ev) {
    function markDone(elem) {
        elem.innerHTML = MATERIAL_ICONS.cheked;
        let children = elem.parentNode.children;
        for (let i = 0; i < children.length; i++) {
            children[i].style.color = '#aaaaaa';
        }
        if (elem.nextElementSibling) {
            elem.nextElementSibling.nextElementSibling.className += ' done';
        }
        elem.className += ' done';
    }
    function editTask(elem) {
        function clickOutside(event) {
            if (!parent.contains(event.target)) {
                if (parent.parentNode) {
                    parent.parentNode.replaceChild(parentCopy, parent);
                }       
                document.removeEventListener('click', clickOutside, true);
                addDnDHandlers(parentCopy);
            }
        }
        document.addEventListener('click', clickOutside, true);
        let parent = elem.parentNode.parentNode,
            text = elem.previousElementSibling.innerText,
            parentCopy = parent.cloneNode(true),
            input = document.createElement('input'),
            save = document.createElement('div');
        parent.removeAttribute('draggable');
        parent.innerHTML = '';
        save.className = 'save';
        save.innerHTML = MATERIAL_ICONS.save;
        parent.appendChild(input);
        parent.appendChild(save);
        parent.style.justifyContent = 'flex-start';
        save.style.cssText = 'padding-top: 5px; \
            margin-left: 10px; \
            color: #7fc3f1; \
            ';
        input.style.width = '300px';
        input.style.padding = '10px';
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'taskChange');
        input.setAttribute('value', text);
        input.setAttribute('autofocus', true);
        let saveButton = document.querySelector('.save i');
        saveButton.onclick = () => {
            let changeText = document.getElementById('taskChange').value || text;
            let task = parentCopy.querySelector('span');
            task.innerHTML = changeText;
            parent.parentNode.replaceChild(parentCopy, parent);
            addDnDHandlers(parentCopy);
        }
    }
    function deleteTask(elem) {
        elem.parentNode.parentNode.remove();
        currentTasks--;
        let warning = document.querySelector('h1 .warning');
        if (warning) {
            warning.remove();
            let input = document.getElementById('taskInput');
            input.removeAttribute('disabled', 'disabled');
        }
    }
    let checkBox = document.querySelectorAll('.left-side i:first-child');
    for (let i = 0; i < checkBox.length; i++) {
        if (ev.target === checkBox[i] && !checkBox[i].classList.contains('done')) {
            markDone(checkBox[i]);
            return;
        }
    }
    let edit = document.querySelectorAll('.left-side > i:last-child');
    for (let i = 0; i < edit.length; i++) {
        if (ev.target === edit[i] && !edit[i].classList.contains('done')) {
            editTask(edit[i]);
            return;
        }
    }
    let deleteButton = document.querySelectorAll('.delete i');
    for (let i = 0; i < deleteButton.length; i++) {
        if (ev.target === deleteButton[i]) {
            deleteTask(deleteButton[i]);
            return;
        }
    }
}
window.onload = makeList();
let create = document.querySelector('.create');
create.addEventListener('click', addAction);
let list = document.getElementById('task');
list.addEventListener('click', listEventsHandler);
let dragSrcEl = null;
function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
    this.classList.add('dragElem');
}
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    this.classList.add('over');
    e.dataTransfer.dropEffect = 'move';
    return false;
}
function handleDragLeave() {
    this.classList.remove('over');
}
function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    if (dragSrcEl !== this) {
        this.parentNode.removeChild(dragSrcEl);
        let dropHTML = e.dataTransfer.getData('text/html');
        this.insertAdjacentHTML('beforebegin', dropHTML);
        let dropElem = this.previousSibling;
        addDnDHandlers(dropElem);
    }
    this.classList.remove('over');
    return false;
}
function handleDragEnd() {
    this.classList.remove('over');
    this.classList.remove('dragElem');
}
function addDnDHandlers(elem) {
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('dragleave', handleDragLeave, false);
    elem.addEventListener('drop', handleDrop, false);
    elem.addEventListener('dragend', handleDragEnd, false);
}
let input = document.getElementById('taskInput');
let button = document.querySelector('.create');
input.oninput = function() {
    if (input.value) {
        button.classList.add('active');
    } else {
        button.classList.remove('active');
    }
};