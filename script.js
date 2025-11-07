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
            renderUsers();
        })
        .catch(function () {
            errorMsg.textContent = "unable to access server";
        })
}


function renderUsers() {
    list.innerHTML = "";
    allUsers.forEach(function (person) {
        const li = document.createElement("li");
        li.textContent = `${person.name} | `;
        const email = document.createElement("a");
        email.href = `mailto:${person.email}`;
        email.textContent = person.email;
        li.appendChild(email);
        const company = document.createTextNode(` - ${person.company.name} - `);
        li.appendChild(company);
        const btn = document.createElement("button");
        btn.textContent = "More info";
        li.appendChild(btn);
        btn.addEventListener("click", function () {
            if (btn.textContent === "More info") {
                const moreInfo = document.createElement("p");
                moreInfo.classList.add("info-btn");
                moreInfo.textContent = `${person.phone} | ${person.website}`;
                li.appendChild(moreInfo);
                btn.textContent = "X";
            } else {
               const moreInfo = li.querySelector(".info-btn");
                moreInfo.remove();
                btn.textContent = "More info";
            }
        })
        list.appendChild(li);
    })
}

function filterUsers() {
const term = input.value.toLowerCase().trim();
const filtered = allUsers.filter(function(person) {
   return person.name.toLowerCase().includes(term);
})
renderUsers(filtered);
}

fetchUsers();
