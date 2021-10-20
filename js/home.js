let contactList;

window.addEventListener('DOMContentLoaded', (event) => {
    contactList = getContactDataFromStorage();
    document.querySelector(".person-count").textContent = contactList.length;
    createInnerHtml();
});

const getContactDataFromStorage = () => {
    return localStorage.getItem("ContactList") ?
                        JSON.parse(localStorage.getItem('ContactList')) : [];
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

    if (contactList.length == 0) return;
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
            <img name="${contactData._id}" alt="delete onclick="remove(this)"" 
                src="../assets/icons/delete-black-18dp.svg">
            <img name="${contactData._id}" alt="edit" onclick="update(this)"
                src="../assets/icons/create-black-18dp.svg">
            </div>
        </td>
    </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}
