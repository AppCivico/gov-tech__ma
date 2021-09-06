import isEncoded from './isEncoded';

export default ((uri) => {
  while (isEncoded(uri)) {
    // eslint-disable-next-line no-param-reassign
    uri = decodeURIComponent(uri);
  }

  return uri;
});
