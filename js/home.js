let contactList;


window.addEventListener('DOMContentLoaded', (event) => {
    if (site_properties.use_local_storage.match("true")) {
        getContactDataFromStorage();
    } else {
        getContactDataFromServer();
    }
});

const processContactDataResponse = () => {
    document.querySelector(".person-count").textContent = contactList.length;
    createInnerHtml();
}

const getContactDataFromStorage = () => {
    contactList = localStorage.getItem("ContactList") ?
        JSON.parse(localStorage.getItem('ContactList')) : [];
    processContactDataResponse();
}

const getContactDataFromServer = () => {
    makeServiceCall("GET", site_properties.server_url, true)
        .then(data => {
            contactList = JSON.parse(data);
            processContactDataResponse();
        }).catch(error => {
            console.log("GET Error Status: " + JSON.stringify(error));
            contactList = [];
            processContactDataResponse();
        });
}


const createInnerHtml = () => {
    const headerHtml = ` 
      <th>Full Name</th>
      <th>Address</th>
      <th>City</th>
      <th>State</th>
      <th>Zip Code</th>
      <th>Phone Number</th>
      <th>Email</th>
    `;

    if (contactList.length == 0) {
        document.querySelector('#table-display').innerHTML = "";
        return;
    }
    document.querySelector(".person-count").textContent = contactList.length;
    let innerHtml = `${headerHtml}`;
    for (const contactData of contactList) {
        innerHtml = `${innerHtml}
    <tr>
        <td>${contactData._firstName} ${contactData._lastName}</td>
        <td>${contactData._address}</td>
        <td>${contactData._city}</td>
        <td>${contactData._state}</td>
        <td>${contactData._zip}</td>
        <td>${contactData._phone}</td>
        <td>${contactData._email}</td>
        <td><div id="edit-button">
        <img id="${contactData.id}" alt="delete" onclick="remove(this)" 
                src="../assets/icons/delete-black-18dp.svg">
        <img id="${contactData.id}" alt="edit" onclick="update(this)"
                src="../assets/icons/create-black-18dp.svg">
            </div>
        </td>
    </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}
const remove = (node) => {
    let contact = contactList.find(cnt => cnt.id == node.id);
    if (!contact) return;
    const index = contactList.map(cnt => cnt.id).indexOf(contact.id);
    contactList.splice(index, 1);
    if(site_properties.use_local_storage.match("true")) {
        document.querySelector(".person-count").textContent = contactList.length;
        localStorage.setItem("ContactList",JSON.stringify(contactList));
        createInnerHtml();
      }else {
        const deleteURL = site_properties.server_url + contact.id.toString();
        makeServiceCall("DELETE", deleteURL, true)
            .then(data => {
                createInnerHtml();
            })
            .catch(error => {
                console.log("DELETE Error Status: "+JSON.stringify(error));
            });
      }
}


const update = (node) => {
    let contact = contactList.find(cnt => cnt.id == node.id);
    if (!contact) return;
    localStorage.setItem("editContact", JSON.stringify(contact));
    window.location.replace(site_properties.add_contact_page);
}