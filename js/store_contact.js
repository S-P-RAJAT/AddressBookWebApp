let contactObj = {};

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let contactData = createContact();
    let jsonObject = JSON.stringify(contactData);
    createAndUpdateStorage(contactData);
    console.log(contactData);
    window.location.replace(site_properties.home_page);
}

const createContact = () => {
    let contactList = JSON.parse(localStorage.getItem("ContactList"));
    let contactData = new Contact();
    if (site_properties.use_local_storage.match("true")) {
        contactData.id = createNewContactId();
    }
    let names = getInputValueById('#name').split(" ");
    contactData.firstName = names[0];
    contactData.lastName = names[1];
    contactData.address = getInputValueById('#address');
    contactData.city = getInputValueById('#city');
    contactData.state = getInputValueById('#state');
    contactData.zip = getInputValueById('#zip');
    contactData.phone = getInputValueById('#phone');
    contactData.email = getInputValueById('#email');
    return contactData;
}

const createNewContactId = () => {
    let contactId = localStorage.getItem("ContactID");
    contactId = !contactId ? 1 : (parseInt(contactId) + 1).toString();
    localStorage.setItem("ContactID", contactId);
    return contactId;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

function createAndUpdateStorage(contactData) {
    let contactList = JSON.parse(localStorage.getItem("ContactList"));

    if (contactList != undefined) {
        contactList.push(contactData);
    }
    else {
        contactList = [contactData];
    }
    localStorage.setItem("ContactList", JSON.stringify(contactList));
}