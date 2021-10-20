
let isUpdate = false;
let contactObj;

window.addEventListener('DOMContentLoaded', (event) => {

    const name = document.querySelector('#name');
    name.addEventListener('input', function () {
        let names = document.querySelector('#name').value.split(" ");
        if (names[0].length == 0) {
            setErrorText('.name-error', "");
            return;
        }
        if (names.length == 2) {
            try {
                checkName(names[0], "First Name");
                setErrorText('.name-error', "");
                checkName(names[1], "Last Name");
                setErrorText('.name-error', "");
            } catch (e) {
                setErrorText('.name-error', e);
            }
        }
        else {
            try {
                checkName(names[0], "First Name");
                setErrorText('.name-error', "");
                checkName("", "Last Name");
                setErrorText('.name-error', "");
            } catch (e) {
                setErrorText('.name-error', e);
            }
        }
    });

    const addressElement = document.querySelector('#address');
    addressElement.addEventListener('input', function () {
        let address = document.querySelector('#address').value;
        let words = address.split(" ");
        if (address == "") {
            setErrorText('.address-error', "");
            return;
        }
        if (words.length > 1) {
            try {
                checkAddress(address);
                setErrorText('.address-error', "");
            } catch (e) {
                setErrorText('.address-error', e);
            }
        }
        else {
            setErrorText('.address-error', "Address should have multiple words");
        }
    });

    const phoneElement = document.querySelector('#phone');
    phoneElement.addEventListener('input', function () {
        if (phoneElement.value == "") {
            setErrorText('.phone-error', "");
            return;
        }
        try {
            checkPhoneNumber(phoneElement.value);
            setErrorText('.phone-error', "");
        } catch (e) {
            setErrorText('.phone-error', e);
        }
    });

    const emailElement = document.querySelector('#email');
    emailElement.addEventListener('input', function () {
        if (emailElement.value == "") {
            setErrorText('.email-error', "");
            return;
        }
        try {
            checkEmail(emailElement.value);
            setErrorText('.email-error', "");
        } catch (e) {
            setErrorText('.email-error', e);
        }
    });

    const zipElement = document.querySelector('#zip');
    const zipError = document.querySelector(".zip-error");
    zipElement.addEventListener('input', function () {
        if (zipElement.value == "") {
            setErrorText('.zip-error', "");
            zipError.style.paddingLeft = "0rem";
            return;
        }
        try {
            checkZip(zipElement.value);
            zipError.style.paddingLeft = "0rem";
            setErrorText('.zip-error', "");
        } catch (e) {
            setErrorText('.zip-error', e);
            zipError.style.paddingLeft = "1rem";
        }
    });
    const stateElement = document.querySelector('#state');
    stateElement.addEventListener('input', function () {
        makeCity(stateElement.value);
        console.log(stateElement.value);
    });

    let button = document.getElementById("submit-button");
    name.addEventListener('input', function () {
        if (name.value == "") {
            button.classList.remove("submit-button");
            button.classList.add("submit-button-disabled");
        } else {
            activateSubmitButton(button);
        }
    });
    makeState();
    document.querySelector(".cancel-button").href = site_properties.home_page;
    checkForUpdate();

});

const activateSubmitButton = () => {
    let button = document.getElementById("submit-button");

    button.classList.remove("submit-button-disabled");
    button.classList.add("submit-button");
    button.disabled = false;
}

const setErrorText = (errorName, errorMessage) => {
    const textError = document.querySelector(errorName);
    textError.textContent = errorMessage;
    return;
}
const resetForm = () => {
    setValue('#name', '');
    setValue('#address', '');
    setSelectedIndex('#city', 0);
    setSelectedIndex('#state', 0);
    setValue('#zip', '');
    setValue('#phone', '');
    setValue('#email', '');
    let listOfErrors = ['.name-error', '.address-error', '.phone-error', '.email-error', '.zip-error'];
    listOfErrors.forEach(errorElement => {
        setErrorText(errorElement, "");
    });
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}
const checkForUpdate = () => {
    const contactJson = localStorage.getItem('editContact');
    isUpdate = contactJson ? true : false;
    if (!isUpdate) {
        resetForm();
        return;
    }
    activateSubmitButton();
    contactObj = JSON.parse(contactJson);
    setForm();
    localStorage.removeItem("editContact");
}

const setForm = () => {
    setValue('#name', contactObj._firstName + " " + contactObj._lastName);
    setValue('#address', contactObj._address);
    makeState();
    setValue('#state', contactObj._state);
    setSelectInput('city', contactObj._city);
    setValue('#zip', contactObj._zip);
    setValue('#phone', contactObj._phone);
    setValue('#email', contactObj._email);
}

function setSelectInput(elementId,value){
    var option = "<option value='"+value+"'>"+value+"</option>";
    document.getElementById(elementId).innerHTML = option;
}