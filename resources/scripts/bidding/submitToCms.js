export default (channelForm) => {
  const formData = new FormData(channelForm);

  return fetch(channelForm.action, {
    method: 'POST',
    body: formData,
    mode: 'cors',
    cache: 'default',
    headers: {
      Accept: 'text/plain, text/html, *.*',
    },
    redirect: 'follow',
  }).then((response) => response)
    .catch((err) => {
      throw new Error(err);
    });
};
