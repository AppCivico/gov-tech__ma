import a11y from './a11y';
import ariaControlsInit from './ariaControls';
import audioPlayer from './audio/player';
import flagFirstAccess from './bemoby/flag-first-access';
import biddingInit from './bidding';
import consentInit from './consent';
import headerRandomize from './layout/header-randomize';
import likeDetailsInit from './like-a-details';
import menuResetter from './menuResetter';
import modalInit from './modal';
import oembedInit from './oembed';
import searchFormReset from './searchForm/reset';
import searchFormSelect from './searchForm/select';
import searchResults from './searchResults';
import selectNavigation from './selectNavigation';
import setFromQueryStrings from './setFromQueryString';
import sliderInit from './slider';
import videoGalleryInit from './videoGallery';

a11y();
ariaControlsInit();
audioPlayer();
biddingInit();
consentInit();
flagFirstAccess();
headerRandomize();
likeDetailsInit();
menuResetter();
modalInit();
oembedInit();
searchFormReset();
searchFormSelect();
searchResults();
selectNavigation();
setFromQueryStrings();
sliderInit();
videoGalleryInit();
