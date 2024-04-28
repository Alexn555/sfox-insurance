export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
         );
}

export const valideAlphaNumeric = (input) => {
    return String(input).toLocaleLowerCase().match(/^[0-9a-z\s]+$/);
}

export const validateWhiteSpaces = (input, minAllowed = 3) => {
    const str = input.replace(' ', '');
    return str.length >= minAllowed;
}