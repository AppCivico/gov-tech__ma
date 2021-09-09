import randomUUID from '../utilities/randomUUID';

let form;

const submitFile = ((audioFile, filename) => {
  const body = new FormData();

  body.append('audio', audioFile, filename);

  return fetch('https://pythia.appcivico.com/audio', {
    body,
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    headers: {
      Accept: 'application/json, application/xml, text/plain, text/html, *.*',
    },
  }).then((response) => {
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      throw new Error("Oops, we haven't got JSON!");
    }
    return response.json();
  })
    .then((data) => data.dialogflow_result)
    .then((dialogFlowed) => {

      if (!dialogFlowed) throw new Error('Oops, the API refused our submission!!!');

      const formData = new FormData(form);
      formData.set('pln', dialogFlowed);
      form.submit();
    })
    .catch((err) => {
      throw new Error(err);
    });
});

export default (() => {
  const recordButton = document.querySelector('[data-js="audio-recorder"]');

  if (!recordButton) return;

  let mediaRecorder;
  let chunks = [];
  let type = '';
  let filename = randomUUID();

  switch (true) {
    // true on Firefox
    case MediaRecorder.isTypeSupported('audio/ogg;codecs=opus'):
      type = 'audio/ogg; codecs=opus';
      filename += '.oga';
      break;

    // true on blink
    case MediaRecorder.isTypeSupported('audio/webm;codecs=opus'):
      type = 'audio/webm; codecs=opus';
      filename += '.webm';
      break;

    default:
      type = 'audio/wav; codecs=pcm';
      filename += '.wav';

      break;
  }

  form = recordButton.form;

  const toRecord = (stream) => {
    mediaRecorder = new MediaRecorder(stream, { type, audioBitsPerSecond: 16000 });

    // start recording with 1 second time between receiving
    // 'ondataavailable' events
    mediaRecorder.start(1000);

    console.debug(mediaRecorder.state);
    console.debug('recorder started');

    mediaRecorder.onstop = () => {
      console.debug('data available after MediaRecorder.stop() called.');
      const blob = new Blob(chunks, { type });

      if (!blob.size) return;
      chunks = [];

      console.debug('recorder stopped');

      submitFile(blob, filename);
    };

    mediaRecorder.ondataavailable = (e) => {
      console.debug('ondataavailable', e);
      // add stream data to chunks
      if (e.data.size > 0) chunks.push(e.data);
      // if recorder is 'inactive' then recording has finished
      // if (mediaRecorder.state == 'inactive') {
      //   // convert stream data chunks to a 'webm' audio format as a blob
      //   const blob = new Blob(chunks, { type: 'audio/webm' });
      // }
    };
  };

  const toStopRecording = (e) => {
    if (e.button && e.button !== 1) return;

    document.removeEventListener('mousemove', toStopRecording);

    setTimeout(() => {
      // this will trigger one final 'ondataavailable' event and set
      // recorder state to 'inactive'
      mediaRecorder.stop();
      console.debug(mediaRecorder.state);
      console.debug('recorder stopped');
    }, 2000);

    // mediaRecorder.requestData();
  };

  const toStartRecording = (e) => {
    if (e.button && e.button !== 1) return;

    if (navigator.mediaDevices.getUserMedia) {
      // prevent to keep recording in case the finger is moved out of button
      document.addEventListener('mousemove', toStopRecording);

      console.debug('getUserMedia supported.');
      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(toRecord)
        .catch((err) => console.debug(`The following error occured: ${err}`));
    } else {
      console.debug('getUserMedia not supported on your browser!');
    }
  };

  recordButton.addEventListener('mousedown', toStartRecording);
  recordButton.addEventListener('touchstart', toStartRecording);

  recordButton.addEventListener('mouseup', toStopRecording);
  recordButton.addEventListener('touchmove', toStopRecording);
  recordButton.addEventListener('touchend', toStopRecording);
});
