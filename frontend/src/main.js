import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store/store';
import * as VueGoogleMaps from 'vue2-google-maps';
import GmapMarker from 'vue2-google-maps/src/components/marker';
import 'vue-video-section/dist/vue-video-section.css';
import VueVideoSection from 'vue-video-section';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faMapMarker, faCalendarPlus, faSignInAlt, faSignOutAlt, faUserPlus, faPlus, faSearch, faBell, faClock, faEnvelope, faInfoCircle, faHeart } from '@fortawesome/free-solid-svg-icons';
import scss from './styles/global.scss';
import { CarouselCard, CarouselCardItem } from 'vue-carousel-card'
import 'vue-carousel-card/styles/index.css';

library.add([faUser, faMapMarker, faCalendarPlus, faSignInAlt, faSignOutAlt, faUserPlus, faPlus, faSearch, faBell, faClock, faEnvelope, faInfoCircle, faHeart]);

Vue.component(CarouselCard.name, CarouselCard)
Vue.component(CarouselCardItem.name, CarouselCardItem)
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
Vue.component('vue-video-section', VueVideoSection)

Vue.component('GmapMarker', GmapMarker)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAsh26jhkU5wtp6r_IcqAnuuuLrulpFl6Q',
    libraries: 'places'
    // libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'

  //// then disable the following:
  installComponents: true,
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
