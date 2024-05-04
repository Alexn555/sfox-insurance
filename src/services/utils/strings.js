export const getVersionFromPackage = (version) => {
    let ver = version;
    ver = ver.split('.').join("");
    const dot = '.';
    const position = 1;
    ver = [ver.slice(0, position), dot, ver.slice(position)].join('');
    return ver;
}

export const capFirstLetter = (str) => {
    return str.charAt(0).toUpperCase()+ str.slice(1);
}