export default ((name) => document.cookie.split(';').some((item) => item.trim().startsWith(`${name}=`)));
