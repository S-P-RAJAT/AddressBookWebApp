const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try{
        setContactObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    }catch(e){
      console.log(e);
      return;
    }
  }
  
  const setContactObject = () => {
    if (!isUpdate && site_properties.use_local_storage.match("true")) {
        contactData.id = createNewContactId();
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

const createAndUpdateStorage = () => {
    let contactList = JSON.parse(localStorage.getItem("ContactList"));
    if(contactList){
        let contactData = contactList.
                            find(contact => contact._id == contactObj._id);
        if(!contactData)
        contactList.push(contactObj);
        else{
            const index = contactList.map(cnt => cnt._id)
                                             .indexOf(contactData._id);
            contactList.splice(index,1,contactObj);
        }
    }
    else{
      contactList = [contactObj];
    }
    localStorage.setItem("ContactList",JSON.stringify(contactList));
  }