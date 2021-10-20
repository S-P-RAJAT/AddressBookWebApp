function validateRegex(regexPattern, value) {
    return (new RegExp(regexPattern)).test(value);
}

function checkName(name, nametype) {
    if (!validateRegex('^[A-Z][a-z]{2,}$', name))
        throw nametype + ' is Invalid';
}

function checkAddress(address) {
    let words = address.split(" ");
    if (words.length > 1) {
        for (const word of words) {
            if (!validateRegex('^[A-Za-z,-/.0-9]{3,}$', word))
                throw 'Address is Invalid';
        }
    }
    else {
        throw 'Address is Invalid';
    }
}

function checkZip(zip) {
    if (!validateRegex('^[0-9]{3}[ ]?[0-9]{3}$', zip))
        throw 'Zip is Invalid ';    
}

function checkPhoneNumber(phone) {
    if (!validateRegex('^([+]\\d{1,3}|\\d{2})? ?\\d{10}$', phone))
        throw 'Phone Number is Invalid';
}

function checkEmail(email) {
    if (!validateRegex('^[a-z]+([.]?[a-z0-9_+-]+)?@[a-z1-9]+[.][a-z]{2,}([.][a-z]{2,})?$', email))
        throw 'Email Incorrect';
}