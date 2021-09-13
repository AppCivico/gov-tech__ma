import isEncoded from './isEncoded';

export default ((uri) => {
  // eslint-disable-next-line no-param-reassign
  uri = decodeURIComponent(uri.replace(/\+/g, ' '));
  while (isEncoded(uri)) {
    // eslint-disable-next-line no-param-reassign
    uri = decodeURIComponent(uri);
  }

  return uri;
});
