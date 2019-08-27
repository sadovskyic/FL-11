const PAGE = {
    main: "main",
    edit: "edit",
    posts: "posts"
  },
  url = new URL("https://jsonplaceholder.typicode.com"),
  usersUrl = new URL("users", url);
let users = [],
  usersList = document.getElementById("users"),
  root = document.getElementById("root"),
  spinner = document.querySelectorAll(".lds-ring div");
function usersFromAPI(url) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.send();
  request.onload = async () => {
    console.log(JSON.parse(request.response));
    users = await JSON.parse(request.response);
    makeUsersList(users);
  };
  request.onprogress = event => {};
}

function makeUsersList(users) {
  usersList.innerHTML = "";
  users.forEach(user => {
    let li = document.createElement("li"),
      t = document.createElement("p"),
      editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.setAttribute("data-action", "edit");
    li.setAttribute("id", user.id);
    t.innerText = user.username;
    li.appendChild(t);
    li.appendChild(editButton);
    usersList.appendChild(li);
  });
}

function showPage(pageId, elemId) {
  location.hash = `/${pageId}`;
  let page = document.getElementById(pageId);
  if (page.id === PAGE.posts || page.id === PAGE.edit) {
    location.hash += `/:${elemId}`;
  }
  let pages = document.querySelectorAll(".page");
  pages.forEach(element => {
    element.hidden = true;
  });
  page.hidden = false;
}
document.addEventListener("DOMContentLoaded", showPage(PAGE.main));

usersFromAPI(usersUrl);

function EditProfile(button) {
  let self = this;
  button.onclick = function(event) {
    let target = event.target;
    let action = target.getAttribute("data-action");
    if (action) {
      self[action]();
    }
  };
  this.edit = () => {
    let id = Number(event.target.parentElement.getAttribute("id")),
      editPage = document.querySelector("#edit .wrapper"),
      user = users.find(user => user.id === id),
      form = document.createElement("form"),
      userData = { person: {} },
      cancel = document.createElement("button"),
      change = document.createElement("button"),
      remove = document.createElement("button"),
      buttons = document.createElement("div");
    editPage.innerHTML = "";
    for (let prop in user) {
      if (prop !== "id" && typeof user[prop] !== "object") {
        userData.person[prop] = user[prop];
      }
      if (typeof user[prop] === "object") {
        userData[prop] = user[prop];
      }
    }
    for (let prop in userData) {
      let fieldSet = document.createElement("fieldset");
      let legend = document.createElement("legend");
      legend.innerText = prop.toUpperCase();
      for (let key in userData[prop]) {
        if (typeof userData[prop][key] === "object") {
          continue;
        }
        let input = document.createElement("input"),
          label = document.createElement("label");
        input.setAttribute("value", userData[prop][key]);
        input.setAttribute("id", `${prop}_${key}`);
        label.setAttribute("for", `${prop}_${key}`);
        label.innerText = key;
        fieldSet.appendChild(label);
        fieldSet.appendChild(input);
      }
      fieldSet.appendChild(legend);
      form.appendChild(fieldSet);
      form.setAttribute("name", "person");
    }
    editPage.appendChild(form);
    cancel.innerText = "Cancel";
    change.innerText = "Save Changes";
    remove.innerText = "Delete profile";
    cancel.setAttribute("data-action", "cancel");
    change.setAttribute("data-action", "change");
    remove.setAttribute("data-action", "remove");
    buttons.appendChild(cancel);
    buttons.appendChild(change);
    buttons.appendChild(remove);
    buttons.setAttribute("class", "buttons-group");
    editPage.appendChild(buttons);
    showPage(PAGE.edit, id);
  };
  this.cancel = () => {
    showPage(PAGE.main);
  };
  this.change = () => {
    let temp = location.hash.split(":"),
      id = Number(temp.pop()),
      formData = new FormData(document.forms.person),
      request = new XMLHttpRequest();
    request.open("PUT", `${usersUrl}/${id}`);
    request.send(formData);
    request.onprogress = function() {
      showSpinner();
    };
    request.onload = () => {
      console.log(request.response);
      setTimeout(hideSpinner, 1000);
      setTimeout(() => showPage(PAGE.main), 1000);
    };
  };
  this.remove = () => {
    let temp = location.hash.split(":");
    let id = Number(temp.pop());
    let request = new XMLHttpRequest();
    request.open("DELETE", `${usersUrl}/${id}`);
    request.send(null);
    request.onprogress = function() {
      showSpinner();
    };
    request.onload = () => {
      console.log(request.response);
      setTimeout(hideSpinner, 1000);
      setTimeout(() => showPage(PAGE.main), 1000);
    };
  };
}
let editButtons = new EditProfile(document);

function showSpinner() {
  spinner.forEach(div => {
    div.style.display = "block";
  });
  root.style.opacity = "0.5";
}

function hideSpinner() {
  spinner.forEach(div => {
    div.style.display = "none";
  });
  root.style.opacity = "1";
}
