export default (channelForm) => {
  const formData = new FormData(channelForm);

  return fetch(channelForm.action, {
    method: 'POST',
    body: formData,
    mode: 'cors',
    cache: 'default',
    redirect: 'follow',
  }).then((response) => response.json())
    .catch((err) => {
      throw new Error(err);
    });
};
