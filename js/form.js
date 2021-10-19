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
    zipElement.addEventListener('input', function () {
        if (zipElement.value == "") {
            setErrorText('.zip-error', "");
            return;
        }
        try {
            checkZip(zipElement.value);
            setErrorText('.zip-error', "");
        } catch (e) {
            setErrorText('.zip-error', e);
        }
    });
});

const setErrorText = (errorName, errorMessage) => {
    const textError = document.querySelector(errorName);
    textError.textContent = errorMessage;
    return;
}