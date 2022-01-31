export default ((name, value) => document.cookie.split(';').some((item) => item.includes(`${name}=${value}`)));
