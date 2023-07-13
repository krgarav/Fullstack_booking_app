const getkey =
  "https://crudcrud.com/api/1518db6fb2ab4c9c8482a668c9440fb5/appointmentData";
var idKey;

var toggle = false;
window.addEventListener("DOMContentLoaded", () => {
  const ul = document.getElementById("items");
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  axios.get("http://localhost:3000/get-user").then((res) => {
    let array = res.data;
    let name, email;
    array.forEach((element) => {
      name = element.user;
      email = element.email;
      //create delete buttn
      const deleteBtn = document.createElement("input");
      deleteBtn.setAttribute("type", "button");
      deleteBtn.setAttribute("onclick", "deleteBtnFn(event)");
      deleteBtn.value = "Delete";
      deleteBtn.className = "delete";
      //create edit button
      const editBtn = document.createElement("input");
      editBtn.setAttribute("type", "button");
      editBtn.setAttribute("onclick", "editBtnFn(event)");
      editBtn.className = "edit";
      editBtn.value = "Edit";

      //create li element
      const liElement = document.createElement("li");
      liElement.className = "item";
      liElement.textContent = `${name}-${email}`;
      liElement.appendChild(editBtn);
      liElement.appendChild(deleteBtn);
      ul.appendChild(liElement);
    });
  });
});

function appointmentDetails(event) {
  event.preventDefault();

  if (toggle == true) {
    const editedName = document.getElementById("name").value;
    const editedEmail = document.getElementById("email").value;
    const obj = {
      user: editedName,
      email: editedEmail,
    };

    axios.put(`http://localhost:3000/edit-user/${idKey}`, obj);
    toggle = false;
    location.reload();
  } else {
    const ul = document.getElementById("items");
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    //create delete buttn
    const deleteBtn = document.createElement("input");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.setAttribute("onclick", "deleteBtnFn(event)");
    deleteBtn.value = "Delete";
    deleteBtn.className = "delete";
    //create edit button
    const editBtn = document.createElement("input");
    editBtn.setAttribute("type", "button");
    editBtn.setAttribute("onclick", "editBtnFn(event)");
    editBtn.className = "edit";
    editBtn.value = "Edit";

    //create li element
    const liElement = document.createElement("li");
    liElement.className = "item";
    liElement.style = "justify-content: space-evenly";
    liElement.textContent = `${name}-${email}`;
    liElement.appendChild(editBtn);
    liElement.appendChild(deleteBtn);

    ul.appendChild(liElement);

    const obj = {
      name: name,
      email: email,
    };

    axios.post("http://localhost:3000/add-user", obj);
    // axios.post(getkey, obj);
  }
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
}

function deleteBtnFn(event) {
  event.target.parentNode.style.display = "none";
  const name = event.target.parentNode.textContent.split("-")[0];
  const email = event.target.parentNode.textContent.split("-")[1];

  const id = axios.get("http://localhost:3000/get-user").then((res) => {
    let arr = res.data;
    let id;
    arr.forEach((element) => {
      if (element.user == name && element.email == email) {
        id = element.id;
      }
    });

    return id;
  });
  id.then((res) => {
    axios.delete(`http://localhost:3000/delete-user/${res}`);
  });
}

function editBtnFn(event) {
  toggle = true;
  event.target.parentNode.style.display = "none";

  const name = event.target.parentNode.textContent.split("-")[0];
  const email = event.target.parentNode.textContent.split("-")[1];
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  const editedName = event.target.parentNode.textContent.split("-")[0];
  const editedEmail = event.target.parentNode.textContent.split("-")[1];
  const id = axios.get("http://localhost:3000/get-user").then((res) => {
    let arr = res.data;
    let id;
    arr.forEach((element) => {
      if (element.user == name && element.email == email) {
        id = element.id;
      }
    });

    return id;
  });
  id.then((res) => {
    idKey = res;
  });
}
