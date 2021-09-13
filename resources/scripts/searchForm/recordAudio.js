import randomUUID from '../utilities/randomUUID';

let form;

const submitFile = ((audioFile, filename) => {
  const body = new FormData();
  const [keywordsEl] = form.elements.keywords;

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
    .then((result) => {
      const { query_text: queryText, parameters: { categoria: dialogFlowed = '' } = {} } = result;
      return { dialogFlowed, queryText };
    })
    .then(({ dialogFlowed, queryText }) => {
      if (queryText && keywordsEl) {
        keywordsEl.setAttribute('value', queryText);
      }

      if (!dialogFlowed) throw new Error('Não compreendemos.');

      const formData = new FormData(form);
      formData.set('pln', dialogFlowed.join('|').toLowerCase());
      form.submit();
    })
    .catch((err) => {
      console.debug('err.message', err.message);
      throw new Error(err);
    });
});

export default (() => {
  // let's use a flag to prevent the audio to start recording immediately after
  // permission granted
  let isRecordButtonActive = false;
  const recordButton = document.querySelector('[data-js="audio-recorder"]');

  if (!recordButton) return;

  let mediaRecorder;
  let chunks = [];
  let type = '';
  // because pythia requires file extension
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
    if (!isRecordButtonActive) return;
    mediaRecorder = new MediaRecorder(stream, { type, audioBitsPerSecond: 16000 });

    // start recording with 1 second time between receiving
    // 'ondataavailable' events
    mediaRecorder.start(1000);

    mediaRecorder.onstart = () => {
      recordButton.className += ' active';
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type });

      recordButton.className = recordButton.className.replace(' active', '');

      if (!blob.size) return;
      chunks = [];

      submitFile(blob, filename);
    };

    mediaRecorder.ondataavailable = (e) => {
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
    isRecordButtonActive = false;
    if (e.button && e.button !== 1) return;

    document.documentElement.removeEventListener('mouseup', toStopRecording);

    setTimeout(() => {
      // this will trigger one final 'ondataavailable' event and set
      // recorder state to 'inactive'
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
    }, 2000);

    // mediaRecorder.requestData();
  };

  const toStartRecording = (e) => {
    if (e.button && e.button !== 1) return;
    isRecordButtonActive = true;

    if (navigator.mediaDevices.getUserMedia) {
      document.documentElement.addEventListener('mouseup', toStopRecording);

      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then((stream) => {
          toRecord(stream);
        })
        .catch((err) => console.debug(`The following error occured: ${err}`));
    } else {
      console.debug('getUserMedia not supported on your browser!');
    }
  };

  recordButton.addEventListener('mousedown', toStartRecording);
  recordButton.addEventListener('mouseup', toStopRecording);
  recordButton.addEventListener('blur', toStopRecording);
});
