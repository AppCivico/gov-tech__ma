let videoGalleryEmbed = null;

const updateEmbed = (e) => {
  switch (true) {
    case e.button !== 0:
    case e.altKey:
    case e.ctrlKey:
    case e.metaKey:
    case e.shiftKey:
      return;

    default:
      e.preventDefault();
      break;
  }

  const re = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/i;
  const youtubeUrl = e.currentTarget.href;
  const videoId = (youtubeUrl.match(re) || [])[5] || '';

  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&amp;showinfo=0&enablejsapi=1`
    : '';

  if (embedUrl) {
    videoGalleryEmbed.src = embedUrl;
    videoGalleryEmbed.scrollIntoView(false);
  } else {
    throw new Error('embed url not found');
  }
};

export default (() => {
  const videoGallerySwitchers = document.querySelectorAll('[data-js="video-gallery__switcher"]');
  videoGalleryEmbed = document.querySelector('[data-js="video-gallery__embed"] iframe');

  if (!videoGalleryEmbed) return;

  for (let i = 0; i < videoGallerySwitchers.length; i += 1) {
    const videoGallerySwitcher = videoGallerySwitchers[i];

    videoGallerySwitcher.addEventListener('click', updateEmbed);
  }
});
