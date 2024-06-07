// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const uri = 'api/people';
let people = [];

function getPeople() {
    fetch(uri, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => _displayPeople(data))
        .catch(error => console.error('Unable to get people.', error));
}

function addPerson() {
    const addNameTextbox = document.getElementById('add-name');

    const person = {
        name: addNameTextbox.value.trim(),
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(person)
    })
        .then(response => response.json())
        .then(() => {
            getPeople();
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add person.', error));
}

function deletePerson(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getPeople())
        .catch(error => console.error('Unable to delete person.', error));
}

function displayEditForm(id) {
    const person = people.find(person => person.id === id);

    document.getElementById('edit-id').value = person.id;
    document.getElementById('edit-name').value = person.name;
    document.getElementById('editForm').style.display = 'block';
}

function updatePerson() {
    const personId = document.getElementById('edit-id').value;
    const person = {
        id: parseInt(personId, 10),
        name: document.getElementById('edit-name').value.trim(),
    };

    fetch(`${uri}/${personId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(person)
    })
        .then(() => getPeople())
        .catch(error => console.error('Unable to update person.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}


function _displayPeople(data) {
    const tBody = document.getElementById('people');
    tBody.innerHTML = '';


    const button = document.createElement('button');

    data.forEach(person => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${person.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deletePerson(${person.id})`);

        let tr = tBody.insertRow();


        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(person.name);
        td1.appendChild(textNode);

        let td3 = tr.insertCell(1);
        td3.appendChild(editButton);

        let td4 = tr.insertCell(2);
        td4.appendChild(deleteButton);
    });

    people = data;
}

