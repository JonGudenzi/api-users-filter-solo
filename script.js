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

function renderUsers(usersArray) {
    usersArray.forEach(function (person) {
        const li = document.createElement("li");
        li.textContent = `${person.name} | `;
        const emailTag = document.createElement("a");
        emailTag.href = `mailto:${person.email}`;
        emailTag.textContent = person.email;
        li.appendChild(emailTag);
        const company = document.createTextNode(` - ${person.company.name}   `);
        li.appendChild(company);
        const btn = document.createElement("button");
        btn.textContent = "More info";
        li.appendChild(btn);
        btn.addEventListener("click", function () {
            const extraInfo = li.querySelector(".extra-info");
            if (!extraInfo) {
                const extraInfo = document.createElement("p");
                extraInfo.classList.add("extra-info");
                extraInfo.textContent = `${person.phone} | ${person.website}`;
                li.appendChild(extraInfo);
                btn.textContent = "X";
            } else {
                const extraInfo = li.querySelector(".extra-info");
                extraInfo.remove();
                btn.textContent = "More info";
            }
        })
        list.appendChild(li);
    })
}

function filterUsers() {
    list.innerHTML = "";
    const term = input.value.toLowerCase().trim();
    const filtered = allUsers.filter(function (person) {
        return (person.name.toLowerCase().includes(term) ||
            person.email.toLowerCase().includes(term) ||
            person.company.name.toLowerCase().includes(term));
    })
    renderUsers(filtered);
}
input.addEventListener("input", filterUsers);

fetchUsers();