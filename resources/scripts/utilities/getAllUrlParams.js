import fullyDecode from './fullyDecode';

/**
 * @see https://www.sitepoint.com/get-url-parameters-with-javascript/
 */
export default function getAllUrlParams(url) {
  // get query string from url (optional) or window
  let queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  const obj = {};

  // if query string exists
  if (queryString) {
    // stuff after # is not part of query string, so get rid of it
    [queryString] = queryString.split('#');

    // split our query string into its component parts
    const arr = queryString.split('&');

    for (let i = 0; i < arr.length; i += 1) {
      // separate the keys and the values
      const a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      const paramName = fullyDecode(a[0]);
      const paramValue = typeof (a[1]) === 'undefined' ? true : fullyDecode(a[1]);

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {
        // create key if it doesn't exist
        const key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          const index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      }

      // we're dealing with a string
      if (!obj[paramName]) {
        // if it doesn't exist, create property
        obj[paramName] = paramValue;
      } else if (obj[paramName] && typeof obj[paramName] === 'string') {
        // if property does exist and it's a string, convert it to an array
        obj[paramName] = [obj[paramName]];
        obj[paramName].push(paramValue);
      } else {
        // otherwise add the property
        obj[paramName].push(paramValue);
      }
    }
  }

  return obj;
}
