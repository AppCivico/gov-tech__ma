function toHHMMSS(totalSecs) {
  const secNum = parseInt(totalSecs, 10) || 0;
  const hours = Math.floor(secNum / 3600);
  const minutes = Math.floor((secNum - (hours * 3600)) / 60);
  const seconds = secNum - (hours * 3600) - (minutes * 60);
  let time = '';

  if (hours) {
    time += (hours < 10)
      ? `0${hours}`
      : hours;
    time += ':';
  }

  time += (minutes < 10)
    ? `0${minutes}`
    : minutes;

  time += ':';

  time += (seconds < 10)
    ? `0${seconds}`
    : seconds;

  return time;
}

export default () => {
  const audioPlayers = document.querySelectorAll('[data-js=audio-player]');

  for (let i = audioPlayers.length - 1; i >= 0; i -= 1) {
    const player = audioPlayers[i];
    const audio = player.querySelector('audio');
    const playPause = player.querySelector('[data-js="audio-play-pause"]');
    const play = player.querySelector('[data-js="audio-play"]');
    const pause = player.querySelector('[data-js="audio-pause"]');
    const rewind = player.querySelector('[data-js="audio-rewind"]');
    const forward = player.querySelector('[data-js="audio-forward"]');
    const progress = player.querySelector('[data-js="audio-progress"]');
    const speed = player.querySelector('[data-js="audio-speed"]');
    const mute = player.querySelector('[data-js="audio-mute"]');
    const currentTime = player.querySelector('[data-js="audio-current-time"]');
    const duration = player.querySelector('[data-js="audio-duration"]');

    if (audio.duration) {
      duration.textContent = toHHMMSS(audio.duration);
      progress.setAttribute('max', String(Math.floor(audio.duration)));
    } else {
      audio.addEventListener('loadedmetadata', () => {
        progress.setAttribute('max', String(Math.floor(audio.duration)));
        duration.textContent = toHHMMSS(audio.duration);
      });
    }

    audio.addEventListener('timeupdate', () => {
      progress.setAttribute('value', String(audio.currentTime));
      currentTime.textContent = toHHMMSS(audio.currentTime);
    });

    if (playPause) {
      playPause.addEventListener('click', () => {
        if (!audio.paused) {
          playPause.className = playPause.className.replace('--play', '--pause');
          audio.pause();
          return;
        }
        if (audio.ended) {
          audio.currentTime = 0;
        }
        playPause.className = playPause.className.replace('--pause', '--play');
        audio.play();
      }, false);
    } else if (play && pause) {
      play.addEventListener('click', () => {
        if (audio.ended) {
          audio.currentTime = 0;
        }
        audio.play();
        play.setAttribute('hidden', '');
        pause.removeAttribute('hidden');
        if (pause instanceof HTMLButtonElement) {
          pause.focus();
        }
      }, false);
      pause.addEventListener('click', () => {
        audio.pause();

        pause.setAttribute('hidden', '');
        play.removeAttribute('hidden');
        if (play instanceof HTMLButtonElement) {
          play.focus();
        }
      }, false);
    } else {
      throw new Error('player control missing');
    }

    rewind.addEventListener('click', () => {
      audio.currentTime -= parseInt(rewind.getAttribute('data-decrement'), 10) || 10;
    }, false);

    forward.addEventListener('click', () => {
      audio.currentTime += parseInt(forward.getAttribute('data-increment'), 10) || 30;
    }, false);

    progress.addEventListener('click', (e) => {
      if (e instanceof MouseEvent) {
        audio.currentTime = Math.floor(audio.duration) * (e.offsetX / audio.offsetWidth);
      }
    }, false);

    if (speed instanceof HTMLSelectElement) {
      speed.addEventListener('click', () => {
        audio.playbackRate = parseInt(speed.options[speed.selectedIndex].value, 10) || 1;
      }, false);
    }

    mute.addEventListener('click', () => {
      if (audio.muted) {
        mute.className = mute.className.replace('--mute', '--unmute');
        audio.muted = false;
      } else {
        mute.className = mute.className.replace('--unmute', '--mute');
        audio.muted = true;
      }
    }, false);
  }
};
