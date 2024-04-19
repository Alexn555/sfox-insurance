export const getVersionFromPackage = (version) => {
    let ver = version;
    ver = ver.split('.').join("");
    const dot = '.';
    const position = 1;
    ver = [ver.slice(0, position), dot, ver.slice(position)].join('');
    return ver;
}

export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
         );
}