const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setContactObject();
        if (site_properties.use_local_storage.match("true")) {
            createAndUpdateStorage();
            resetForm();
            window.location.replace(site_properties.home_page);
        } else {
            createContact();
        }
    } catch (e) {
        console.log(e);
        return;
    }
}
const createContact = () => {
    let postURL = site_properties.server_url;
    let methodCall = "POST";
    makeServiceCall(methodCall, postURL, true, contactObj)
        .then(data => {
            resetForm();
            window.location.replace(site_properties.home_page);
        })
        .catch(error => {
            throw error;
        });
}

const setContactObject = () => {
    if (!isUpdate) {
        contactObj.id = createNewContactId();
    }
    let names = getInputValueById('#name').split(" ");
    contactObj._firstName = names[0];
    contactObj._lastName = names[1];
    contactObj._address = getInputValueById('#address');
    contactObj._city = getInputValueById('#city');
    contactObj._state = getInputValueById('#state');
    contactObj._zip = getInputValueById('#zip');
    contactObj._phone = getInputValueById('#phone');
    contactObj._email = getInputValueById('#email');
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

const createAndUpdateStorage = () => {
    let contactList = JSON.parse(localStorage.getItem("ContactList"));
    if (contactList) {
        let contactData = contactList.
            find(contact => contact._id == contactObj._id);
        if (!contactData)
            contactList.push(contactObj);
        else {
            const index = contactList.map(cnt => cnt._id)
                .indexOf(contactData._id);
            contactList.splice(index, 1, contactObj);
        }
    }
    else {
        contactList = [contactObj];
    }
    localStorage.setItem("ContactList", JSON.stringify(contactList));
}

