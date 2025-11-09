const input = document.getElementById("input");
const list = document.getElementById("list");
const errorMsg = document.getElementById("errorMsg");

let allUsers = [];

function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            allUsers = data;
            renderUsers(allUsers);
        })
        .catch(function () {
            errorMsg.textContent = "Unable to connect to server";
        })
}

function addUserInfo(li, person) {
    li.textContent = `${person.name} | `;
    const emailTag = document.createElement("a");
    emailTag.href = `mailto:${person.email}`;
    emailTag.textContent = person.email;
    li.appendChild(emailTag);
    const company = document.createTextNode(` - ${person.company.name}   `);
    li.appendChild(company);
}

function addMoreInfoButton(li, person) {
 const btn = document.createElement("button");
    btn.textContent = "More info";
    li.appendChild(btn);
    btn.addEventListener("click", function () {
        const extraInfo = li.querySelector(".extra-info");
        if (!extraInfo) {
            const newInfo = document.createElement("p");
            newInfo.classList.add("extra-info");
            newInfo.textContent = `${person.phone} | ${person.website}`;
            li.appendChild(newInfo);
            btn.textContent = "X";
        } else {
            extraInfo.remove();
            btn.textContent = "More info";
        }
    })
}

function createUserItem(person) {
    const li = document.createElement("li");
    addUserInfo(li, person)
   addMoreInfoButton(li,person);
    return li;
}

function renderUsers(usersArray) {
    list.innerHTML = "";
    usersArray.forEach(function (person) {
        const li = createUserItem(person);
        list.appendChild(li);
    })
}

function filterUsers() {
    const term = input.value.toLowerCase().trim();
    const filtered = allUsers.filter(function (person) {
        return (person.name.toLowerCase().includes(term) ||
            person.email.toLowerCase().includes(term) ||
            person.company.name.toLowerCase().includes(term));
    })
    renderUsers(filtered);
    if (filtered.length === 0) {
        errorMsg.textContent = "No results";
    } else {
        errorMsg.textContent = "";
    }
}
input.addEventListener("input", filterUsers);

fetchUsers();